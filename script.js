document.addEventListener("DOMContentLoaded", () => {
    const expandableSections = document.querySelectorAll(".expandible");

    expandableSections.forEach(section => {
        section.addEventListener("mouseenter", () => {
            section.classList.add("expanded");
            section.setAttribute("aria-expanded", "true");
        });

        section.addEventListener("mouseleave", () => {
            section.classList.remove("expanded");
            section.setAttribute("aria-expanded", "false");
        });

        section.addEventListener("focusin", () => {
            section.classList.add("expanded");
            section.setAttribute("aria-expanded", "true");
        });

        section.addEventListener("focusout", () => {
            if (!section.contains(document.activeElement)) {
                section.classList.remove("expanded");
                section.setAttribute("aria-expanded", "false");
            }
        });
    });
});
