
// Helpers

const $ = (id) => document.getElementById(id);


// Mobile Menu

const menuBtn = $("menuBtn");
const navLinks = $("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("show"));

  // close after clicking a link
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("show"));
  });

  // close on outside click
  document.addEventListener("click", (e) => {
    const inside = navLinks.contains(e.target) || menuBtn.contains(e.target);
    if (!inside) navLinks.classList.remove("show");
  });

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") navLinks.classList.remove("show");
  });
}


// Theme Toggle

const themeBtn = $("themeBtn");

function setTheme(mode) {
  if (mode === "light") document.body.classList.add("light");
  else document.body.classList.remove("light");
  localStorage.setItem("theme", mode);
}

setTheme(localStorage.getItem("theme") || "dark");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light");
    setTheme(isLight ? "dark" : "light");
  });
}


// Footer Year

const yearEl = $("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


// Projects Counter

const expCount = $("expCount");
if (expCount) {
  const target = 3; // number of project cards 
  let current = 0;

  const timer = setInterval(() => {
    current++;
    expCount.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 120);
}


// Contact Form (mailto)

const form = $("contactForm");
const note = $("formNote");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("name")?.value.trim();
    const email = $("email")?.value.trim();
    const message = $("message")?.value.trim();

    if (!name || !email || !message) {
      if (note) note.textContent = "Please fill all fields.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const yourEmail = "alimahabub977@gmail.com";
    window.location.href = `mailto:${yourEmail}?subject=${subject}&body=${body}`;

    if (note) note.textContent = "Opening your email app...";
  });
}


// Scroll Reveal (Observer)

const sections = document.querySelectorAll(".section");

function revealFallback() {
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) section.classList.add("show");
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach((section) => observer.observe(section));
} else {
  window.addEventListener("scroll", revealFallback);
  window.addEventListener("load", revealFallback);
  revealFallback();
}

// ensure first view shows on load
window.addEventListener("load", revealFallback);


// Active Nav Highlight

const sectionsForNav = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

function setActiveLink() {
  let current = "";
  sectionsForNav.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (window.scrollY >= top - 140 && window.scrollY < top + height - 140) {
      current = sec.getAttribute("id");
    }
  });

  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);


// Back to Top Button

const toTop = $("toTop");
if (toTop) {
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 500);
  });

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
