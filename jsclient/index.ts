import forge from "node-forge";

import type {
  ClientAccessKey,
  IApplication,
  IApplicationStats,
  IClient,
  IClientAccess,
  IProfile,
  IScore,
  ISyaLocale,
  IUser,
  SyaApplicationComponentOptions,
  SyaConfig,
} from "./interfaces";
import cApplicationScore from "./components/application/score";
import cApplicationStep from "./components/application/steps";
import cApplicationSubmitting from "./components/application/submitting";

// @ts-ignore
import style from "./components/style.css?raw";

export class Sya {
  config: SyaConfig;
  apiPublicKey = "";

  lang = "en";
  locales: { [x: string]: ISyaLocale } = {
    en: {
      next: "Next",
      goback: "Go Back",
      submit: "Submit",
      tryAgain: "Try again",
      application: {
        message: {
          error: "An error occurred while sending. Please try again.",
          success:
            "Your feedback has been successfully submitted. Thank you for your input !",
        },
      },
    },
    fr: {
      next: "Suivant",
      goback: "Retour",
      submit: "Envoyer",
      tryAgain: "Réessayer",
      application: {
        message: {
          error:
            "Un erreur s'est produit lors de l'envoie. Veuillez réessayer.",
          success:
            "Votre évaluation a été envoyée avec succès. Merci pour votre retour !",
        },
      },
    },
    es: {
      next: "Siguiente",
      goback: "Volver",
      submit: "Enviar",
      tryAgain: "Inténtalo de nuevo",
      application: {
        message: {
          error:
            "Se ha producido un error durante la transmisión. Por favor, inténtelo de nuevo",
          success:
            "¡Su evaluación se ha enviado con éxito! Gracias por sus comentarios.",
        },
      },
    },
  };
  _locales: { [x: string]: any } = {};

  private _sessionId: string | undefined;

  syaDoesntReply = false;

  set sessionId(id: string | undefined) {
    this._sessionId = id;
    this.config.sessionId = id;

    // enregistrer la session dans les cookies
    // if (typeof window !== "undefined") {
    //   if (id) localStorage.setItem("sya_session_id", id);
    //   else localStorage.removeItem("sya_session_id");
    // }
  }
  get sessionId() {
    // récupérer la session dans les cookies
    // if (typeof window !== "undefined") {
    //   this._sessionId = localStorage.getItem("sya_session_id") || "";
    // }

    return this._sessionId;
  }

  constructor(config: SyaConfig) {
    this.config = config;

    if (this.config.sessionId) this.sessionId = this.config.sessionId;

    if (this.config.lang) this.lang = this.config.lang;
    if (this.config.locales) {
      this.locales = { ...this.locales, ...this.config.locales };
    }

    if (typeof window !== "undefined") {
      const _style = document.createElement("style");
      _style.innerHTML = style;
      document.body.appendChild(_style);

      if (!config.lang) this.lang = navigator.language.split("-")[0];
    }

    // @ts-ignore
    if (!Object.keys(this.locales).includes(this.lang)) this.lang = "en";

    for (const key in this.locales) {
      if (Object.prototype.hasOwnProperty.call(this.locales, key)) {
        this._locales[key] = flattenObject(this.locales[key], "", {});
      }
    }
  }

  static generateRsaKeys() {
    const rsaKeyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    const publicKey = forge.pki.publicKeyToPem(rsaKeyPair.publicKey);
    const privateKey = forge.pki.privateKeyToPem(rsaKeyPair.privateKey);
    const keys = { public: publicKey, private: privateKey };

    return keys;
  }

  rsa = {
    encrypter: (data: string, side: "client" | "api") => {
      let key: string | undefined;
      if (side === "api") key = this.apiPublicKey;
      else key = this.config.rsa.public;

      if (!key) throw "crypto.needKey";

      const max_length = 86;

      if (typeof data === "string" && data.length > max_length) {
        const datas: string[] = [];

        for (let i = 0; i < data.length; i += max_length) {
          const dt = data.slice(i, i + max_length);
          const enc = this.rsa.encrypter(dt, side);
          datas.push(enc as string);
        }

        return datas;
      }

      const publicKeyObj = forge.pki.publicKeyFromPem(key);
      const encrypted = publicKeyObj.encrypt(data);
      return forge.util.encode64(encrypted);
    },

    decrypter: (data: string) => {
      const key = this.config.rsa.private;
      if (!key) throw "crypto.needKey";

      if (Array.isArray(data)) {
        let datas = "";
        for (const dt of data) {
          datas += this.rsa.decrypter(dt);
        }
        return datas;
      }

      const privateKeyObj = forge.pki.privateKeyFromPem(key);
      const decrypted = privateKeyObj.decrypt(forge.util.decode64(data));

      return decrypted;
    },
  };

