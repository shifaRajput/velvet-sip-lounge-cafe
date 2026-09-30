/* ============ PRELOADER ============ */
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("preloader").classList.add("hide"), 800);
});

/* ============ NAVBAR ============ */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navBackdrop = document.getElementById("navBackdrop");
function closeMenu() {
  navLinks.classList.remove("open");
  hamburger.classList.remove("active");
  navBackdrop && navBackdrop.classList.remove("show");
  document.body.style.overflow = "";
}
function toggleMenu() {
  const open = navLinks.classList.toggle("open");
  hamburger.classList.toggle("active", open);
  navBackdrop && navBackdrop.classList.toggle("show", open);
  document.body.style.overflow = open ? "hidden" : "";
}
hamburger.addEventListener("click", toggleMenu);
navBackdrop && navBackdrop.addEventListener("click", closeMenu);
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMenu(); });

/* ============ THEME TOGGLE ============ */
const themeToggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("vs-theme");
if (saved) document.documentElement.setAttribute("data-theme", saved);
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("vs-theme", next);
});

/* ============ RIPPLE ============ */
document.querySelectorAll(".ripple").forEach(btn => {
  btn.addEventListener("click", e => {
    const rect = btn.getBoundingClientRect();
    const r = document.createElement("span");
    r.className = "ripple-fx";
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + "px";
    r.style.left = (e.clientX - rect.left - size / 2) + "px";
    r.style.top = (e.clientY - rect.top - size / 2) + "px";
    btn.appendChild(r);
    setTimeout(() => r.remove(), 700);
  });
});

/* ============ MENU DATA ============ */
const MENU = [
  // Coffee
  { cat: "coffee", name: "Velvet Espresso", price: 180, img: "img/m_espresso.jpg", popular: true },
  { cat: "coffee", name: "Gold Foam Latte", price: 320, img: "img/m_goldlatte.jpg", popular: true },
  { cat: "coffee", name: "Maroon Mocha", price: 290, img: "img/m_mocha.jpg" },
  { cat: "coffee", name: "Iced Vanilla Cortado", price: 270, img: "img/m_icedcortado.jpg" },
  { cat: "coffee", name: "Spanish Latte", price: 310, img: "img/m_spanishlatte.jpg" },
  { cat: "coffee", name: "Hazelnut Cappuccino", price: 280, img: "img/m_hazelcap.jpg" },
  { cat: "coffee", name: "Single Origin Pour Over", price: 360, img: "img/m_pourover.jpg" },
  { cat: "coffee", name: "Bombay Filter Kaapi", price: 220, img: "img/m_filterkaapi.jpg", popular: true },
  // Snacks
  { cat: "snacks", name: "Truffle Parmesan Fries", price: 380, img: "img/m_trufflefries.jpg", popular: true },
  { cat: "snacks", name: "Velvet Sliders Trio", price: 520, img: "img/m_sliders.jpg", popular: true },
  { cat: "snacks", name: "Burrata & Heirloom Toast", price: 480, img: "img/m_burrata.jpg" },
  { cat: "snacks", name: "Smoked Paneer Tikka Bao", price: 420, img: "img/m_paneerbao.jpg" },
  { cat: "snacks", name: "Tandoori Chicken Wings", price: 460, img: "img/m_wings.jpg" },
  { cat: "snacks", name: "Mushroom Arancini", price: 390, img: "img/m_arancini.jpg" },
  { cat: "snacks", name: "Bandra Bombay Sandwich", price: 340, img: "img/m_bombaysandwich.jpg" },
  { cat: "snacks", name: "Crispy Calamari", price: 510, img: "img/m_calamari.jpg" },
  // Desserts
  { cat: "desserts", name: "Molten Gold Lava Cake", price: 420, img: "img/m_lavacake.jpg", popular: true },
  { cat: "desserts", name: "Classic Tiramisu", price: 380, img: "img/m_tiramisu.jpg" },
  { cat: "desserts", name: "Rose Pistachio Cheesecake", price: 410, img: "img/m_rosecheesecake.jpg" },
  { cat: "desserts", name: "Dark Chocolate Crémeux", price: 440, img: "img/m_chocolatecremeux.jpg", popular: true },
  { cat: "desserts", name: "Saffron Crème Brûlée", price: 390, img: "img/m_cremebrulee.jpg" },
  { cat: "desserts", name: "Hazelnut Praline Tart", price: 420, img: "img/m_hazelnuttart.jpg" },
  { cat: "desserts", name: "Mascarpone Berry Trifle", price: 370, img: "img/m_berrytrifle.jpg" },
  // Signature
  { cat: "signature", name: "Espresso Martini", price: 550, img: "img/m_espressomartini.jpg", popular: true },
  { cat: "signature", name: "Rose Petal Matcha", price: 480, img: "img/m_rosematcha.jpg", popular: true },
  { cat: "signature", name: "Velvet Negroni", price: 590, img: "img/m_negroni.jpg" },
  { cat: "signature", name: "Lychee Sake Spritz", price: 520, img: "img/m_lycheespritz.jpg" },
  { cat: "signature", name: "Smoked Old Fashioned", price: 620, img: "img/m_smokedoldfashioned.jpg" },
  { cat: "signature", name: "Hibiscus Gin Fizz", price: 540, img: "img/m_hibiscusfizz.jpg" },
  { cat: "signature", name: "Midnight Mocha Shaken", price: 460, img: "img/m_midnightmocha.jpg" },
];

