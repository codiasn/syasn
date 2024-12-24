import { Sya } from "../../../..";
import type {
  IApplication,
  IApplicationStepChoice,
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
  cb: (v: string | string[]) => void
) {
  let vls: string[] = [];

  const wrapper = document.createElement("div");
  wrapper.classList.add("c-sya-step-choice");
  wrapper.innerHTML = template;

  target.appendChild(wrapper);

  let items = "";
  const choice = options.application.steps?.length
    ? (options.application.steps[options.index] as IApplicationStepChoice)
    : undefined;

  if (!choice || choice.code !== "choice") return;

  for (const option of choice.options) {
    const item = `
        <div class="c-sya-step-choice--options">
          <input id="${option}" type="checkbox" value="${option}" name="choicevalue" />

          <label for="${option}">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                clip-rule="evenodd"
                fill-rule="evenodd"
                image-rendering="optimizeQuality"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                viewBox="0 0 21.0001 21.0001"
              >
                <g>
                  <path d="m0 0h21v21h-21z" fill="none" />
                  <path
                    d="m10.5038 1.31775c5.07328 0 9.1876 4.11432 9.1876 9.1876s-4.11432 9.1876-9.1876 9.1876-9.1876-4.11432-9.1876-9.1876 4.11432-9.1876 9.1876-9.1876zm-1.90792 12.1718-2.24935-2.25121c-.38321-.38344-.38329-1.00872 0-1.39208.38337-.38329 1.01143-.38089 1.39201 0l1.58578 1.58702 3.94488-3.94488c.38337-.38337 1.00872-.38337 1.39201 0 .38337.38329.38282 1.00918 0 1.39201l-4.64201 4.64201c-.38282.38282-1.00872.38337-1.39201 0-.01077-.01077-.02116-.0217-.03131-.03286z"
                  />
                </g>
              </svg>
            </div>
            ${option}
          </label>
        </div>
      `;

    items += item;
  }

  wrapper.querySelector(".c-sya-step-choice--container")!.innerHTML = items;

  const inputs = wrapper.querySelectorAll<HTMLInputElement>("input");

  inputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      if (input.checked) {
        if (!choice?.multiple) {
          for (let i = 0; i < inputs.length; i++) {
            const otherCheckbox = inputs[i];
            if (otherCheckbox !== input) {
              otherCheckbox.checked = false;
            }
          }
        }
      }

      vls = [];
      for (let i = 0; i < inputs.length; i++) {
        const ipt = inputs[i];

        if (ipt.checked) {
          vls.push(ipt.value);
        }
      }
    });
  });

  options.buildActions(wrapper, () => {
    if (choice?.required && !vls.length) return;
    if (choice?.multiple) cb(vls);
    else cb(vls[0]);
  });
}

export default { build };