  session = {
    init: async () => {
      const { publicKey } = await this.request({
        url: "/get-public-key",
      });
      this.apiPublicKey = publicKey;

      const data = await this.request<{
        sessionId: string;
        apiPublicKey: string;
        user: IUser;
        client: IClient;
      }>({
        url: "/session/init",
        method: "POST",
        data: {
          publicKey: this.config.rsa.public,
          jeton: this.config.jeton
            ? { _RSA_ENCODED_: this.config.jeton }
            : undefined,
        },
      });

      this.sessionId = data.sessionId;
      this.client.current = data.client;
      this.user.current = data.user;
    },
    login: async (data: { email: string; password: string }) => {
      data.password = { _RSA_ENCODED_: data.password } as any;

      const response = await this.request<{ user: IUser; client: IClient }>({
        url: "/session/login",
        method: "POST",
        data,
      });

      this.client.current = response.client;
      this.user.current = response.user;
    },
    logout: async () => {
      await this.request({
        url: "/session/logout",
        method: "POST",
      });

      this.sessionId = undefined;
    },
    register: async (data: {
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    }) => {
      data.password = { _RSA_ENCODED_: data.password } as any;

      return await this.request<{}>({
        url: "/session/register",
        method: "POST",
        data,
      });
    },
    confirmIdentity: async (code: string) => {
      const data = await this.request<{ user: IUser; client: IClient }>({
        url: `/session/confirm-identity`,
        method: "POST",
        data: { code: { _RSA_ENCODED_: code } },
      });

      this.client.current = data.client;
      this.user.current = data.user;
    },
    requestResetPassword: async (data: { email: string }) => {
      return await this.request<{}>({
        url: "/session/request-reset-password",
        method: "POST",
        data,
      });
    },
    resetPassword: async (data: { token: string; password: string }) => {
      data.password = { _RSA_ENCODED_: data.password } as any;
      return await this.request<{}>({
        url: "/session/reset-password",
        method: "POST",
        data,
      });
    },
  };

  user = {
    current: undefined as any as IUser,

    me: {
      get: async () => {
        return await this.request<IUser>({ url: "_/user/me" });
      },

      update: async (data: Partial<IUser> & { password?: string }) => {
        return await this.request<IUser>({
          url: "_/user/me",
          method: "post",
          data,
        });
      },
    },

    update: async (data: Partial<IUser> & { id: string }) => {
      return await this.request<IUser>({
        url: "_/user/update",
        method: "post",
        data,
      });
    },

    list: async (params?: {}) => {
      return await this.request<IUser>({
        url: "_/user",
        method: "post",
        data: params,
      });
    },
  };

  client = {
    current: undefined as any as IClient,

    geneteJeton: async () => {
      const data = await this.request<{ jeton: string }>({
        url: "_/generate-jeton",
        method: "post",
      });
      return data;
    },

    get: async () => {
      const response = await this.request<IClient>({ url: "_/" });

      this.client.current = response;

      return response;
    },

    update: async (data: Partial<IClient>) => {
      const response = await this.request<IClient>({
        url: "_/",
        method: "post",
        data,
      });

      this.client.current = response;

      return response;
    },

    setAccess: async (data: Partial<IClientAccess>) => {
      const response = await this.request<IClient>({
        url: "_/access",
        method: "post",
        data: { access: data },
      });

      this.client.current = response;

      return response;
    },
  };

  application = {
    create: async (data: Partial<IApplication>) => {
      return await this.request<IApplication>({
        url: "_/application",
        method: "post",
        data,
      });
    },

    list: async (params?: {}) => {
      return await this.request<IApplication[]>({
        url: "_/application/list",
        method: "post",
        data: params,
      });
    },

    get: async (id: string) => {
      return await this.request<IApplication>({ url: `_/application/${id}` });
    },

    stats: async (id: string) => {
      return await this.request<{
        application: IApplication;
        stats: IApplicationStats;
      }>({
        url: `_/application/stats/${id}`,
      });
    },

    remove: async (id: string) => {
      return await this.request<IApplication>({
        url: `_/application/${id}`,
        method: "delete",
      });
    },

    components: {
      build: async (options: SyaApplicationComponentOptions) => {
        if (typeof window !== "undefined") {
          const application =
            typeof options.application === "string"
              ? await this.score.getApplication(options.application)
              : options.application;
          if (!application) return;

          const score: Partial<IScore> = { metadata: options.metadata };

          const wrapper = document.createElement("div");
          wrapper.classList.add("c-sya");
          wrapper.style.display = "flex";
          wrapper.style.flexDirection = "column";
          wrapper.style.gap = "16px";
          wrapper.style.position = "relative";

          if (application.logo) {
            const logo = document.createElement("img");
            logo.src = application.logo.content;
            logo.style.width = "76px";
            logo.style.objectPosition = "top center";
            logo.style.objectFit = "contain";

            wrapper.appendChild(logo);
          }

          // ajouter un titre
          const title = document.createElement("div");

          title.classList.add("c-cya-application-title");
          title.innerHTML = application.name;
          title.style.fontWeight = "bold";
          title.style.fontSize = "26px";

          wrapper.appendChild(title);
          // title

          const main = document.createElement("div");
          main.classList.add("c-sya-main");
          wrapper.appendChild(main);

          const start = () => {
            cApplicationScore.build(
              main,
              { application, score, sya: this },
              (v) => {
                score.score = v;

                cApplicationStep.build(
                  main,
                  { sya: this, application, score, restart: start },
                  (v) => {
                    score.steps = v;
                    cApplicationSubmitting.build(
                      main,
                      {
                        options,
                        application,
                        score,
                        sya: this,
                        restart: start,
                      },
                      (score) => {
                        if (options.onSend) options.onSend(score);
                      }
                    );
                  }
                );
              }
            );
          };

          options.target.appendChild(wrapper);

          start();
        }
      },
    },
  };

