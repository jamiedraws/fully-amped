import { importScrollableHeightByElement } from "Shared/ts/applications/navigation";
import { observer } from "Shared/ts/observers/intersection";

interface ISectionCandidate {
    selector: string;
    anchor: HTMLAnchorElement;
    section: HTMLElement;
}

export default class PageSectionNav {
    public element: HTMLElement | undefined | null;

    public combobox: HTMLSelectElement | undefined | null;

    public candidates: ISectionCandidate[] = [];

    private root: CSSStyleDeclaration = window.getComputedStyle(
        document.documentElement,
        ":root"
    );

    private get scrollableHeight(): string {
        return this.root.getPropertyValue("scroll-padding-top");
    }

    constructor(element: HTMLElement) {
        this.element = element;

        this.candidates = this.captureSectionCandidates();

        this.initializeScrollableHeight()
            .then(() => {
                this.observeTracker();
                this.initializeAnchorActions();

                this.initializeComboboxAction();
            })
            .catch((error) => console.debug(error));
    }

    private async initializeScrollableHeight(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!this.element) {
                throw {
                    message: `The HTMLElement could not be obtained from the current document.`
                };
            }

            importScrollableHeightByElement(
                this.element,
                "page-section-nav-height"
            );

            const props = Array.from(document.styleSheets)
                .filter((s) => s.href?.startsWith(window.location.origin))
                .flatMap((styleSheet: CSSStyleSheet) =>
                    Array.from(styleSheet.cssRules)
                )
                .filter(
                    (cssRule: CSSRule): cssRule is CSSStyleRule =>
                        cssRule instanceof CSSStyleRule &&
                        cssRule.selectorText === ":root"
                )
                .flatMap((cssRule: CSSStyleRule) => Array.from(cssRule.style))
                .filter((style: string) =>
                    style.startsWith("--page-section-nav-calc")
                )
                .map((prop) => `var(${prop})`)
                .join(" + ");

            const style = document.createElement("style");
            style.innerHTML = `html { scroll-padding-top: calc(${props}) }`;

            document.body.appendChild(style);

            requestIdleCallback(() => {
                const root = window.getComputedStyle(
                    document.documentElement,
                    ":root"
                );

                resolve();
            });
        });
    }

    private observeTracker(): void {
        if (!this.element) return;

        observer("page-section-nav-tracker", {
            inRange: () => {
                this.element?.classList.remove(
                    "page-section-nav--is-scrolling"
                );
            },
            outRange: () => {
                this.element?.classList.add("page-section-nav--is-scrolling");
            },
            unObserve: false
        });
    }

    private captureSectionCandidates(): ISectionCandidate[] {
        const element = this.element;
        if (!element) return [];

        return Array.from(
            element.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
        )
            .map((a) => ({
                anchor: a,
                selector: a.getAttribute("href")
            }))
            .filter(
                (g): g is Omit<ISectionCandidate, "section"> => !!g.selector
            )
            .map((g) => ({
                anchor: g.anchor,
                selector: g.selector,
                section: document.querySelector(g.selector)
            }))
            .filter((g): g is ISectionCandidate => !!g.section);
    }

    private addActiveState(candidate: ISectionCandidate): void {
        candidate.anchor.classList.add("page-section-nav__active-item");

        const combobox = this.combobox;
        if (!combobox) return;

        combobox.value = candidate.selector;
    }

    private removeActiveState(candidate: ISectionCandidate): void {
        candidate.anchor.classList.remove("page-section-nav__active-item");
    }

    private updateActiveStateByCandidate(candidate: ISectionCandidate): void {
        this.candidates
            .filter((c) => c.anchor !== candidate.anchor)
            .forEach((c) => this.removeActiveState(c));

        this.addActiveState(candidate);
    }

    private initializeComboboxAction(): void {
        const element = this.element;
        if (!element) return;

        const combobox = element.querySelector("select");
        if (!combobox) return;

        this.combobox = combobox;

        combobox.addEventListener("change", (event) => {
            event.preventDefault();

            const candidate = this.candidates.find(
                (candidate) => candidate.selector === combobox.value
            );
            if (!candidate) return;

            window.location.hash = candidate.selector;
        });

        combobox.value = this.getHash();
    }

    private getHash(): string {
        const hash = window.location.hash;

        if (
            hash === "" ||
            !this.candidates
                .map((candidate) => candidate.selector)
                .includes(hash)
        )
            return "";

        return hash;
    }

    private initializeAnchorActions(): void {
        this.candidates.forEach((candidate) => {
            observer(candidate.selector, {
                inRange: () => this.updateActiveStateByCandidate(candidate),
                outRange: () => this.removeActiveState(candidate),
                unObserve: false,
                options: {
                    root: null,
                    rootMargin: `-${this.scrollableHeight} 0px 0px`
                }
            });

            candidate.anchor.addEventListener("click", () => {
                requestAnimationFrame(() => {
                    this.updateActiveStateByCandidate(candidate);
                });
            });
        });
    }
}
