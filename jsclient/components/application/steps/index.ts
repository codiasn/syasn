import { Sya } from "../../..";
import type { IApplication, IScore } from "../../../interfaces";

import cApplicationStepChoice from "./choice";
import cApplicationStepComment from "./comment";

function build(
  target: HTMLElement,
  options: {
    sya: Sya;
    score: Partial<IScore>;
    application: IApplication;
    restart: () => void;
  },
  cb: (v: { [x: string]: any }) => void
) {
  if (!options.application.steps?.length) {
    cb({});
    return;
  }

  const components = {
    choice: cApplicationStepChoice,
    comment: cApplicationStepComment,
  };
  buildStep(0);

  function buildStep(index: number) {
    target.innerHTML = "";

    const step = options.application.steps![index];
    const code = step.code as "choice";

    if (!conditionalLog()) return finish();

    function finish() {
      if (index === options.application.steps!.length - 1) {
        cb(options.score.steps || {});
      } else buildStep(index + 1);
    }

    function conditionalLog() {
      if (!step.condition) return true;

      let conditionMet = false;
      const match = step.condition!.match(/(score\()([><=]+)(\d+)(\))/);

      if (match) {
        const operator = match[2];
        const number = parseInt(match[3], 10);
        const value = options.score.score || 1;

        switch (operator) {
          case ">":
            conditionMet = value > number;
            break;
          case "<":
            conditionMet = value < number;
            break;
          case ">=":
            conditionMet = value >= number;
            break;
          case "<=":
            conditionMet = value <= number;
            break;
          case "==":
            conditionMet = value === number;
            break;
          case "!=":
            conditionMet = value !== number;
            break;
          default:
            throw "invalid_condition";
        }
      } else {
        throw "invalid_condition";
      }

      return conditionMet;
    }

    function buildActions(wrapper: HTMLElement, cb: () => void) {
      const submitButton = wrapper.querySelector(
        "button.c-sya-submit-btn.next"
      ) as HTMLButtonElement;

      submitButton.textContent =
        options.application.steps!.length - 1 > index
          ? options.sya._locales[options.sya.lang].next
          : options.sya._locales[options.sya.lang].submit;

      submitButton.addEventListener("click", () => cb());

      const prevButton = wrapper.querySelector(
        "button.c-sya-submit-btn.prev"
      ) as HTMLButtonElement;

      prevButton.textContent = options.sya._locales[options.sya.lang].goback;

      prevButton.addEventListener("click", () => gotoPrev());
    }

    function gotoPrev() {
      if (index !== 0) buildStep(index - 1);
      else options.restart();
    }

    components[code].build(
      target,
      {
        sya: options.sya,
        score: options.score,
        application: options.application,
        index,
        buildActions,
      },
      (v) => {
        options.score.steps ||= {};
        options.score.steps[index] = v;
        if (options.score.steps[index] === undefined) {
          delete options.score.steps[index];
        }

        finish();
      }
    );
  }
}

export default { build };
