export interface SyaApplicationComponentOptions {
  application: IApplication | string;
  target: HTMLElement;
  metadata?: { [key: string]: any };
  onSend?: (score: IScore) => void;
}

export interface ISyaLocale {
  [key: string]:
    | string
    | number
    | boolean
    | (string | number | boolean | ISyaLocale)[]
    | ISyaLocale;
}

export interface SyaConfig {
  sessionId?: string;
  jeton?: string;
  rsa: { public: string; private: string };
  useclient?: string;

  /** default 5 */
  lang?: string;
  locales?: { [x: string]: ISyaLocale };

  onError?: (error: {
    [key: string]: any;
    message: { label: string; translate: { [lang: string]: string } };
  }) => void;
}

export interface IBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const clientAccessKey = [
  "client.get",
  "client.update",
  "client.generateJeton",
  "client.setAccess",

  "application.create",
  "application.get",
  "application.remove",
  "application.list",
  "application.stats",

  "score.add",
  "score.get",
  "score.remove",
  "score.list",

  "user.add",
  "user.list",
  "user.update",
] as const;

export type ClientAccessKey = (typeof clientAccessKey)[number];

export type IClientAccess = Record<ClientAccessKey, "public" | null | string[]>;

export interface IClient extends IBase {
  name: string;
  description?: string;
  access: IClientAccess;
}

export interface IProfile extends IBase {
  profile: "agent" | "owner" | "admin";
  client: IClient;
}

export interface IUser extends IBase {
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * The `IApplication` interface represents an object designed to collect
 * ratings or evaluations about a product, service, or any other element.
 * This object is structured to manage all necessary information
 * for gathering feedback, including customizable steps to guide users
 * through the evaluation process. It also allows the definition of optional
 * parameters such as metadata and a confirmation message after submission.
 */
export interface IApplication extends IBase {
  logo?: IFyle | null;
  name: string;
  description?: string;
  component?: string;
  once?: boolean;
  close?: boolean;

  /**
   * Custom metadata that can hold additional information
   * as key-value pairs.
   */
  metadata?: { [key: string]: any };

  /**
   * @default 5
   * The maximum score the application can take
   */
  max: number;

  /** Message to display after submitting the score */
  message: string;

  steps?: (IApplicationStepChoice | IApplicationStepComment)[];
}
export interface IApplicationStep {
  /**
   * Condition for displaying the step or not.
   * ex: score(<5)
   * */
  condition?: string;
  required?: boolean;
}

export interface IApplicationStepChoice extends IApplicationStep {
  code: "choice";
  options: string[];
  multiple?: boolean;
}

export interface IApplicationStepComment extends IApplicationStep {
  code: "comment";
  label: string;
}

export interface IApplicationStats {
  total: number;
  average: number;
  details: { [score: string]: number };
}

export interface IFyle {
  name: string;
  type: string;
  size: number;
  /** base64 - **ex.**: "data:image/jpeg;base64,/9j/4AAQSkZJRgA...." */
  content: string;
  url: string;
}

export interface IScore extends IBase {
  score: number;
  steps?: { [x: string]: any };
  application: IApplication;
  metadata: { [key: string]: any };
}
