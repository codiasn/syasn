import type { IBase } from "./index";

const accessKey = [
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
export type AccessKey = (typeof accessKey)[number];
export type Access = Record<AccessKey, "public" | null | string[]>;

export interface Authorization extends IBase {
  access: Access;
}
