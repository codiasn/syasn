import { Sya } from "~/jsclient";

export default defineNuxtPlugin(async () => {
  await Store.sya.init();

  const sya = new Sya(Store.sya.config!);

  try {
    await sya.session.init();
    Store.sya.setSessionId(sya.sessionId);
  } catch (error) {}

  return { provide: { sya } };
});
