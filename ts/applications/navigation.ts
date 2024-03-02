export const navigateToPageSection = () => {
    const hash = window.location.hash;
    if (hash === "") return;

    const element = document.querySelector<HTMLElement>(hash);
    if (!element) return;

    element.scrollIntoView();
};

export const navigateToPageSectionOnLoad = () => {
    addEventListener("load", () => navigateToPageSection());
};
