/* =========================================================
   UAI BURGUER — INTERATIVIDADE, CARROSSEL, QUIZ & PEDIDOS
   Inspiração Direta: Hamburgueria Tradi (hamburgueriatradi.com.br)
   Unidade: Jardim Guanabara — Av. Goiânia, Goiânia - GO
   ========================================================= */
(function () {
  "use strict";

  const CFG = window.UAI_CONFIG;
  const SPOTLIGHTS = window.UAI_SPOTLIGHTS || [];
  const CAROUSEL = window.UAI_CAROUSEL || [];
  const CATS = window.UAI_CATEGORIES || [];
  const PRODUCTS = window.UAI_PRODUCTS || [];
  const PONTOS = window.UAI_PONTOS || [];
  const QUIZ = window.UAI_QUIZ;

  const CART_KEY = "uai_tradi_cart_v2";
  const CUSTOMER_KEY = "uai_tradi_customer_v2";

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const fmt = (n) => BRL.format(n);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const byId = (id) => PRODUCTS.find((p) => p.id === id);

  /* =========================================================
     1. NAVBAR FIXA & MENU MOBILE (ESTILO TRADI)
     ========================================================= */
  const navbar = $("#siteNavbar");
  const mobileMenuBtn = $("#mobileMenuBtn");
  const mobileMenu = $("#mobileMenu");
  const menuIconOpen = $("#menuIconOpen");
  const menuIconClose = $("#menuIconClose");

  function syncNavbarScroll() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", syncNavbarScroll, { passive: true });
  syncNavbarScroll();

  function setMobileMenu(open) {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.hidden = !open;
    mobileMenuBtn.setAttribute("aria-expanded", String(open));
    if (menuIconOpen) menuIconOpen.hidden = open;
    if (menuIconClose) menuIconClose.hidden = !open;
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      setMobileMenu(mobileMenu.hidden);
    });
  }

  $$(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => setMobileMenu(false));
  });

  /* =========================================================
     2. STATUS DE FUNCIONAMENTO NO HERO
     ========================================================= */
  const DAYS = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const toMin = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  const fmtHour = (hhmm) => {
    let [h, m] = hhmm.split(":").map(Number);
    if (h === 24) h = 0;
    return `${String(h).padStart(2, "0")}h${m > 0 ? String(m).padStart(2, "0") : "00"}`;
  };

  function renderStatus() {
    const now = new Date();
    const d = now.getDay();
    const cur = now.getHours() * 60 + now.getMinutes();
    const today = CFG.hours[d];
    const openNow = Boolean(today && cur >= toMin(today.open) && cur < toMin(today.close));

    const dot = $("#statusDot");
    const txt = $("#statusText");
    if (!dot || !txt) return;

    if (openNow) {
      dot.className = "w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse";
      txt.textContent = `ABERTO AGORA NO JARDIM GUANABARA • ATÉ ${fmtHour(today.close)}`;
    } else if (today) {
      dot.className = "w-2.5 h-2.5 rounded-full bg-amber-400";
      txt.textContent = `JARDIM GUANABARA • HOJE DAS ${fmtHour(today.open)} ÀS ${fmtHour(today.close)}`;
    } else {
      dot.className = "w-2.5 h-2.5 rounded-full bg-amber-400";
      txt.textContent = "JARDIM GUANABARA • TERÇA A DOMINGO A PARTIR DAS 18H00";
    }
  }

  /* =========================================================
     3. SEÇÃO ESTRELAS DA CASA / DESTAQUE DO MÊS (ESTILO TRADI)
     ========================================================= */
  let activeSpotlightIdx = 0;

  function renderSpotlight() {
    const tabsEl = $("#spotlightTabs");
    const contentEl = $("#spotlightContent");
    if (!tabsEl || !contentEl || !SPOTLIGHTS.length) return;

    tabsEl.innerHTML = SPOTLIGHTS.map(
      (s, i) => `
      <button
        type="button"
        role="tab"
        aria-selected="${i === activeSpotlightIdx}"
        data-spot="${i}"
        class="cat-pill ${i === activeSpotlightIdx ? "active" : ""}"
      >
        ${esc(s.name)}
      </button>`
    ).join("");

    const item = SPOTLIGHTS[activeSpotlightIdx];
    contentEl.innerHTML = `
      <div class="relative animate-fade-up">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/30 bg-card group">
          <img
            src="${esc(item.image)}"
            alt="${esc(item.name)} — Destaque UAI Burguer Goiânia"
            class="w-full aspect-[4/4] sm:aspect-[4/4] object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div class="absolute top-4 right-4 bg-primary text-white font-heading text-sm tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <span>★ ${esc(item.monthTag)}</span>
          </div>
          <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span class="bg-background/85 backdrop-blur-sm border border-border text-accent font-heading text-sm tracking-wider px-3.5 py-1 rounded-full">
              ${esc(item.pill)}
            </span>
            <span class="bg-background/90 backdrop-blur-sm border border-primary/50 text-foreground font-heading text-2xl px-4 py-1 rounded-md">
              ${fmt(item.price)}
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-6 animate-fade-up">
        <div>
          <p class="font-heading text-sm tracking-[0.22em] text-accent uppercase mb-1">
            ${esc(item.subtitle)}
          </p>
          <h3 class="font-heading text-5xl md:text-6xl text-primary leading-none mb-3">
            ${esc(item.name)}
          </h3>
          <div class="h-1 w-24 bg-gradient-brand rounded-full"></div>
        </div>

        <p class="text-foreground/80 text-base md:text-lg leading-relaxed">
          ${esc(item.description)}
        </p>

        <div class="flex flex-wrap gap-2">
          ${item.tags
            .map(
              (tag) => `
            <span class="bg-muted border border-border text-foreground/85 text-xs sm:text-sm px-3.5 py-1.5 rounded-full">
              ✓ ${esc(tag)}
            </span>`
            )
            .join("")}
        </div>

        <div class="pt-2 flex flex-wrap items-center gap-4">
          <button
            type="button"
            data-add="${esc(item.id)}"
            class="btn-primary text-lg px-8 py-4 shadow-glow"
          >
            <span>PEDIR ${esc(item.name)}</span>
            <span>• ${fmt(item.price)}</span>
          </button>
          <a
            href="#cardapio"
            class="btn-outline text-base px-6 py-4"
          >
            VER CARDÁPIO COMPLETO
          </a>
        </div>
      </div>
    `;
  }

  const spotlightTabsEl = $("#spotlightTabs");
  if (spotlightTabsEl) {
    spotlightTabsEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-spot]");
      if (!btn) return;
      activeSpotlightIdx = Number(btn.dataset.spot) || 0;
      renderSpotlight();
    });
  }

  /* =========================================================
     4. CARROSSEL DE FOTOS DO CARDÁPIO (IGUAL À TRADI)
     ========================================================= */
  let carouselIdx = 0;
  let carouselTimer = null;

  function renderCarouselStructure() {
    const slidesEl = $("#carouselSlides");
    const thumbsEl = $("#carouselThumbs");
    const totalEl = $("#carouselTotal");
    if (!slidesEl || !thumbsEl || !CAROUSEL.length) return;

    totalEl.textContent = String(CAROUSEL.length).padStart(2, "0");

    slidesEl.innerHTML = CAROUSEL.map((slide, i) => {
      const prod = byId(slide.productId);
      const priceStr = prod ? ` • ${fmt(prod.price)}` : "";
      return `
        <div class="carousel-slide absolute inset-0 ${i === 0 ? "active" : ""}" data-slide="${i}">
          <img
            src="${esc(slide.image)}"
            alt="${esc(slide.name)}"
            class="w-full h-full object-cover"
            loading="${i === 0 ? "eager" : "lazy"}"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-background/75 via-background/20 to-transparent"></div>
          <div class="absolute bottom-5 left-5 md:bottom-9 md:left-9 right-24 z-10">
            <p class="text-accent font-heading text-xs sm:text-sm tracking-[0.2em] uppercase mb-1">
              ${esc(slide.subtitle)}
            </p>
            <h3 class="font-heading text-3xl sm:text-4xl md:text-6xl text-foreground leading-none mb-3">
              ${esc(slide.name)}
            </h3>
            <button
              type="button"
              data-add="${esc(slide.productId)}"
              class="btn-primary text-xs sm:text-sm px-4 py-2"
            >
              + PEDIR AGORA${priceStr}
            </button>
          </div>
        </div>
      `;
    }).join("");

    thumbsEl.innerHTML = CAROUSEL.map(
      (slide, i) => `
      <button
        type="button"
        data-thumb="${i}"
        aria-label="Ver ${esc(slide.name)}"
        class="carousel-thumb relative flex-shrink-0 w-20 h-14 md:w-28 md:h-20 ${i === 0 ? "active" : ""}"
      >
        <img src="${esc(slide.image)}" alt="${esc(slide.name)}" class="w-full h-full object-cover" loading="lazy" />
      </button>`
    ).join("");
  }

  function setCarouselSlide(index) {
    if (!CAROUSEL.length) return;
    carouselIdx = (index + CAROUSEL.length) % CAROUSEL.length;
    $$("[data-slide]").forEach((el, i) => {
      el.classList.toggle("active", i === carouselIdx);
    });
    $$("[data-thumb]").forEach((el, i) => {
      el.classList.toggle("active", i === carouselIdx);
    });
    const curEl = $("#carouselCurrent");
    if (curEl) curEl.textContent = String(carouselIdx + 1).padStart(2, "0");
  }

  function resetCarouselTimer() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => {
      setCarouselSlide(carouselIdx + 1);
    }, 5000);
  }

  function initCarousel() {
    renderCarouselStructure();
    resetCarouselTimer();

    $("#carouselPrev")?.addEventListener("click", () => {
      setCarouselSlide(carouselIdx - 1);
      resetCarouselTimer();
    });
    $("#carouselNext")?.addEventListener("click", () => {
      setCarouselSlide(carouselIdx + 1);
      resetCarouselTimer();
    });
    $("#carouselThumbs")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-thumb]");
      if (!btn) return;
      setCarouselSlide(Number(btn.dataset.thumb));
      resetCarouselTimer();
    });

    const viewport = $("#carouselViewport");
    if (viewport) {
      viewport.addEventListener("mouseenter", () => clearInterval(carouselTimer));
      viewport.addEventListener("mouseleave", resetCarouselTimer);
    }
  }

  /* =========================================================
     5. CARDÁPIO DIGITAL COM FILTROS DE CATEGORIA & BUSCA
     ========================================================= */
  let activeCategory = "todos";
  let searchQuery = "";

  function renderCategoryPills() {
    const container = $("#categoryPills");
    if (!container) return;
    container.innerHTML = CATS.map(
      (cat) => `
      <button
        type="button"
        role="tab"
        aria-selected="${cat.id === activeCategory}"
        data-cat="${esc(cat.id)}"
        class="cat-pill ${cat.id === activeCategory ? "active" : ""}"
      >
        ${esc(cat.name)}
      </button>`
    ).join("");
  }

  function productCardHTML(p) {
    const badgeHTML = p.badge
      ? `<span class="bg-primary text-white font-heading text-xs tracking-wider px-2.5 py-0.5 rounded-sm uppercase">${esc(p.badge)}</span>`
      : "";

    return `
      <article
        class="menu-card flex flex-col justify-between cursor-pointer group animate-fade-up"
        data-id="${esc(p.id)}"
      >
        <div>
          <div class="relative aspect-[16/10] rounded-sm overflow-hidden bg-muted mb-4 border border-border">
            <img
              src="${esc(p.img)}"
              alt="${esc(p.name)}"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"></div>
            <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              ${badgeHTML}
            </div>
            <div class="absolute bottom-2.5 right-2.5 bg-background/90 backdrop-blur-sm border border-primary/40 px-3 py-0.5 rounded-sm">
              <span class="font-heading text-xl text-accent">${fmt(p.price)}</span>
            </div>
          </div>

          <h3 class="font-heading text-2xl text-foreground tracking-wide group-hover:text-accent transition-colors">
            ${esc(p.name)}
          </h3>
          <p class="text-xs font-medium text-accent/90 uppercase tracking-wider mt-0.5 mb-2">
            ${esc(p.specs)}
          </p>
          <p class="text-sm text-muted-foreground leading-relaxed">
            ${esc(p.desc)}
          </p>
        </div>

        <div class="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-border/70">
          <div>
            <span class="block text-[10px] uppercase tracking-wider text-muted-foreground">A partir de</span>
            <strong class="font-heading text-2xl text-foreground">${fmt(p.price)}</strong>
          </div>
          <button
            type="button"
            data-add="${esc(p.id)}"
            aria-label="Adicionar ${esc(p.name)}"
            class="btn-primary text-sm px-5 py-2.5"
          >
            + PEDIR
          </button>
        </div>
      </article>
    `;
  }

  function renderMenuGrid() {
    const grid = $("#menuGrid");
    if (!grid) return;

    const q = norm(searchQuery.trim());
    const filtered = PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "todos" || p.cat === activeCategory;
      const matchSearch =
        !q || norm(`${p.name} ${p.specs} ${p.desc} ${p.badge || ""}`).includes(q);
      return matchCat && matchSearch;
    });

    if (!filtered.length) {
      grid.innerHTML = `
        <div class="col-span-full menu-card text-center py-12">
          <p class="font-heading text-3xl text-foreground mb-2">NENHUM ITEM ENCONTRADO</p>
          <p class="text-muted-foreground text-sm mb-5">
            Não encontramos resultados para "${esc(searchQuery)}". Experimente buscar por "Barca", "X-Salada", "Bacon" ou "Shake".
          </p>
          <button type="button" id="resetMenuFilter" class="btn-primary text-sm px-6 py-2.5">
            MOSTRAR TODO O CARDÁPIO
          </button>
        </div>
      `;
      $("#resetMenuFilter")?.addEventListener("click", () => {
        activeCategory = "todos";
        searchQuery = "";
        if ($("#menuSearch")) $("#menuSearch").value = "";
        if ($("#menuSearchClear")) $("#menuSearchClear").hidden = true;
        renderCategoryPills();
        renderMenuGrid();
      });
      return;
    }

    grid.innerHTML = filtered.map(productCardHTML).join("");
  }

  $("#categoryPills")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    renderCategoryPills();
    renderMenuGrid();
  });

  const menuSearch = $("#menuSearch");
  const menuSearchClear = $("#menuSearchClear");

  if (menuSearch) {
    menuSearch.addEventListener("input", () => {
      searchQuery = menuSearch.value;
      if (menuSearchClear) menuSearchClear.hidden = !searchQuery.trim();
      if (searchQuery.trim()) {
        activeCategory = "todos";
        renderCategoryPills();
      }
      renderMenuGrid();
    });
  }

  if (menuSearchClear) {
    menuSearchClear.addEventListener("click", () => {
      searchQuery = "";
      menuSearch.value = "";
      menuSearchClear.hidden = true;
      renderMenuGrid();
      menuSearch.focus();
    });
  }

  /* =========================================================
     6. QUIZ INTERATIVO "QUAL É O SEU BURGER?" (ESTILO TRADI)
     ========================================================= */
  let quizStep = 0; // 0 = intro, 1..3 = perguntas, 4 = resultado
  let quizAnswers = [];

  function renderQuiz() {
    const box = $("#quizBox");
    if (!box || !QUIZ) return;

    if (quizStep === 0) {
      box.innerHTML = `
        <div class="menu-card p-8 md:p-10 text-center animate-fade-up">
          <div class="w-20 h-20 bg-primary/15 border border-primary/35 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            🤠
          </div>
          <p class="font-body text-foreground/90 text-lg italic mb-2">
            "Bão demais da conta, cumpadi! Tá na dúvida do que pedir hoje?"
          </p>
          <p class="font-body text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
            Responde 3 perguntas rápidas e eu te indico o <strong class="text-accent">UAI Burguer</strong> perfeito pra matar sua fome hoje — do X-Salada suculento até a famosa Barca Tentadora!
          </p>
          <button
            type="button"
            id="quizStartBtn"
            class="btn-primary text-lg px-10 py-4 hover:scale-105"
          >
            <span>BORA DESCOBRIR!</span>
            <span>→</span>
          </button>
        </div>
      `;
      $("#quizStartBtn")?.addEventListener("click", () => {
        quizStep = 1;
        quizAnswers = [];
        renderQuiz();
      });
      return;
    }

    if (quizStep >= 1 && quizStep <= QUIZ.questions.length) {
      const qObj = QUIZ.questions[quizStep - 1];
      box.innerHTML = `
        <div class="menu-card p-7 md:p-10 animate-fade-up">
          <!-- Barra de Progresso igual à Tradi -->
          <div class="flex gap-2 mb-6 justify-center">
            ${QUIZ.questions
              .map(
                (_, idx) => `
              <div class="h-1.5 rounded-full transition-all duration-300 ${
                idx < quizStep ? "bg-primary w-10" : "bg-border w-6"
              }"></div>`
              )
              .join("")}
          </div>

          <p class="font-body text-muted-foreground italic text-sm mb-3 text-center">
            "${esc(qObj.hostQuote)}"
          </p>
          <h3 class="font-heading text-3xl md:text-4xl text-foreground mb-7 text-center">
            ${esc(qObj.question)}
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            ${qObj.answers
              .map(
                (ans) => `
              <button
                type="button"
                data-qans="${esc(ans.value)}"
                class="group flex items-center gap-3.5 p-4 rounded-sm border border-border bg-muted/40 hover:border-primary hover:bg-primary/10 transition-all duration-200 text-left"
              >
                <span class="text-2xl group-hover:scale-125 transition-transform duration-200">${ans.emoji}</span>
                <span class="font-body text-foreground/85 group-hover:text-foreground font-medium text-sm sm:text-base">${esc(
                  ans.label
                )}</span>
              </button>`
              )
              .join("")}
          </div>
        </div>
      `;

      $$("[data-qans]", box).forEach((btn) => {
        btn.addEventListener("click", () => {
          quizAnswers.push(btn.dataset.qans);
          if (quizAnswers.length >= QUIZ.questions.length) {
            quizStep = 4;
          } else {
            quizStep++;
          }
          renderQuiz();
        });
      });
      return;
    }

    // Resultado Final (Step 4)
    const rec = QUIZ.recommend(quizAnswers);
    const prod = byId(rec.productId) || PRODUCTS[0];

    box.innerHTML = `
      <div class="menu-card p-7 md:p-10 animate-fade-up border-primary/40">
        <div class="text-center mb-6">
          <span class="inline-block bg-primary/20 border border-primary/40 text-accent font-heading text-xs tracking-widest uppercase px-3.5 py-1 rounded-full mb-2">
            COMBINAÇÃO PERFEITA ENCONTRADA
          </span>
          <h3 class="font-heading text-4xl md:text-5xl text-foreground">
            O SEU PEDIDO HOJE É: <span class="text-primary">${esc(prod.name)}</span>
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-muted/40 border border-border rounded-md p-4 mb-6">
          <div class="md:col-span-5 aspect-square rounded overflow-hidden border border-border">
            <img src="${esc(prod.img)}" alt="${esc(prod.name)}" class="w-full h-full object-cover" />
          </div>
          <div class="md:col-span-7 space-y-3">
            <div class="flex flex-wrap gap-1.5">
              ${rec.tags
                .map(
                  (t) =>
                    `<span class="bg-primary/20 text-accent font-heading text-xs tracking-wider px-2.5 py-0.5 rounded-sm">${esc(
                      t
                    )}</span>`
                )
                .join("")}
            </div>
            <p class="text-foreground/90 italic text-sm leading-relaxed border-l-2 border-primary pl-3">
              "${esc(rec.quote)}"
            </p>
            <p class="text-muted-foreground text-xs leading-relaxed">
              ${esc(prod.desc)}
            </p>
            <div class="pt-1">
              <span class="text-xs uppercase text-muted-foreground block">Valor:</span>
              <strong class="font-heading text-3xl text-accent">${fmt(prod.price)}</strong>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            data-add="${esc(prod.id)}"
            class="btn-primary text-base px-8 py-3.5"
          >
            + ADICIONAR AO MEU PEDIDO (${fmt(prod.price)})
          </button>
          <button
            type="button"
            id="quizRestartBtn"
            class="btn-outline text-base px-6 py-3.5"
          >
            REFAZER QUIZ
          </button>
        </div>
      </div>
    `;

    $("#quizRestartBtn")?.addEventListener("click", () => {
      quizStep = 0;
      quizAnswers = [];
      renderQuiz();
    });
  }

  /* =========================================================
     7. CLIQUE EM PRODUTOS E ABERTURA DO MODAL
     ========================================================= */
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      e.stopPropagation();
      openProductModal(addBtn.dataset.add);
      return;
    }
    const card = e.target.closest("#menuGrid .menu-card[data-id]");
    if (card && !e.target.closest("button, a")) {
      openProductModal(card.dataset.id);
    }
  });

  /* =========================================================
     8. CARRINHO / SACOLA & MODAL DE PERSONALIZAÇÃO
     ========================================================= */
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    cart = [];
  }
  cart = cart.filter((i) => byId(i.productId));

  const unitPrice = (item) => {
    const p = byId(item.productId);
    if (!p) return 0;
    const extras = (item.addons || []).reduce(
      (sum, id) => sum + ((p.addons || []).find((a) => a.id === id)?.price || 0),
      0
    );
    return p.price + extras;
  };

  const itemSignature = (i) =>
    [
      i.productId,
      i.ponto || "",
      (i.addons || []).slice().sort().join("+"),
      (i.obs || "").trim().toUpperCase(),
    ].join("|");

  const cartCount = () => cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = () => cart.reduce((s, i) => s + unitPrice(i) * i.qty, 0);

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCartIndicators();
    renderCartDrawer();
  }

  function addToCart(item, replaceKey) {
    if (replaceKey) {
      const idx = cart.findIndex((i) => i.key === replaceKey);
      if (idx > -1) cart.splice(idx, 1);
    }
    const sig = itemSignature(item);
    const existing = cart.find((i) => itemSignature(i) === sig);
    if (existing) {
      existing.qty += item.qty;
    } else {
      cart.push({
        ...item,
        key: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      });
    }
    saveCart();
  }

  function renderCartIndicators() {
    const count = cartCount();
    const countEl = $("#cartCount");
    if (countEl) countEl.textContent = count;

    const bar = $("#cartBar");
    const isModalOrDrawerOpen = !$("#cartDrawer").hidden || !$("#productModal").hidden;
    if (bar) {
      bar.hidden = count === 0 || isModalOrDrawerOpen;
      $("#cartBarQty").textContent = count;
      $("#cartBarTotal").textContent = fmt(subtotal());
    }
  }

  /* ---------- Modal de Produto ---------- */
  const modal = $("#productModal");
  let pmState = null;

  function openProductModal(productId, editItem) {
    const p = byId(productId);
    if (!p) return;

    pmState = {
      product: p,
      qty: editItem ? editItem.qty : 1,
      ponto: editItem ? editItem.ponto : p.ponto ? PONTOS[0].id : null,
      addons: new Set(editItem ? editItem.addons : []),
      editKey: editItem ? editItem.key : null,
    };

    $("#pmImg").src = p.img;
    $("#pmImg").alt = p.name;
    $("#pmTitle").textContent = p.name;
    $("#pmSpecs").textContent = p.specs;
    $("#pmDesc").textContent = p.desc;
    $("#pmBase").textContent = fmt(p.price);
    $("#pmBadge").textContent = p.badge ? `★ ${p.badge}` : "PERSONALIZAR ITEM";

    $("#pmPontoGroup").hidden = !p.ponto;
    $("#pmPonto").innerHTML = p.ponto
      ? PONTOS.map(
          (pt) => `
          <label class="choice-card">
            <input type="radio" name="ponto" value="${esc(pt.id)}" ${pmState.ponto === pt.id ? "checked" : ""} />
            <span>
              ${esc(pt.label)}
              <small>${esc(pt.spec)}</small>
            </span>
          </label>`
        ).join("")
      : "";

    const addons = p.addons || [];
    $("#pmAddonsGroup").hidden = addons.length === 0;
    $("#pmAddons").innerHTML = addons
      .map(
        (a) => `
        <label class="addon-item">
          <div class="flex items-center gap-2.5">
            <input type="checkbox" name="addon" value="${esc(a.id)}" ${pmState.addons.has(a.id) ? "checked" : ""} />
            <span class="addon-check" aria-hidden="true"></span>
            <span class="text-sm text-foreground">${esc(a.label)}</span>
          </div>
          <span class="font-heading text-lg text-accent">+ ${fmt(a.price)}</span>
        </label>`
      )
      .join("");

    $("#pmObs").value = editItem ? editItem.obs || "" : "";
    $("#pmAddLabel").textContent = editItem ? "ATUALIZAR ITEM" : "ADICIONAR AO PEDIDO";

    updateModalTotals();
    openLayer(modal);
  }

  function updateModalTotals() {
    if (!pmState) return;
    const unit = unitPrice({ productId: pmState.product.id, addons: [...pmState.addons] });
    $("#pmQty").textContent = pmState.qty;
    $("#pmMinus").disabled = pmState.qty <= 1;
    $("#pmSubtotal").textContent = fmt(unit * pmState.qty);
  }

  $("#pmForm")?.addEventListener("change", (e) => {
    if (!pmState) return;
    if (e.target.name === "ponto") pmState.ponto = e.target.value;
    if (e.target.name === "addon") {
      if (e.target.checked) pmState.addons.add(e.target.value);
      else pmState.addons.delete(e.target.value);
    }
    updateModalTotals();
  });

  $("#pmForm")?.addEventListener("submit", (e) => e.preventDefault());
  $("#pmMinus")?.addEventListener("click", () => {
    if (pmState && pmState.qty > 1) {
      pmState.qty--;
      updateModalTotals();
    }
  });
  $("#pmPlus")?.addEventListener("click", () => {
    if (pmState && pmState.qty < 50) {
      pmState.qty++;
      updateModalTotals();
    }
  });

  $("#pmAdd")?.addEventListener("click", () => {
    if (!pmState) return;
    const wasEdit = Boolean(pmState.editKey);
    const name = pmState.product.name;
    addToCart(
      {
        productId: pmState.product.id,
        qty: pmState.qty,
        ponto: pmState.ponto,
        addons: [...pmState.addons],
        obs: $("#pmObs").value.trim(),
      },
      pmState.editKey
    );
    closeLayer(modal);
    if (wasEdit) {
      openCartDrawer();
    } else {
      showToast(`✓ ${name} adicionado à sacola!`);
    }
  });

  /* ---------- Drawer do Carrinho ---------- */
  const drawer = $("#cartDrawer");
  const form = $("#checkoutForm");

  function openCartDrawer() {
    renderCartDrawer();
    openLayer(drawer);
  }

  $("#cartToggle")?.addEventListener("click", openCartDrawer);
  $("#cartBar")?.addEventListener("click", openCartDrawer);

  function itemSpecsList(item) {
    const p = byId(item.productId);
    const lines = [];
    if (item.ponto) lines.push(`Ponto: ${item.ponto}`);
    (item.addons || []).forEach((id) => {
      const a = (p.addons || []).find((x) => x.id === id);
      if (a) lines.push(`+ ${a.label}`);
    });
    if (item.obs) lines.push(`Obs: ${item.obs}`);
    return lines;
  }

  function renderCartDrawer() {
    const empty = cart.length === 0;
    $("#cartEmpty").hidden = !empty;
    form.hidden = empty;
    $("#drawerFoot").hidden = empty;

    $("#cartItems").innerHTML = cart
      .map((item) => {
        const p = byId(item.productId);
        const specs = itemSpecsList(item);
        return `
          <li class="py-3.5" data-key="${item.key}">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <img src="${esc(p.img)}" alt="" class="w-14 h-14 rounded object-cover border border-border shrink-0" />
                <div>
                  <div class="font-heading text-xl text-foreground leading-tight">
                    ${item.qty}x ${esc(p.name)}
                  </div>
                  ${specs.map((s) => `<div class="text-xs text-muted-foreground">${esc(s)}</div>`).join("")}
                </div>
              </div>
              <div class="text-right shrink-0">
                <div class="font-heading text-xl text-accent">${fmt(unitPrice(item) * item.qty)}</div>
                <div class="text-[11px] text-muted-foreground">${fmt(unitPrice(item))} cada</div>
              </div>
            </div>

            <div class="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
              <div class="flex items-center gap-3 text-xs">
                <button type="button" class="text-muted-foreground hover:text-foreground underline" data-edit="${item.key}">Editar</button>
                <button type="button" class="text-red-400 hover:text-red-300 underline" data-rm="${item.key}">Remover</button>
              </div>
              <div class="flex items-center border border-border rounded bg-muted/50 overflow-hidden">
                <button type="button" class="px-2.5 py-0.5 hover:bg-primary hover:text-white font-bold" data-dec="${item.key}" aria-label="Diminuir">−</button>
                <span class="px-2.5 py-0.5 border-x border-border font-heading text-base">${item.qty}</span>
                <button type="button" class="px-2.5 py-0.5 hover:bg-primary hover:text-white font-bold" data-inc="${item.key}" aria-label="Aumentar">+</button>
              </div>
            </div>
          </li>`;
      })
      .join("");

    renderTotals();
  }

  $("#cartItems")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const key = btn.dataset.inc || btn.dataset.dec || btn.dataset.rm || btn.dataset.edit;
    const item = cart.find((i) => i.key === key);
    if (!item) return;

    if (btn.dataset.inc) item.qty = Math.min(50, item.qty + 1);
    if (btn.dataset.dec) {
      item.qty--;
      if (item.qty < 1) cart = cart.filter((i) => i !== item);
    }
    if (btn.dataset.rm) cart = cart.filter((i) => i !== item);
    if (btn.dataset.edit) {
      closeLayer(drawer, true);
      openProductModal(item.productId, item);
      return;
    }
    saveCart();
  });

  const getMode = () => form?.querySelector('input[name="mode"]:checked')?.value || "delivery";
  const getPay = () => form?.querySelector('input[name="pay"]:checked')?.value || "PIX";

  function currentDeliveryFee() {
    if (getMode() !== "delivery") return 0;
    if (CFG.freeDeliveryFrom && subtotal() >= CFG.freeDeliveryFrom) return 0;
    return CFG.deliveryFee;
  }

  function renderTotals() {
    const sub = subtotal();
    const fee = currentDeliveryFee();
    const isDelivery = getMode() === "delivery";
    $("#tSubtotal").textContent = fmt(sub);
    $("#tDeliveryRow").hidden = !isDelivery;
    $("#tDelivery").textContent = fee === 0 ? "GRÁTIS" : fmt(fee);
    $("#tTotal").textContent = fmt(sub + fee);
  }

  function applyCheckoutMode() {
    const mode = getMode();
    $$("[data-modes]", form).forEach((el) => {
      el.hidden = !el.dataset.modes.split(" ").includes(mode);
    });
    $("#changeField").hidden = getPay() !== "DINHEIRO";
    $("#formError").hidden = true;
    renderTotals();
  }

  form?.addEventListener("change", (e) => {
    if (e.target.name === "mode" || e.target.name === "pay") applyCheckoutMode();
  });
  form?.addEventListener("input", (e) => e.target.classList.remove("invalid"));

  /* ---------- Máscara de Telefone & ViaCEP ---------- */
  $("#fPhone")?.addEventListener("input", (e) => {
    let d = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (d.length > 6) d = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    else if (d.length > 2) d = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    e.target.value = d;
  });

  $("#fCep")?.addEventListener("input", async (e) => {
    let d = e.target.value.replace(/\D/g, "").slice(0, 8);
    e.target.value = d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d;
    if (d.length !== 8) return;
    try {
      const r = await fetch(`https://viacep.com.br/ws/${d}/json/`);
      const j = await r.json();
      if (!j.erro) {
        const addr = [j.logradouro, j.bairro].filter(Boolean).join(", ");
        if (addr && !$("#fAddress").value.trim()) {
          $("#fAddress").value = addr + ", Nº ";
          $("#fAddress").focus();
        }
      }
    } catch {
      /* preenchimento manual */
    }
  });

  try {
    const saved = JSON.parse(localStorage.getItem(CUSTOMER_KEY)) || {};
    ["name", "phone", "cep", "address"].forEach((k) => {
      if (saved[k] && form?.elements[k]) form.elements[k].value = saved[k];
    });
  } catch {
    /* noop */
  }

  function validateCheckout() {
    const mode = getMode();
    const requiredFields = ["name"];
    if (mode === "salao") requiredFields.push("table");
    if (mode !== "salao") requiredFields.push("phone");
    if (mode === "delivery") requiredFields.push("address");

    let firstInvalid = null;
    requiredFields.forEach((name) => {
      const el = form.elements[name];
      let valid = el && el.value.trim().length > 0;
      if (name === "phone" && valid) {
        valid = el.value.replace(/\D/g, "").length >= 10;
      }
      if (el) el.classList.toggle("invalid", !valid);
      if (!valid && !firstInvalid) firstInvalid = el;
    });

    const err = $("#formError");
    if (firstInvalid) {
      err.textContent = "Por favor, preencha os campos obrigatórios destacados para enviar seu pedido.";
      err.hidden = false;
      firstInvalid.focus();
      return false;
    }

    err.hidden = true;
    return true;
  }

  function buildWhatsAppReceipt() {
    const f = form.elements;
    const mode = getMode();
    const pay = getPay();
    const lines = [];
    const rule = "--------------------------------";

    lines.push("🍔 *NOVO PEDIDO — UAI BURGUER GOIÂNIA*");
    lines.push(rule);

    cart.forEach((item) => {
      const p = byId(item.productId);
      lines.push(`*${item.qty}x ${p.name}* — ${fmt(unitPrice(item) * item.qty)}`);
      itemSpecsList(item).forEach((spec) => lines.push(`   • ${spec}`));
    });

    lines.push(rule);
    const sub = subtotal();
    const fee = currentDeliveryFee();
    lines.push(`Subtotal: ${fmt(sub)}`);
    if (mode === "delivery") {
      lines.push(`Taxa de Entrega: ${fee === 0 ? "Grátis" : fmt(fee)}`);
    }
    lines.push(`*TOTAL: ${fmt(sub + fee)}*`);
    lines.push(rule);

    const modeTitle = {
      delivery: "🛵 *Entrega (Delivery)*",
      retirada: "🥡 *Retirada no Balcão*",
      salao: "🍽️ *Consumo no Salão*",
    }[mode];

    lines.push(modeTitle);
    lines.push(`Cliente: ${f.name.value.trim()}`);
    if (mode === "salao") {
      lines.push(`Mesa: ${f.table.value.trim()}`);
    } else {
      lines.push(`WhatsApp: ${f.phone.value.trim()}`);
    }
    if (mode === "delivery") {
      const cepStr = f.cep.value.trim() ? ` (CEP: ${f.cep.value.trim()})` : "";
      lines.push(`Endereço: ${f.address.value.trim()}${cepStr}`);
    }

    let payStr = pay;
    if (pay === "DINHEIRO" && f.change.value.trim()) {
      payStr += ` (Troco para ${f.change.value.trim()})`;
    }
    lines.push(`Pagamento: ${payStr}`);

    return lines.join("\n");
  }

  $("#sendOrder")?.addEventListener("click", () => {
    if (!cart.length || !validateCheckout()) return;
    const f = form.elements;
    localStorage.setItem(
      CUSTOMER_KEY,
      JSON.stringify({
        name: f.name.value,
        phone: f.phone.value,
        cep: f.cep.value,
        address: f.address.value,
      })
    );
    const url = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(buildWhatsAppReceipt())}`;
    const win = window.open(url, "_blank", "noopener");
    if (!win) location.href = url;
    showToast("Enviando seu pedido para o WhatsApp do UAI Burguer!");
  });

  /* ---------- Controle de Modal e Drawer ---------- */
  let lastFocus = null;

  function openLayer(layer) {
    if (!document.body.classList.contains("no-scroll")) {
      lastFocus = document.activeElement;
    }
    layer.hidden = false;
    document.body.classList.add("no-scroll");
    renderCartIndicators();
  }

  function closeLayer(layer, keepFocus) {
    layer.hidden = true;
    if (!$(".modal:not([hidden]), .drawer:not([hidden])")) {
      document.body.classList.remove("no-scroll");
      if (!keepFocus && lastFocus && document.contains(lastFocus)) {
        lastFocus.focus();
      }
      if (!keepFocus) lastFocus = null;
    }
    if (layer === modal) pmState = null;
    renderCartIndicators();
  }

  [modal, drawer].forEach((layer) => {
    if (!layer) return;
    layer.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeLayer(layer);
    });
    layer.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeLayer(layer);
      }
    });
  });

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function showToast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.hidden = true;
    }, 2600);
  }

  /* =========================================================
     9. DADOS DA UNIDADE JARDIM GUANABARA & MAPA
     ========================================================= */
  function renderLocation() {
    const addrEl = $("#locAddress");
    if (addrEl) {
      addrEl.innerHTML = `<strong class="text-foreground">${esc(CFG.address.line1)}</strong><br/>${esc(
        CFG.address.line2
      )}<br/><span class="text-muted-foreground text-sm">CEP: ${esc(CFG.address.cep)}</span>`;
    }

    const q = encodeURIComponent(CFG.address.query);
    if ($("#gmapsLink")) {
      $("#gmapsLink").href = CFG.address.mapsShort || `https://www.google.com/maps/search/?api=1&query=${q}`;
    }
    if ($("#wazeLink")) {
      $("#wazeLink").href = `https://waze.com/ul?q=${q}&navigate=yes`;
    }
    if ($("#mapFrame")) {
      $("#mapFrame").src = `https://www.google.com/maps?q=${q}&output=embed`;
    }

    const todayIdx = new Date().getDay();
    const order = [2, 3, 4, 5, 6, 0, 1];
    const hoursEl = $("#hoursList");
    if (hoursEl) {
      hoursEl.innerHTML = order
        .map((d) => {
          const h = CFG.hours[d];
          const isToday = d === todayIdx;
          const label = h ? `${fmtHour(h.open)} às ${fmtHour(h.close)}` : "Fechado";
          return `
            <li class="flex justify-between py-1.5 border-b border-border/50 ${
              isToday ? "text-accent font-bold" : "text-foreground/80"
            }">
              <span>${DAYS[d]}${isToday ? " (Hoje)" : ""}</span>
              <span>${label}</span>
            </li>`;
        })
        .join("");
    }

    if ($("#footerWa")) {
      $("#footerWa").href = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(
        "Olá UAI Burguer! Quero fazer um pedido!"
      )}`;
    }
    if ($("#year")) {
      $("#year").textContent = new Date().getFullYear();
    }
  }

  /* ---------- Inicialização Geral ---------- */
  renderStatus();
  renderSpotlight();
  initCarousel();
  renderCategoryPills();
  renderMenuGrid();
  renderQuiz();
  renderLocation();
  applyCheckoutMode();
  renderCartIndicators();
})();