  score = {
    list: async (params?: { application?: string }) => {
      return await this.request<IScore>({
        url: "_/score",
        method: "post",
        data: params,
      });
    },

    /** get application to scored it */
    getApplication: async (id: string) => {
      return await this.request<IApplication>({ url: `application/${id}` });
    },

    /** scored */
    add: async (applicationId: string, data: Partial<IScore>) => {
      return await this.request<IScore>({
        url: `score/${applicationId}`,
        method: "post",
        data,
      });
    },
  };

  private async reconnect() {
    setTimeout(async () => {
      await this.request<IScore>({ url: "ping" });
    }, 5000);
  }

  request<T = any>(params: any): Promise<T> {
    return new Promise((resolve, reject) => {
      const decrypter = (obj?: { [key: string]: any }) => {
        const _decrypter = (datas: any) => {
          if (!datas) {
            // ne rien faire
          } else if (Array.isArray(datas)) {
            for (let i = 0; i < datas.length; i++) {
              datas[i] = _decrypter(datas[i]);
            }
          } else if (
            Object.prototype.toString.call(datas) === "[object Object]"
          ) {
            if ("_RSA_ENCODED_" in datas) {
              datas = this.rsa.decrypter(datas._RSA_ENCODED_);
            } else {
              for (const key in datas) {
                datas[key] = _decrypter(datas[key]);
              }
            }
          }

          return datas;
        };

        return _decrypter(obj);
      };

      const encrypter = (obj?: { [key: string]: any }) => {
        const _encrypter = (datas: any) => {
          if (!datas) {
            // ne rien faire
          } else if (Array.isArray(datas)) {
            for (let i = 0; i < datas.length; i++) {
              datas[i] = _encrypter(datas[i]);
            }
          } else if (
            Object.prototype.toString.call(datas) === "[object Object]"
          ) {
            if ("_RSA_ENCODED_" in datas) {
              if (this.apiPublicKey) {
                datas._RSA_ENCODED_ = this.rsa.encrypter(
                  datas._RSA_ENCODED_,
                  "api"
                );
              } else {
                datas = null;
              }
            } else {
              for (const key in datas) {
                datas[key] = _encrypter(datas[key]);
              }
            }
          }

          return datas;
        };

        return _encrypter(obj);
      };

      params.method ||= "get";
      params.url ||= "";
      params.url = params.url.replace(/^\//, "");

      params.headers ||= {};
      params.body ||= encrypter(params.data || {});

      if (this.sessionId) {
        params.headers.authorization = `Bearer ${this.sessionId}`;
      }

      const onError = (data: any) => {
        if (this.config.onError) this.config.onError(data as any);
        return data;
      };
      // 192.168.1.102
      fetch(`${"http://192.168.1.102:10500"}/${params.url}`, {
        method: params.method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...params.headers,
        },
        body:
          params.method.toLowerCase() !== "get"
            ? JSON.stringify(params.body || {})
            : undefined,
      })
        .then((response) => {
          response
            .json()
            .then((data) => {
              this.syaDoesntReply = false;
              response.ok
                ? resolve(decrypter(data) as T)
                : reject(onError(data));
            })
            .catch((error) => reject(error));
        })
        .catch((error: TypeError) => {
          this.syaDoesntReply = true;
          this.reconnect();
          reject(error);
        });

      // const data = await response.json();
    });
  }
}

function flattenObject(
  obj: ISyaLocale,
  parentKey = "",
  result: Record<string, any> = {}
): Record<string, any> {
  for (const key in obj) {
    const value = obj[key];
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      flattenObject(value as ISyaLocale, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

// if (typeof window !== "undefined") {
//   window.Sya = Sya;
// }
