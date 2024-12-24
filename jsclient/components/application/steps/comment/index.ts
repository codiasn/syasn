import { Sya } from "../../../..";
import type {
  IApplication,
  IApplicationStepComment,
  IScore,
} from "../../../../interfaces";

// @ts-ignore
import template from "./template.html?raw";

function build(
  target: HTMLElement,
  options: {
    sya: Sya;
    score: Partial<IScore>;
    application: IApplication;
    index: number;
    buildActions: (wraper: HTMLElement, cb: () => void) => void;
  },
  cb: (v: string) => void
) {
  let comment = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("c-sya-step-comment");
  wrapper.innerHTML = template;

  target.appendChild(wrapper);

  const commentStep = options.application.steps?.length
    ? (options.application.steps[options.index] as IApplicationStepComment)
    : undefined;

  if (!commentStep || commentStep.code !== "comment") return;

  const textarea = wrapper.querySelector(
    ".c-sya-step-comment--container textarea"
  ) as HTMLTextAreaElement;

  if (textarea) {
    textarea.placeholder = commentStep.label;
    if (options.score.steps) {
      comment = textarea.value = options.score.steps[options.index] || "";
    }

    textarea.addEventListener("change", () => {
      comment = textarea.value;
    });
  }

  options.buildActions(wrapper, () => {
    if (commentStep?.required && !comment) return;
    cb(comment);
  });
}

export default { build };
