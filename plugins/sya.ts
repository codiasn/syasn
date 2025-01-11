import { Sya } from "~/jsclient";

export default defineNuxtPlugin(async () => {
  const sya: Sya = await Store.sya.init();
  return { provide: { sya } };
});
