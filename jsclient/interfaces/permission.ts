import type { IBase } from "./index";

const accessKey = [
  "client.get",
  "client.update",
  "client.generateJeton",
  "client.setAccess",

  "product.create",
  "product.get",
  "product.remove",
  "product.list",
  "product.stats",

  "score.add",
  "score.get",
  "score.remove",
  "score.list",

  "user.add",
  "user.list",
  "user.update",
] as const;
export type AccessKey = (typeof accessKey)[number];
export type Access = Record<AccessKey, "public" | null | string[]>;

export interface IPermission extends IBase {
  access: Access;
}
