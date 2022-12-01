const calendar = document.querySelector(".calendar");
const items = calendar.querySelectorAll(".calendar__item");
const candies = calendar.querySelectorAll(".calendar__candy");
const images = calendar.querySelectorAll(".calendar__img");

const gallery = document.querySelector(".gallery");
const slider = gallery.querySelector(".slider__list");
const btnPrev = gallery.querySelector(".control--prev");
const btnNext = gallery.querySelector(".control--next");
const btnClose = gallery.querySelector(".control--close");

const player = document.querySelector(".music__player");
const btnPause = document.querySelector(".music__pause");
const btnPauseText = btnPause.querySelector(".music__span")

const sources = document.querySelector(".sources__list")
const btnSrc = document.querySelector(".sources__btn")

const crack = new Audio("audio/crack.mp3");
const crash = new Audio("audio/crash.mp3");
const ding = new Audio("audio/ding.mp3");

/* LOCAL STORAGE */

let isMusic = true;
let isStorage = true;

try {
  for (let i = 0; i < items.length; i++) {
    if (localStorage.getItem(`day-${i}-crashed`)) {
      candies[i].classList.add("crashed");
    }
  };
  isMusic = localStorage.getItem("music");
} catch (error) {
  isStorage = false;
}

/* MUSIC BACKGROUND */

window.addEventListener("click", () => {
    if (isMusic) {
      player.volume = 0.15;
      player.play();
    };
    isMusic = false;
});

player.addEventListener("ended", () => {
  player.src = "audio/happy-santa.ogg";
  player.pause();
  player.load();
  player.play();
})

btnPause.addEventListener("click", () => {
  if (player.paused) {
    player.volume = 0.15;
    player.play();
    btnPauseText.innerText = "Pause";
    if (isStorage) {
      localStorage.setItem("music", true);
    }
  } else {
    player.pause();
    btnPauseText.innerText = "Play";
    if (isStorage) {
      localStorage.setItem("music", false);
    }
  }
})

/* CANDY BUTTONS */

for (let i = 0; i < items.length; i++) {

  if (items[i].children.length < 2) {
    candies[i].addEventListener("click", () => {
      items[i].classList.remove("error");
      items[i].offsetWidth = items[i].offsetWidth;
      items[i].classList.add("error");
      ding.play();
    })

  } else {
    let isCracked = false;
    candies[i].addEventListener("click", () => {
      if (isCracked) {
        candies[i].classList.add("crashed");
        candies[i].classList.remove("cracked");
        crash.play();

        if (isStorage) {
          localStorage.setItem(`day-${i}-crashed`, true);
        }

      } else {
        candies[i].classList.add("cracked")
        isCracked = true;
        crack.play();
      }
    })
  }
}


/* GALLERY */

let currentIndex = 0;

for  (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", () => {
    gallery.classList.add("active");
    slider.style.transform = `translateX(-${i * 100}%)`;
    currentIndex = i;
  })
}

btnPrev.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex >= 0) {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  } else {
    currentIndex++;
  }
})

btnNext.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < slider.children.length) {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  } else {
    currentIndex--;
  }
})

btnClose.addEventListener("click", () => {
  gallery.classList.remove("active");
})

window.addEventListener("keydown", (evt) => {
  if (evt.key === "Esc" || evt.key === "Escape") {
    gallery.classList.remove("active");
    sources.classList.remove("active");
  }
})

/* SOURCES */

btnSrc.addEventListener("click", (evt) => {
  evt.preventDefault();
  sources.classList.toggle("active");
})
