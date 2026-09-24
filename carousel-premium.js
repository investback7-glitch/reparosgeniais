/*
 * REPAROS GENIAIS — CAROUSEL PREMIUM ENHANCER
 * Coloque este script DEPOIS de /carousel.js.
 * Ele melhora a transição do carousel atual sem substituir sua lógica.
 */
(() => {
  "use strict";

  const root = document.getElementById("rg-carousel");
  if (!root) return;

  const ACTIVE_SELECTORS = [
    ".active",
    ".is-active",
    ".current",
    ".selected",
    "[aria-current='true']",
    ".swiper-slide-active"
  ];

  const TRACK_SELECTORS = [
    ".carousel-track",
    ".slider-track",
    ".slides-track",
    ".track",
    ".carousel-inner",
    ".slides"
  ];

  function unique(elements) {
    return [...new Set(elements)];
  }

  function getTrack() {
    for (const selector of TRACK_SELECTORS) {
      const el = root.querySelector(selector);
      if (el && el.children.length >= 2) return el;
    }

    // Procura o primeiro elemento com vários filhos que contenham imagens.
    const candidates = [...root.querySelectorAll("*")]
      .filter(el => el.children.length >= 2)
      .sort((a, b) => b.children.length - a.children.length);

    return candidates.find(el =>
      [...el.children].filter(c => c.querySelector("img")).length >= 2
    ) || null;
  }

  function getSlides(track) {
    if (!track) return [];

    const direct = [...track.children].filter(el => {
      const tag = el.tagName.toLowerCase();
      return !["button", "script", "style"].includes(tag);
    });

    return direct.filter(el => el.querySelector("img") || el.dataset.slide !== undefined);
  }

  function markActive(slides) {
    let active = null;

    for (const selector of ACTIVE_SELECTORS) {
      active = slides.find(slide => slide.matches(selector));
      if (active) break;
    }

    // Se o carousel existente não usa classe ativa, detecta pelo centro da viewport.
    if (!active && slides.length) {
      const rootRect = root.getBoundingClientRect();
      const centerX = rootRect.left + rootRect.width / 2;

      let bestDistance = Infinity;
      for (const slide of slides) {
        const rect = slide.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(center - centerX);

        if (distance < bestDistance) {
          bestDistance = distance;
          active = slide;
        }
      }
    }

    slides.forEach(slide => {
      slide.classList.toggle("rg-premium-slide", true);
      slide.classList.toggle("rg-is-active", slide === active);
    });
  }

  function enhance() {
    const track = getTrack();
    if (!track) return false;

    track.classList.add("rg-premium-track");

    const slides = getSlides(track);
    if (slides.length < 2) return false;

    slides.forEach(slide => slide.classList.add("rg-premium-slide"));
    markActive(slides);

    root.classList.add("rg-premium-ready");

    // Observa a classe do carousel existente para acompanhar a troca de slide.
    if (!root.__rgPremiumObserver) {
      const observer = new MutationObserver(() => markActive(slides));

      observer.observe(root, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "aria-current"]
      });

      root.__rgPremiumObserver = observer;
    }

    return true;
  }

  // O carousel.js pode montar o conteúdo depois do carregamento.
  if (!enhance()) {
    const bootObserver = new MutationObserver(() => {
      if (enhance()) bootObserver.disconnect();
    });

    bootObserver.observe(root, {
      childList: true,
      subtree: true
    });

    setTimeout(() => bootObserver.disconnect(), 8000);
  }

  // Recalcula o slide visível após resize/orientação.
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const track = getTrack();
      const slides = getSlides(track);
      if (slides.length >= 2) markActive(slides);
    }, 180);
  }, { passive: true });
})();
