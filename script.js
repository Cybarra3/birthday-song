const button = document.getElementById("playButton");

const song = document.getElementById("birthdaySong");

button.addEventListener("click", () => {

song.play();

button.innerHTML = "🎵 Playing...";

button.disabled = true;

});
