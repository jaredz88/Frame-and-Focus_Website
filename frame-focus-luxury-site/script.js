document.documentElement.classList.add("js");

const revealTargets = document.querySelectorAll(
  ".hero-content, .proof-strip > div, .intro-section, .cinematic-image, .cinematic-copy, .section-heading, .gallery-item, .service-card, .services-note, .standard-grid article, .process-list > div, .about-image, .about-copy, .contact-panel"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
);

revealTargets.forEach((target, index) => {
  target.classList.add("reveal");
  target.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  revealObserver.observe(target);
});

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.createElement("dialog");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <button class="lightbox-close" type="button" aria-label="Close image">Close</button>
  <img alt="" />
  <p></p>
`;
document.body.append(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");
const lightboxClose = lightbox.querySelector("button");

galleryItems.forEach((item) => {
  const image = item.querySelector("img");
  const caption = item.querySelector("figcaption");
  item.tabIndex = 0;
  item.setAttribute("role", "button");
  item.setAttribute("aria-label", `View ${caption?.textContent || "portfolio image"}`);

  const open = () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption?.textContent || "";
    lightbox.showModal();
  };

  item.addEventListener("click", open);
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});
