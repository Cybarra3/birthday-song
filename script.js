const song =
document.getElementById("song");


const playButton =
document.getElementById("play");


const pauseButton =
document.getElementById("pauseSong");


const resumeButton =
document.getElementById("resumeSong");


const progressBar =
document.getElementById("progressBar");


const ageNumber =
document.getElementById("ageNumber");



playButton.onclick=()=>{


song.play();


document
.querySelectorAll(".flame")
.forEach(
f=>f.classList.add("lit")
);


createBalloons();

createSparkles();

startFireworks();

startVisualizer();


playButton.innerHTML=
"🎵 Playing Birthday Song";


};





pauseButton.onclick=()=>{


song.pause();


pauseButton.innerHTML="🎁⏸️";


};




resumeButton.onclick=()=>{


song.play();


resumeButton.innerHTML="🎁▶️";


};






//////////////////////////////////////////////////
// AGE PROGRESS 0-41
//////////////////////////////////////////////////


song.addEventListener(
"timeupdate",
()=>{


if(song.duration){


let percent=

(song.currentTime/song.duration)*100;



progressBar.style.width=

percent+"%";



let age=

Math.floor(
(song.currentTime/song.duration)*41
);



ageNumber.innerHTML=

age;


}


});







//////////////////////////////////////////////////
// BALLOONS
//////////////////////////////////////////////////


function createBalloons(){


for(let i=0;i<30;i++){


let b=document.createElement("div");


b.className="balloon";


b.innerHTML="🎈";


b.style.left=

Math.random()*100+"vw";


b.style.animationDuration=

6+
Math.random()*8
+"s";


document
.getElementById("balloons")
.appendChild(b);


}


}





//////////////////////////////////////////////////
// SPARKLES
//////////////////////////////////////////////////


function createSparkles(){


for(let i=0;i<200;i++){


let s=document.createElement("div");


s.className="sparkle";

s.innerHTML="✨";


s.style.left=

Math.random()*100+"vw";


s.style.top=

Math.random()*100+"vh";


document
.getElementById("sparkles")
.appendChild(s);


}


}







//////////////////////////////////////////////////
// FIREWORKS
//////////////////////////////////////////////////


const canvas=

document.getElementById("fireworks");


const ctx=

canvas.getContext("2d");


canvas.width=innerWidth;

canvas.height=innerHeight;



let particles=[];




function startFireworks(){


setInterval(()=>{


let x=

Math.random()*canvas.width;


let y=

Math.random()*300;



for(let i=0;i<80;i++){


particles.push({

x:x,

y:y,

dx:(Math.random()-.5)*8,

dy:(Math.random()-.5)*8,

life:100


});


}



},1200);



animate();


}



function animate(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particles.forEach(p=>{


ctx.fillStyle=

`hsl(${Math.random()*360},100%,50%)`;


ctx.fillRect(
p.x,
p.y,
5,
5
);


p.x+=p.dx;

p.y+=p.dy;

p.life--;


});



particles=

particles.filter(
p=>p.life>0
);



requestAnimationFrame(
animate
);


}








//////////////////////////////////////////////////
// MUSIC VISUALIZER
//////////////////////////////////////////////////


function startVisualizer(){


let audio=

new AudioContext();


let analyser=

audio.createAnalyser();


let source=

audio.createMediaElementSource(song);


source.connect(analyser);


analyser.connect(
audio.destination
);



let data=

new Uint8Array(
analyser.frequencyBinCount
);



let visualizer=

document.getElementById(
"visualizer"
);



for(let i=0;i<40;i++){


let bar=

document.createElement("div");


bar.className="bar";


visualizer.appendChild(bar);


}



function draw(){


analyser.getByteFrequencyData(data);


document
.querySelectorAll(".bar")
.forEach((bar,i)=>{


bar.style.height=

data[i]+"px";


});


requestAnimationFrame(draw);


}


draw();


}
