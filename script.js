const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

const serviceHashRoutes = {
  "#cambio-automatico": "/servicos/cambio-automatico/",
  "#oleo-motor": "/servicos/oleo-motor/",
  "#freios-pastilhas": "/servicos/freios-pastilhas/",
  "#fluido-radiador": "/servicos/fluido-radiador/",
  "#suspensao-amortecedores": "/servicos/suspensao-amortecedores/",
  "#revisao-preventiva": "/servicos/revisao-preventiva/",
  "#delay-acelerador": "/servicos/delay-acelerador/",
  "#diagnostico-automotivo": "/servicos/diagnostico-automotivo/",
};

if (location.pathname.endsWith("/servicos.html") && serviceHashRoutes[location.hash]) {
  location.replace(serviceHashRoutes[location.hash]);
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const googleReviews = Array.isArray(window.TROCCA_GOOGLE_REVIEWS)
  ? window.TROCCA_GOOGLE_REVIEWS
  : [];

const screenshotReviews = [
  {
    reviewer: "Moacir Olegário",
    comment: "Excelente atendimento e preço justo. Virei cliente fiel",
  },
  {
    reviewer: "Joel Simão",
    comment:
      "Desde o atendimento pelo WhatsApp, já foi uma maravilha. Tenho um carro automático que peguei faz 4 meses, e queria...",
  },
  {
    reviewer: "Naldo Bina",
    comment:
      "Estou muito satisfeito pelo atendimento, serviço e atenção, excelente profissional, parabéns Vitor. Gostei muito da limpeza e organização de sua oficina. Recomendo muito.",
  },
  {
    reviewer: "Ailton Magal",
    comment:
      "Eu recomendo o Vitor, muito profissional e educado. Preço justo. O carro ficou muito bom, acabou os trancos e os ruídos de câmbio.",
  },
  {
    reviewer: "André Rosa",
    comment:
      "Serviço de troca de óleo do câmbio automático realizado com excelência. Atendimento profissional, equipe transparente...",
  },
  {
    reviewer: "Fabio Campos",
    comment:
      "Moro em Santana de Parnaíba e encontrei essa empresa nas redes sociais com uma avaliação muito boa, resolvi ligar e...",
  },
  {
    reviewer: "Willian koga",
    comment:
      "Atendimento de qualidade, conhecimento técnico, produtos de qualidade, preço justo e mão de obra qualificada....",
  },
  {
    reviewer: "Will Rodrigues",
    comment: "Ótimo atendimento, eles explicam tudo. Recomendo.",
  },
  {
    reviewer: "Luiz",
    comment:
      "Fiz a troca preventiva do câmbio, as trocas mais suaves em rotação mais baixa melhoraram consumo. Mecânico tirou todas as dúvidas e preço muito bom!",
  },
];

function createTestimonialCard(review) {
  const card = document.createElement("article");
  const firstName = (review.reviewer || "Cliente").trim().split(/\s+/)[0];
  const initial = firstName.charAt(0).toUpperCase();

  card.innerHTML = `
    <div class="review-top">
      <span class="stars">★★★★★</span>
      <span class="verified">Cliente verificado</span>
    </div>
    <p></p>
    <div class="review-author">
      <span class="avatar"></span>
      <div>
        <strong></strong>
        <span>Avaliação no Google</span>
      </div>
    </div>
  `;

  card.querySelector("p").textContent = review.comment || "Avaliação positiva no Google.";
  card.querySelector(".avatar").textContent = initial;
  card.querySelector("strong").textContent = firstName;
  return card;
}

const testimonialTrack = document.querySelector(".testimonial-grid");
const reviewsToShow = googleReviews.length ? googleReviews : screenshotReviews;

if (testimonialTrack && reviewsToShow.length) {
  testimonialTrack.innerHTML = "";
  [...reviewsToShow, ...reviewsToShow].forEach((review) => {
    testimonialTrack.appendChild(createTestimonialCard(review));
  });

  const testimonialTotal = reviewsToShow.length;
  let testimonialIndex = 0;
  let testimonialTimer;

  const moveTestimonials = () => {
    const firstCard = testimonialTrack.querySelector("article");
    if (!firstCard) return;

    const trackStyles = window.getComputedStyle(testimonialTrack);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    testimonialTrack.style.transform = `translate3d(${-testimonialIndex * step}px, 0, 0)`;
  };

  const resetTestimonials = () => {
    testimonialTrack.style.transition = "none";
    testimonialIndex = 0;
    moveTestimonials();
    testimonialTrack.getBoundingClientRect();
    testimonialTrack.style.transition = "";
  };

  const advanceTestimonials = () => {
    testimonialIndex += 1;
    moveTestimonials();

    if (testimonialIndex >= testimonialTotal) {
      window.setTimeout(resetTestimonials, 650);
    }
  };

  const startTestimonials = () => {
    window.clearInterval(testimonialTimer);
    testimonialTimer = window.setInterval(advanceTestimonials, 5200);
  };

  testimonialTrack.addEventListener("mouseenter", () => window.clearInterval(testimonialTimer));
  testimonialTrack.addEventListener("mouseleave", startTestimonials);
  window.addEventListener("resize", resetTestimonials);
  moveTestimonials();
  startTestimonials();
}

const brandTrack = document.querySelector("#brandTrack");

const carBrands = [
  ["Toyota", "toyota"],
  ["Volkswagen", "volkswagen"],
  ["Ford", "ford"],
  ["Chevrolet", "chevrolet"],
  ["Hyundai", "hyundai"],
  ["Nissan", "nissan"],
  ["Honda", "honda"],
  ["Kia", "kia"],
  ["BMW", "bmw"],
  ["Mercedes-Benz", "mercedesbenz"],
  ["Audi", "audi"],
  ["Lexus", "lexus"],
  ["Volvo", "volvo"],
  ["BYD", "byd"],
  ["Fiat", "fiat"],
  ["Peugeot", "peugeot"],
  ["Renault", "renault"],
  ["Porsche", "porsche"],
  ["Jeep", "jeep"],
  ["Land Rover", "landrover"],
  ["Jaguar", "jaguar"],
  ["Mitsubishi Motors", "mitsubishi"],
  ["Subaru", "subaru"],
  ["Suzuki", "suzuki"],
  ["Chery", "chery"],
  ["GWM", "greatwall"],
  ["Ram", "ram"],
];

function createBrandCard([name, slug]) {
  const card = document.createElement("span");
  card.className = "brand-card";

  const logo = document.createElement("img");
  logo.src = `https://cdn.simpleicons.org/${slug}/ffffff`;
  logo.alt = "";
  logo.loading = "lazy";
  logo.addEventListener("error", () => {
    logo.remove();
  });

  const label = document.createElement("span");
  label.textContent = name;

  card.append(logo, label);
  return card;
}

if (brandTrack) {
  [...carBrands, ...carBrands].forEach((brand) => {
    brandTrack.appendChild(createBrandCard(brand));
  });
}

const legacyGoogleReviews = googleReviews;
const testimonialCards = document.querySelectorAll(".testimonial-grid article");

if (legacyGoogleReviews.length && testimonialCards.length) {
  testimonialCards.forEach((card, index) => {
    const review = legacyGoogleReviews[index % legacyGoogleReviews.length];
    const text = card.querySelector("p");
    const avatar = card.querySelector(".avatar");
    const name = card.querySelector(".review-author strong");
    const source = card.querySelector(".review-author span");
    const stars = card.querySelector(".stars");

    if (text) text.textContent = review.comment || "Avaliação positiva no Google.";
    if (avatar) avatar.textContent = (review.reviewer || "G").trim().charAt(0).toUpperCase();
    if (name) name.textContent = (review.reviewer || "Cliente Google").trim().split(/\s+/)[0];
    if (source) source.textContent = "Avaliação no Google";
    if (stars) stars.textContent = "★★★★★";
  });
}
