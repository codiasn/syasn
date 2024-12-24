import { Sya } from "~/jsclient";

export default defineNuxtPlugin(async () => {
  await Store.sya.init();

  const sya = new Sya(Store.sya.config!);

  await sya.session.init();

  Store.sya.setSessionId(sya.sessionId);

  return { provide: { sya } };
});
