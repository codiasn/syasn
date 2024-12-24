import { Sya, type SyaApplicationComponentOptions } from "../../..";
import type { IApplication, IScore } from "../../../interfaces";

// @ts-ignore
import template from "./template.html?raw";

function build(
  target: HTMLElement,
  options: {
    options: SyaApplicationComponentOptions;
    application: IApplication;
    score: Partial<IScore>;
    sya: Sya;
    restart: () => void;
  },
  cb: (score: IScore) => void
) {
  target.innerHTML = template;

  submit();

  async function submit() {
    const success = target.querySelector(
      ".c-sya-application-submitting .c-sya-application-submitting--success .message"
    );
    if (success) {
      success.innerHTML =
        options.sya._locales[options.sya.lang]["application.message.success"];
    }

    const error = target.querySelector(
      ".c-sya-application-submitting .c-sya-application-submitting--error .message"
    );
    if (error) {
      error.innerHTML =
        options.sya._locales[options.sya.lang]["application.message.error"];
    }

    try {
      const score = await options.sya.score.add(
        options.application.id,
        options.score
      );

      target
        .querySelector(".c-sya-application-submitting")
        ?.classList.add("success");

      cb(score);
    } catch (error) {
      target
        .querySelector(".c-sya-application-submitting")
        ?.classList.add("error");

      const btn = target.querySelector(
        ".c-sya-application-submitting--error .restart-btn"
      ) as HTMLButtonElement;

      btn.textContent = options.sya._locales[options.sya.lang].restart;

      btn.addEventListener("click", () => options.restart());
    }
  }
}

export default { build };
