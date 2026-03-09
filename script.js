const introScreen = document.getElementById("introScreen");
const enterSiteBtn = document.getElementById("enterSiteBtn");
const loader = document.getElementById("loader");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav a");

enterSiteBtn.addEventListener("click", () => {
  introScreen.classList.add("hide");
  document.body.classList.remove("no-scroll");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 500);

  bgMusic.play().catch(() => {});
});

window.addEventListener("load", () => {
  document.body.classList.add("no-scroll");
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1400);
});

// MOBILE MENU
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// TYPING EFFECT ROTATION
const typedLine = document.getElementById("typedLine");

const emotionalLines = [
  "Maa, kabhi kabhi bas aapke gale lagkar ro lene ka mann karta hai.",
  "Aapki hug mein hi mera asli sukoon rehta hai.",
  "Main strong tab hoon, jab mujhe pata hota hai ki aap mere saath ho.",
  "Aap meri maa hi nahi, meri poori duniya ho.",
  "Jab dil toot ta hai, tab sabse pehle aap yaad aati ho.",
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentLine = emotionalLines[lineIndex];

  if (!isDeleting) {
    typedLine.textContent = currentLine.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentLine.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedLine.textContent = currentLine.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % emotionalLines.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 28 : 45);
}

setTimeout(typeLoop, 1600);

// COUNTDOWN
function startCountdown() {
  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  function getBirthday() {
    const now = new Date();
    let year = now.getFullYear();
    const birthday = new Date(year, 2, 10, 0, 0, 0);
    if (now > birthday) return new Date(year + 1, 2, 10, 0, 0, 0);
    return birthday;
  }

  function update() {
    const diff = getBirthday() - new Date();

    if (diff <= 0) {
      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    days.textContent = String(d).padStart(2, "0");
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}
startCountdown();

// FLOATING PETALS + SPARKLES
const petalsContainer = document.getElementById("petals");
const sparklesContainer = document.getElementById("sparkles");

function createPetal() {
  const petal = document.createElement("span");
  petal.classList.add("petal");
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 6 + Math.random() * 6 + "s";
  petal.style.opacity = 0.5 + Math.random() * 0.5;
  petalsContainer.appendChild(petal);
  setTimeout(() => petal.remove(), 13000);
}

function createSpark() {
  const spark = document.createElement("span");
  spark.classList.add("spark");
  spark.style.left = Math.random() * 100 + "vw";
  spark.style.animationDuration = 5 + Math.random() * 5 + "s";
  sparklesContainer.appendChild(spark);
  setTimeout(() => spark.remove(), 11000);
}

setInterval(createPetal, 420);
setInterval(createSpark, 320);

// MUSIC TOGGLE
musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    musicToggle.textContent = "🔊";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🎵";
  }
});

// VOICE NOTE
const playVoiceBtn = document.getElementById("playVoiceBtn");
const voiceNote = document.getElementById("voiceNote");

playVoiceBtn.addEventListener("click", () => {
  if (voiceNote.paused) {
    voiceNote.play();
    playVoiceBtn.textContent = "⏸ Pause Voice Note";
  } else {
    voiceNote.pause();
    playVoiceBtn.textContent = "▶ Play Voice Note";
  }
});

voiceNote.addEventListener("ended", () => {
  playVoiceBtn.textContent = "▶ Play Voice Note";
});

// SLIDER
const sliderTrack = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slide");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let autoSlide;

function updateSlider(index) {
  if (!sliderTrack || !slides.length) return;

  currentSlide = index;
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active-thumb", i === currentSlide);
  });
}

function nextSliderImage() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider(currentSlide);
}

function prevSliderImage() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider(currentSlide);
}

function startAutoSlide() {
  if (!slides.length) return;
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    nextSliderImage();
  }, 3500);
}

if (prevSlide) {
  prevSlide.addEventListener("click", () => {
    prevSliderImage();
    startAutoSlide();
  });
}

if (nextSlide) {
  nextSlide.addEventListener("click", () => {
    nextSliderImage();
    startAutoSlide();
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);
    updateSlider(index);
    startAutoSlide();
  });
});

// SECRET MODAL
const secretModal = document.getElementById("secretModal");
const openSecretBtn = document.getElementById("openSecretBtn");
const closeSecretBtn = document.getElementById("closeSecretBtn");

openSecretBtn.addEventListener("click", () => {
  secretModal.classList.remove("hidden");
  document.body.classList.add("no-scroll");
});

closeSecretBtn.addEventListener("click", () => {
  secretModal.classList.add("hidden");
  document.body.classList.remove("no-scroll");
});

// SURPRISE MODAL
const envelopeModal = document.getElementById("envelopeModal");
const openEnvelopeBtn = document.getElementById("openEnvelopeBtn");
const closeEnvelopeBtn = document.getElementById("closeEnvelopeBtn");

openEnvelopeBtn.addEventListener("click", () => {
  envelopeModal.classList.remove("hidden");
  document.body.classList.add("no-scroll");
});

closeEnvelopeBtn.addEventListener("click", () => {
  envelopeModal.classList.add("hidden");
  document.body.classList.remove("no-scroll");
});

// ENVELOPE OPENING
const envelope = document.getElementById("envelope");
const openLetterBtn = document.getElementById("openLetterBtn");

openLetterBtn.addEventListener("click", () => {
  envelope.classList.toggle("open");
  openLetterBtn.textContent =
    envelope.classList.contains("open") ? "Close Envelope" : "Open Envelope";
});

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const zoomables = document.querySelectorAll(".zoomable");
const thumbs = document.querySelectorAll(".thumb");

zoomables.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.classList.remove("hidden");
    document.body.classList.add("no-scroll");
  });
});

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    const thumbIndex =
      thumb.dataset.index ? Number(thumb.dataset.index) : index;
    updateSlider(thumbIndex);
    startAutoSlide();
  });
});

if (slides.length) {
  updateSlider(0);
  startAutoSlide();
}

closeLightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
  document.body.classList.remove("no-scroll");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }
});

// ESC CLOSE
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    secretModal.classList.add("hidden");
    envelopeModal.classList.add("hidden");
    lightbox.classList.add("hidden");
    mainNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }
});

// REVEAL ON SCROLL
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => observer.observe(el));
