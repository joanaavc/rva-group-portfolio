document.documentElement.classList.add("js-enabled");

const currentPage = document.body.dataset.page;
const currentLink = document.querySelector(`[data-nav="${currentPage}"]`);

if (currentLink) {
  currentLink.setAttribute("aria-current", "page");
}

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#site-navigation");

if (menuToggle && siteNavigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNavigation.classList.toggle("is-open", !isExpanded);
  });

  siteNavigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNavigation.classList.remove("is-open");
    }
  });
}

document.querySelectorAll(".design-panel").forEach((panel) => {
  const termButtons = panel.querySelectorAll(".design-term");
  const description = panel.querySelector("[data-term-description]");
  const sourceLink = panel.querySelector("[data-term-source]");

  if (!description || !(sourceLink instanceof HTMLAnchorElement)) {
    return;
  }

  termButtons.forEach((button) => {
    button.addEventListener("click", () => {
      termButtons.forEach((termButton) => {
        termButton.setAttribute("aria-pressed", String(termButton === button));
      });

      description.textContent = button.dataset.description || "";
      sourceLink.href = button.dataset.source || "";
      sourceLink.hidden = false;
    });
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const contactModal = document.querySelector("[data-contact-modal]");
const contactName = contactModal?.querySelector("[data-contact-name]");
const contactSubmit = contactForm?.querySelector('button[type="submit"]');

if (
  contactForm instanceof HTMLFormElement &&
  contactModal instanceof HTMLDialogElement &&
  contactName instanceof HTMLElement &&
  contactSubmit instanceof HTMLButtonElement
) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const name = new FormData(contactForm).get("name");
    contactName.textContent = typeof name === "string" ? name.trim() : "";
    contactModal.showModal();
  });

  contactSubmit.disabled = false;

  contactModal.querySelectorAll("[data-contact-modal-close]").forEach((closeButton) => {
    closeButton.addEventListener("click", () => contactModal.close());
  });

  contactModal.addEventListener("click", (event) => {
    if (event.target === contactModal) {
      contactModal.close();
    }
  });

  contactModal.addEventListener("close", () => contactSubmit.focus());
}