const CAT_LABEL = { coffee: "Coffee", snacks: "Snacks", desserts: "Dessert", signature: "Signature" };

const grid = document.getElementById("menuGrid");
function renderMenu(cat = "all") {
  const items = cat === "all" ? MENU : MENU.filter(i => i.cat === cat);
  grid.innerHTML = items.map(i => `
    <article class="menu-card">
      <div class="menu-img">
        ${i.popular ? '<span class="popular-badge">🔥 Most Popular</span>' : ''}
        <img src="${i.img}" alt="${i.name}" loading="lazy">
      </div>
      <div class="menu-body">
        <p class="menu-cat">${CAT_LABEL[i.cat]}</p>
        <h3 class="menu-name">${i.name}</h3>
        <div class="menu-foot">
          <span class="menu-price">₹${i.price}</span>
          <a class="menu-order" href="https://wa.me/917734568540?text=${encodeURIComponent("Hi! I'd like to order " + i.name)}" target="_blank" rel="noopener">Order Now</a>
        </div>
      </div>
    </article>
  `).join("");
  // animate in
  requestAnimationFrame(() => {
    document.querySelectorAll(".menu-card").forEach((c, idx) => {
      setTimeout(() => c.classList.add("in"), idx * 40);
    });
  });
}
renderMenu();

document.querySelectorAll("#menuTabs .tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("#menuTabs .tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderMenu(tab.dataset.cat);
  });
});

/* ============ TESTIMONIALS ============ */
const REVIEWS = [
  { name: "Aisha R.", text: "The vibe is unreal — felt like we walked into a Mumbai movie set. The espresso martini is a 10/10.", stars: 5 },
  { name: "Karan & Mira", text: "Our favourite Bandra date spot. Low light, gold accents, and that lava cake. We come back every Friday.", stars: 5 },
  { name: "Zoya K.", text: "Most Instagrammable café I've been to in years. Staff is sweet, music is moody, food is plated like art.", stars: 5 },
  { name: "Devansh P.", text: "Came for coffee, stayed for the truffle fries and the playlist. Velvet booths are everything.", stars: 5 },
  { name: "Priya S.", text: "Sip Slow, Stay Late hits different at midnight. The matcha rose latte is now a personality trait.", stars: 5 },
  { name: "Ranveer M.", text: "Premium without being pretentious. Felt taken care of. The smoked old fashioned is dangerous.", stars: 5 },
];

const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
slidesEl.innerHTML = REVIEWS.map(r => `
  <div class="slide">
    <div class="slide-card">
      <div class="stars">${"★".repeat(r.stars)}</div>
      <p class="slide-text">"${r.text}"</p>
      <p class="slide-author">— ${r.name}</p>
    </div>
  </div>
`).join("");
dotsEl.innerHTML = REVIEWS.map((_, i) => `<button class="dot${i===0?' active':''}" data-i="${i}" aria-label="Slide ${i+1}"></button>`).join("");

let current = 0;
const total = REVIEWS.length;
function goTo(i) {
  current = (i + total) % total;
  slidesEl.style.transform = `translateX(-${current * 100}%)`;
  dotsEl.querySelectorAll(".dot").forEach((d, idx) => d.classList.toggle("active", idx === current));
}
document.getElementById("nextBtn").addEventListener("click", () => goTo(current + 1));
document.getElementById("prevBtn").addEventListener("click", () => goTo(current - 1));
dotsEl.querySelectorAll(".dot").forEach(d => d.addEventListener("click", () => goTo(+d.dataset.i)));
let auto = setInterval(() => goTo(current + 1), 5500);
document.getElementById("slider").addEventListener("mouseenter", () => clearInterval(auto));
document.getElementById("slider").addEventListener("mouseleave", () => auto = setInterval(() => goTo(current + 1), 5500));

/* Swipe support for slider */
(() => {
  const sliderEl = document.getElementById("slider");
  let startX = 0, dx = 0, dragging = false;
  sliderEl.addEventListener("touchstart", e => { startX = e.touches[0].clientX; dragging = true; clearInterval(auto); }, { passive: true });
  sliderEl.addEventListener("touchmove", e => { if (dragging) dx = e.touches[0].clientX - startX; }, { passive: true });
  sliderEl.addEventListener("touchend", () => {
    if (!dragging) return;
    if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
    dragging = false; dx = 0;
    auto = setInterval(() => goTo(current + 1), 5500);
  });
})();

/* ============ LIGHTBOX ============ */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lightboxImg");
document.querySelectorAll(".m-item img, .ig-tile img").forEach(img => {
  img.parentElement.addEventListener("click", e => {
    e.preventDefault();
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lb.classList.add("show");
  });
});
document.getElementById("lightboxClose").addEventListener("click", () => lb.classList.remove("show"));
lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("show"); });

/* ============ SCROLL REVEAL ============ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section-head, .glass, .m-item, .ig-tile, .reveal").forEach(el => {
  el.classList.add("reveal");
  io.observe(el);
});
