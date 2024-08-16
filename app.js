const nowPlaying = document.querySelector(".nowplaying");
const keys = document.querySelectorAll(".key");

function getKey(code) {
  return document.querySelector(`.key[data-key="${code}"]`);
}

function getAudio(code) {
  return document.querySelector(`audio[data-key="${code}"]`);
}

function playNote(code) {
  const key = getKey(code);
  const audio = getAudio(code);

  if (!key || !audio) {
    return;
  }

  const keyNote = key.getAttribute("data-note");
  key.classList.add("playing");
  nowPlaying.textContent = keyNote;
  audio.currentTime = 0;
  audio.play();
}

const throttledKeyDown = throttle(keyDown, 200);

function keyDown(e) {
  playNote(e.keyCode, throttledKeyDown);
}

function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

function transitionEnd(e) {
  if (e.propertyName === "transform") {
    e.target.classList.remove("playing");
  }
}

window.addEventListener("keydown", throttledKeyDown);
keys.forEach((key) => key.addEventListener("transitionend", transitionEnd));
