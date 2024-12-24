import { Sya } from "../../..";
import type { IApplication, IScore } from "../../../interfaces";
import cApplicationFace from "./face";
import cApplicationStar from "./star";

// @ts-ignore
import template from "./template.html?raw";

function build(
  target: HTMLElement,
  options: { application: IApplication; score: Partial<IScore>; sya: Sya },
  cb: (v: number) => void
) {
  const components = {
    face: cApplicationFace,
    star: cApplicationStar,
  };

  // const wrapper = document.createElement("div");
  // wrapper.classList.add("c-sya-application-score");
  target.innerHTML = template;

  const container = target.querySelector(
    ".c-sya-application-score-container"
  ) as HTMLDivElement;

  container.classList.add("c-sya-application-container");

  let selectScore = 1;

  // ajouter la description
  if (options.application.description) {
    const desc = document.createElement("p");
    desc.classList.add("c-sya-application-description");
    desc.innerHTML = options.application.description;
    desc.style.margin = "0";
    container.appendChild(desc);
  }

  const cmp = (options.application.component || "star") as "star";
  components[cmp].build(
    container,
    options.application,
    options.score,
    (v) => (selectScore = v)
  );

  const submitButton = target.querySelector(
    "button.c-sya-submit-btn"
  ) as HTMLButtonElement;

  submitButton.innerHTML = options.application.steps?.length
    ? options.sya._locales[options.sya.lang].next
    : options.sya._locales[options.sya.lang].submit;

  submitButton.addEventListener("click", () => {
    cb(selectScore);
  });

  //   container.appendChild(wrapper);
}

export default { build };
