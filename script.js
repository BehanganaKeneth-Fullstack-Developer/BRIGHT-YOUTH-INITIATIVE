const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".navLinks") || document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.classList.toggle("active");
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", (event) => {
  if (!navLinks?.classList.contains("open")) return;
  if (menuToggle?.contains(event.target) || navLinks.contains(event.target)) return;

  menuToggle?.classList.remove("active");
  navLinks.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.classList.remove("active");
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdown = document.querySelector(".nav-dropdown");
dropdownToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = dropdown.classList.toggle("open");
  dropdownToggle.setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", (event) => {
  if (!dropdown?.contains(event.target)) {
    dropdown?.classList.remove("open");
    dropdownToggle?.setAttribute("aria-expanded", "false");
  }
});

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  header?.classList.toggle("sticky", window.scrollY > 520);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.counter);
    const duration = 1400;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.5 });

document.querySelectorAll("[data-counter]").forEach((counter) => counterObserver.observe(counter));

const donateModal = document.getElementById("donateModal");
const videoModal = document.getElementById("videoModal");

document.querySelector("[data-open-donate]")?.addEventListener("click", () => donateModal?.showModal());
document.querySelector("[data-close-modal]")?.addEventListener("click", () => donateModal?.close());
document.querySelector("[data-open-video]")?.addEventListener("click", () => videoModal?.showModal());
document.querySelector("[data-close-video]")?.addEventListener("click", () => videoModal?.close());

[donateModal, videoModal].forEach((modal) => {
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
});

const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", (event) => {
  event.preventEventDefault?.();
  event.preventDefault();
  const status = contactForm.querySelector(".form-status");
  status.textContent = "Thank you — your message is ready to send.";
  contactForm.reset();
});

const youthRegistrationForm = document.getElementById("youthRegistrationForm");
youthRegistrationForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(youthRegistrationForm);
  const registration = Object.fromEntries(formData.entries());
  const registrations = JSON.parse(localStorage.getItem("bfyiRegistrations") || "[]");
  registrations.push({ ...registration, submittedAt: new Date().toISOString() });
  localStorage.setItem("bfyiRegistrations", JSON.stringify(registrations));

  const status = youthRegistrationForm.querySelector(".registration-status");
  const message = `Hello BFYI, I have submitted a youth registration application.%0AName: ${encodeURIComponent(registration.fullName)}%0AAge: ${encodeURIComponent(registration.age)}%0AProgramme: ${encodeURIComponent(registration.programme)}%0APhone: ${encodeURIComponent(registration.phone)}`;
  status.innerHTML = `Registration saved successfully. <a href="https://wa.me/256781576733?text=${message}" target="_blank" rel="noopener noreferrer">Send details on WhatsApp →</a>`;
  youthRegistrationForm.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
