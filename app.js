const nowPlayingElement = document.querySelector(".nowplaying");
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
    console.warn(`No key or audio found for code: ${code}`);
    return;
  }

  const keyNote = key.getAttribute("data-note");
  key.classList.add("playing");
  nowPlayingElement.textContent = keyNote;
  audio.currentTime = 0;
  audio.play();
}

function keyDown(e) {
  playNote(e.keyCode);
}

function transitionEnd(e) {
  if (e.propertyName === "transform") {
    e.target.classList.remove("playing");
  }
}

window.addEventListener("keydown", keyDown);
keys.forEach(key => key.addEventListener("transitionend", transitionEnd));