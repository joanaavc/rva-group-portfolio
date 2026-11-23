document.documentElement.classList.add("js-enabled");

const currentPage = document.body.dataset.page;
const currentLink = document.querySelector(`[data-nav="${currentPage}"]`);

if (currentLink) {
  currentLink.setAttribute("aria-current", "page");
}

const highlightedMember = document.getElementById(
  window.location.hash.slice(1),
);

if (highlightedMember?.classList.contains("member-card")) {
  highlightedMember.classList.add("is-highlighted");
  window.setTimeout(() => {
    highlightedMember.classList.remove("is-highlighted");
  }, 1500);
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

  contactModal
    .querySelectorAll("[data-contact-modal-close]")
    .forEach((closeButton) => {
      closeButton.addEventListener("click", () => contactModal.close());
    });

  contactModal.addEventListener("click", (event) => {
    if (event.target === contactModal) {
      contactModal.close();
    }
  });

  contactModal.addEventListener("close", () => contactSubmit.focus());
}

const artworkGallery = document.querySelector(".individual-works");
const artworkLightbox = document.querySelector("[data-artwork-lightbox]");
const artworkLightboxImage = artworkLightbox?.querySelector(
  "[data-artwork-lightbox-image]",
);
const artworkLightboxTitle = artworkLightbox?.querySelector(
  "[data-artwork-lightbox-title]",
);
const artworkLightboxClose = artworkLightbox?.querySelector(
  "[data-artwork-lightbox-close]",
);

if (
  artworkGallery &&
  artworkLightbox instanceof HTMLDialogElement &&
  artworkLightboxImage instanceof HTMLImageElement &&
  artworkLightboxTitle instanceof HTMLElement &&
  artworkLightboxClose instanceof HTMLButtonElement
) {
  const artworkImages = artworkGallery.querySelectorAll(".artwork-image img");
  let activeArtworkImage = null;

  const openArtwork = (image) => {
    activeArtworkImage = image;
    artworkLightboxImage.src = image.currentSrc || image.src;
    artworkLightboxImage.alt = image.alt;
    const caption = image.closest("figure")?.querySelector("figcaption");
    artworkLightboxTitle.textContent =
      caption?.querySelector(".artwork-title")?.textContent?.trim() ||
      caption?.textContent?.trim() ||
      image.alt;
    artworkLightbox.showModal();
  };

  artworkImages.forEach((image) => {
    image.classList.add("is-expandable-artwork");
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `View ${image.alt} full size`);
  });

  artworkGallery.addEventListener("click", (event) => {
    if (
      event.target instanceof HTMLImageElement &&
      event.target.matches(".artwork-image img")
    ) {
      openArtwork(event.target);
    }
  });

  artworkGallery.addEventListener("keydown", (event) => {
    if (
      !(event.target instanceof HTMLImageElement) ||
      (event.key !== "Enter" && event.key !== " ")
    ) {
      return;
    }

    event.preventDefault();
    openArtwork(event.target);
  });

  artworkLightboxClose.addEventListener("click", () => artworkLightbox.close());

  artworkLightbox.addEventListener("click", (event) => {
    if (
      event.target === artworkLightbox ||
      event.target === artworkLightboxImage
    ) {
      artworkLightbox.close();
    }
  });

  artworkLightbox.addEventListener("close", () => {
    if (activeArtworkImage?.isConnected) {
      activeArtworkImage.focus();
    }

    activeArtworkImage = null;
  });
}

const documentPreviewOpen = document.querySelector(
  "[data-document-preview-open]",
);
const documentLightbox = document.querySelector("[data-document-lightbox]");
const documentLightboxFrame = documentLightbox?.querySelector(
  "[data-document-preview-frame]",
);
const documentPreviewClose = documentLightbox?.querySelector(
  "[data-document-preview-close]",
);

if (
  documentPreviewOpen instanceof HTMLButtonElement &&
  documentLightbox instanceof HTMLDialogElement &&
  documentLightboxFrame instanceof HTMLIFrameElement &&
  documentPreviewClose instanceof HTMLButtonElement
) {
  documentPreviewOpen.addEventListener("click", () => {
    const fullSizeSource = documentPreviewOpen.dataset.fullSrc;

    if (!fullSizeSource) {
      return;
    }

    documentLightboxFrame.src = fullSizeSource;
    documentLightbox.showModal();
  });

  documentPreviewClose.addEventListener("click", () => {
    documentLightbox.close();
  });

  documentLightbox.addEventListener("click", (event) => {
    if (event.target === documentLightbox) {
      documentLightbox.close();
    }
  });

  documentLightbox.addEventListener("close", () => {
    documentLightboxFrame.removeAttribute("src");
    documentPreviewOpen.focus();
  });
}
