import type { IProductSubtype, IProductType } from "./product";

export interface SyaProductComponentOptions {
  product: IProduct | string;
  target: HTMLElement;
  metadata?: { [key: string]: any };
  onSend?: (score: IScore) => void;
}

export interface ISyaLocale {
  [key: string]: any;
}

export interface IConfig {
  url: string;
  sessionId?: string;
  jeton?: string;
  rsa: { public: string; private: string };

  locale?: ISyaLocale;

  onError?: (error: {
    [key: string]: any;
    message: { label: string; translate: { [lang: string]: string } };
  }) => void;
}

export interface IBase {
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfile extends IBase {
  profile: "agent" | "owner" | "admin";
}

export interface IUser extends IBase {
  photo?: IFyle;
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * The `IProduct` interface represents an object designed to collect
 * ratings or evaluations about a product, service, or any other element.
 * This object is structured to manage all necessary information
 * for gathering feedback, including customizable steps to guide users
 * through the evaluation process. It also allows the definition of optional
 * parameters such as metadata and a confirmation message after submission.
 */

export interface IProductMetadata {
  [key: string]: any;
  type: [IProductType, IProductSubtype];
}

export interface IProduct extends IBase {
  logo?: IFyle | null;
  name: string;
  slug: string;
  description?: string;
  component?: string;
  once?: boolean;
  close?: boolean;

  /**
   * Custom metadata that can hold additional information
   * as key-value pairs.
   */
  metadata?: IProductMetadata;

  /**
   * @default 5
   * The maximum score the product can take
   */
  max: number;

  /** Message to display after submitting the score */
  message: string;

  steps?: (IProductStepChoice | IProductStepComment)[];
}

export interface IProductWithStats extends IProduct {
  stats: IProductStats;
}

export interface IProductStatsObject {
  product: IProduct;
  stats: IProductStats;
}

export interface IProductStep {
  /**
   * Condition for displaying the step or not.
   * ex: score(<5)
   * */
  condition?: string;
  required?: boolean;
}

export interface IProductStepChoice extends IProductStep {
  code: "choice";
  options: string[];
  multiple?: boolean;
}

export interface IProductStepComment extends IProductStep {
  code: "comment";
  label: string;
}

export interface IProductStats {
  total: number;
  average: number;
  best: number;
  worst: number;
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
  product: IProduct;
  metadata: { [key: string]: any };
  responses: { [index: string]: { type: string; value: any } };
  user?: IUser;
}
