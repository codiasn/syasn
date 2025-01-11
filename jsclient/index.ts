import forge from "node-forge";

import type {
  IProduct,
  IProductStatsObject,
  IScore,
  ISyaLocale,
  IUser,
  IConfig,
} from "./interfaces";
import type {
  IProductAllData,
  IProductSearchResult,
} from "./interfaces/product";
import type { Access, IPermission } from "./interfaces/permission";
import type {
  IScoreSearchParams,
  IScoreSearchResult,
} from "./interfaces/score";

export class Sya {
  config: IConfig;
  apiPublicKey = "";

  _locale: { [key: string]: any } = {};
  locale: ISyaLocale = {
    next: "Next",
    goback: "Go Back",
    submit: "Submit",
    tryAgain: "Try again",
    product: {
      message: {
        error: "An error occurred while sending. Please try again.",
        success:
          "Your feedback has been successfully submitted. Thank you for your input !",
      },
    },
  };

  private _sessionId: string | undefined;

  syaDoesntReply = false;

  set sessionId(id: string | undefined) {
    this._sessionId = id;
    this.config.sessionId = id;
  }
  get sessionId() {
    return this._sessionId;
  }

  constructor(config: IConfig) {
    this.config = config;

    if (this.config.sessionId) this.sessionId = this.config.sessionId;

    if (this.config.locale) {
      this.locale = { ...this.locale, ...this.config.locale };
    }

    this._locale = flattenObject(this.locale, "", {});
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
      this.user.current = data.user;
    },
    login: async (data: { email: string; password: string }) => {
      data.password = { _RSA_ENCODED_: data.password } as any;

      const response = await this.request<{ user: IUser }>({
        url: "/session/login",
        method: "POST",
        data,
      });

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
      const data = await this.request<{ user: IUser }>({
        url: `/session/confirm-identity`,
        method: "POST",
        data: { code: { _RSA_ENCODED_: code } },
      });

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
        return await this.request<IUser>({ url: "user/me" });
      },

      update: async (data: Partial<IUser> & { password?: string }) => {
        return await this.request<IUser>({
          url: "user/me",
          method: "post",
          data,
        });
      },
    },

    update: async (data: Partial<IUser> & { id: string }) => {
      return await this.request<IUser>({
        url: "user/update",
        method: "post",
        data,
      });
    },

    list: async (params?: {}) => {
      return await this.request<IUser>({
        url: "user",
        method: "post",
        data: params,
      });
    },
  };

  setting = {
    jeton: async () => {
      const data = await this.request<{ jeton: string }>({
        url: "generate-jeton",
        method: "post",
      });
      return data;
    },

    setAccess: async (data: Partial<Access>) => {
      const response = await this.request<IPermission>({
        url: "/setting/access",
        method: "post",
        data: { access: data },
      });

      return response;
    },
  };

  product = {
    create: async (data: Partial<IProduct>) => {
      return await this.request<IProduct>({
        url: "product",
        method: "post",
        data,
      });
    },

    list: async (params?: {}) => {
      return await this.request<IProduct[]>({
        url: "product/list",
        method: "post",
        data: params,
      });
    },

    get: async (id: string) => {
      return await this.request<IProduct>({ url: `product/${id}` });
    },

    stats: async (id: string) => {
      return await this.request<IProductStatsObject>({
        url: `product/stats/${id}`,
      });
    },
    search: async (params: IScoreSearchParams = {}) => {
      return await this.request<IProductSearchResult>({
        url: `product/search`,
        method: "POST",
        data: params,
      });
    },
    searchOne: async (id: string) => {
      return await this.request<IProductAllData>({
        url: `product/search/${id}`,
      });
    },

    statsList: async (params: { [key: string]: any } = {}) => {
      return await this.request<IProductStatsObject[]>({
        url: `product/stats/`,
        method: "POST",
        data: params,
      });
    },

    remove: async (id: string) => {
      return await this.request<IProduct>({
        url: `product/${id}`,
        method: "delete",
      });
    },

    components: {},
  };

  score = {
    list: async (params?: { product?: string; [key: string]: any }) => {
      return await this.request<IScore[]>({
        url: "score/list",
        method: "post",
        data: params,
      });
    },

    search: async (params?: { product?: string; [key: string]: any }) => {
      return await this.request<IScoreSearchResult>({
        url: "score/search",
        method: "post",
        data: params,
      });
    },

    searchOne: async (id: string) => {
      return await this.request<IScore>({ url: `score/search/${id}` });
    },

    /** get product to scored it */
    getProduct: async (id: string) => {
      return await this.request<IProduct>({ url: `product/${id}` });
    },

    /** scored */
    add: async (productId: string, data: Partial<IScore>) => {
      return await this.request<IScore>({
        url: "score",
        method: "post",
        data: { ...data, product: productId },
      });
    },
    get: async (id: string) => {
      return await this.request<IScore>({ url: `score/${id}` });
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
      fetch(`${this.config.url}/${params.url}`, {
        method: params.method,
        headers: {
          "Content-Type": "Application/json",
          Accept: "Application/json",
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
