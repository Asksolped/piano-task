const nowPlaying = document.querySelector(".nowplaying");
const keys = document.querySelectorAll(".key");

let keyPressed = {};

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

function keyDown(e) {
  if (keyPressed[e.keyCode]) {
    return;
  }
  keyPressed[e.keyCode] = true;
  playNote(e.keyCode);
}

function keyUp(e) {
  keyPressed[e.keyCode] = false;
  const key = getKey(e.keyCode);
  const audio = getAudio(e.keyCode);

  if (key && audio) {
    key.classList.remove("playing");
    audio.pause();
    audio.currentTime = 0;
  }
}

function transitionEnd(e) {
  if (e.propertyName === "transform") {
    e.target.classList.remove("playing");
  }
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
keys.forEach((key) => key.addEventListener("transitionend", transitionEnd));
