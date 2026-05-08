(function () {
  const page = document.querySelector("[data-service-page]");
  if (!page || !Array.isArray(window.TROCCA_SERVICES)) return;

  const slug = page.dataset.servicePage;
  const service = window.TROCCA_SERVICES.find((item) => item.slug === slug);
  if (!service) return;

  document.title = `${service.title} | Trocca Lubrificantes`;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", service.summary);
  }

  const setText = (selector, text) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = text;
    });
  };

  setText("[data-service-category]", service.category);
  setText("[data-service-title]", service.title);
  setText("[data-service-headline]", service.headline);
  setText("[data-service-summary]", service.summary);

  const image = document.querySelector("[data-service-image]");
  if (image) {
    image.src = service.image;
    image.alt = service.alt;
  }

  const blocks = document.querySelector("[data-service-blocks]");
  if (blocks) {
    blocks.innerHTML = "";
    service.blocks.forEach((block) => {
      const article = document.createElement("article");
      article.innerHTML = `<h2></h2><p></p>`;
      article.querySelector("h2").textContent = block.title;
      article.querySelector("p").textContent = block.text;
      blocks.appendChild(article);
    });
  }

  const steps = document.querySelector("[data-service-steps]");
  if (steps) {
    steps.innerHTML = "";
    service.steps.forEach((step, index) => {
      const item = document.createElement("article");
      item.innerHTML = `<span></span><strong></strong>`;
      item.querySelector("span").textContent = String(index + 1).padStart(2, "0");
      item.querySelector("strong").textContent = step;
      steps.appendChild(item);
    });
  }

  const related = document.querySelector("[data-related-services]");
  if (related) {
    related.innerHTML = "";
    window.TROCCA_SERVICES.filter((item) => item.slug !== slug)
      .slice(0, 3)
      .forEach((item) => {
        const link = document.createElement("a");
        link.href = `/servicos/${item.slug}/`;
        link.textContent = item.title;
        related.appendChild(link);
      });
  }
})();
