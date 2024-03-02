// applications
import {
    initializeValidateEvent,
    validateInputRules
} from "Shared/ts/applications/form";
import {
    importScrollableHeightByElement,
    importScrollableHeightByElementIntoStyleElement,
    initializeNavById
} from "Shared/ts/applications/navigation";
import { initializeToolTip } from "Shared/ts/applications/template";
import { navigateToPageSectionOnLoad } from "ts/applications/navigation";

// adapters
import MomentCountdown from "Shared/ts/api/countdown/adapters/moment-countdown";

// components
import Countdown from "Shared/ts/components/countdown";
import StatusScreen, {
    getStatusScreenOrCreate
} from "Shared/ts/components/status-screen";
import Accordion from "Shared/ts/components/accordion";
import PageSectionNav from "ts/components/page-section-nav";
import { observer } from "Shared/ts/observers/intersection";

initializeToolTip();
const nav = initializeNavById("nav");
importScrollableHeightByElement(nav?.root);

interface IValidateInputFileTypeResponse {
    valid: boolean;
    reason: string;
}

const validateInputFileType = (
    control: HTMLInputElement,
    defaultReason: string
): IValidateInputFileTypeResponse => {
    const response = { valid: false, reason: defaultReason };

    if (control.files?.length === 0) {
        response.reason = "No files were uploaded. Please try again.";
        return response;
    }

    const file = control.files?.[0];
    if (!file) {
        response.reason = "No file was uploaded. Please try again.";
        return response;
    }

    const name = control.getAttribute("aria-controls");

    if (name) {
        const nameElement = document.querySelector(`#${name}`);

        if (
            nameElement &&
            !nameElement.hasAttribute("data-status-screen-reserve")
        ) {
            nameElement.innerHTML = file.name;
        }
    }

    const formats: string[] = control.accept.split(",").map((t) => t.trim());
    if (!formats.some((f) => file.name.endsWith(f))) {
        const type = file.name.split(".").pop();

        response.reason = `Please upload one of the following types: ${control.accept}.`;
        return response;
    }

    const maxLength =
        parseInt(control.getAttribute("maxlength") ?? "") ?? 10485760;

    if (file.size > maxLength) {
        response.reason = `The maximum file size is ${maxLength} bytes and this file is ${file.size} bytes`;
        return response;
    }

    response.valid = true;
    response.reason = defaultReason;

    return response;
};

const initializeValidateEventWithStatusScreen = () => {
    const form = document.querySelector("form");
    if (!form) return;

    const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
    if (!submit) return;

    const validateEvent = initializeValidateEvent(form, submit, "required");

    validateEvent.inputs
        .filter(
            (input) =>
                input.type === "file" &&
                !input.hasAttribute(validateEvent.attribute)
        )
        .forEach((input) => {
            input.addEventListener("change", (event) => {
                input.files
                    ? input.setAttribute(validateEvent.attribute, "true")
                    : input.removeAttribute(validateEvent.attribute);

                if (!input.hasAttribute(validateEvent.attribute)) return;

                validateEvent.validateControl(
                    input,
                    validateInputRulesOverride
                );
            });
        });

    const validateInputRulesOverride = (control: HTMLInputElement): boolean => {
        if (control.type !== "file") return validateInputRules(control);

        const response = validateInputFileType(
            control,
            validateEvent.getInvalidMessageByTarget(control)
        );
        if (!response.valid) {
            validateEvent.setInvalidMessageByTarget(control, response.reason);
        }

        return response.valid;
    };

    validateEvent.validateInputEvent = (event: Event) => {
        validateEvent.validateControl(
            event.target as HTMLInputElement,
            validateInputRulesOverride
        );
    };

    const statusScreen = new StatusScreen();

    validateEvent.inputs
        .filter((input) => input.type === "file")
        .forEach((input) => {
            const id = input.getAttribute("aria-controls");
            if (!id) return;

            const element = document.querySelector<HTMLElement>(`#${id}`);
            if (!element) return;

            const text = element.textContent;

            element.innerHTML = "";
            element.setAttribute("data-status-screen-reserve", "true");

            const ss = getStatusScreenOrCreate(
                `status-screen-${input.id.toLowerCase()}`,
                element
            );

            ss.addCSSClass("status-screen--inline");
            ss.problem(text ?? "No file selected.");
        });

    validateEvent.submit?.addEventListener("click", async (event) => {
        validateEvent.validateInputs(validateInputRulesOverride);
        validateEvent.validateComboboxes();
        validateEvent.setFocusOnInvalidControl();

        if (!validateEvent.isValidForm()) {
            event.preventDefault();
            return;
        }

        event.preventDefault();

        statusScreen.busy("Please wait...");

        await statusScreen.updateSequence([
            {
                message: "Submitting. Please wait...",
                interval: 10000
            },
            {
                message: "Taking a bit longer. Hang in there...",
                interval: 10000
            },
            {
                message: "The connection seems to be slower this time.",
                interval: 5000
            }
        ]);

        statusScreen.problem(
            "There seems to be an issue with the connection. Please try again."
        );
    });

    validateEvent.processInputEvents();
};

initializeValidateEventWithStatusScreen();

const initializeAccordions = (): void => {
    const accordions = Array.from(document.querySelectorAll(".accordion"));

    accordions.forEach((accordion) => new Accordion(accordion));
};

const initializePageSectionNav = (): void => {
    const element = document.querySelector<HTMLElement>(".page-section-nav");
    if (!element) return;

    new PageSectionNav(element);
};

initializePageSectionNav();

initializeAccordions();

navigateToPageSectionOnLoad();

const initializeCountdown = () => {
    const countdownElement = document.querySelector(
        ".countdown[data-time]"
    ) as HTMLElement;
    if (!countdownElement) return;

    const time = countdownElement.getAttribute("data-time");

    if (time) {
        const countdown = new Countdown(
            countdownElement,
            new MomentCountdown(time)
        );

        countdown.start();
        countdown.stop(() => {
            countdownElement.classList.add("countdown--is-hidden");
        });
    }
};

initializeCountdown();

observer(".content-reveal", {
    inRange: (element) => element.classList.add("content-reveal--is-visible")
});
