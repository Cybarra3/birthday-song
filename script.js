const song =
document.getElementById("song");


const button =
document.getElementById("play");



button.onclick=()=>{


song.play();


document
.querySelectorAll(".flame")
.forEach(f=>
f.classList.add("lit")
);


createBalloons();

createSparkles();

startFireworks();

startVisualizer();


button.innerHTML=
"🎵 Birthday Party Started!";


};



//////////////////////////////////////////////////////
// BALLOONS
//////////////////////////////////////////////////////


function createBalloons(){


for(let i=0;i<25;i++){


let b=document.createElement("div");


b.className="balloon";


b.innerHTML=
["🎈","🎈","🎈","🎁"][Math.floor(Math.random()*4)];


b.style.left=
Math.random()*100+"vw";


b.style.animationDuration=
(6+Math.random()*8)+"s";


b.style.animationDelay=
Math.random()*5+"s";


document
.getElementById("balloons")
.appendChild(b);



}



}




//////////////////////////////////////////////////////
// SPARKLES
//////////////////////////////////////////////////////


function createSparkles(){


for(let i=0;i<200;i++){


let s=document.createElement("div");


s.className="sparkle";

s.innerHTML="✨";


s.style.left=
Math.random()*100+"vw";


s.style.top=
Math.random()*100+"vh";


s.style.animationDelay=
Math.random()*3+"s";


document
.getElementById("sparkles")
.appendChild(s);


}


}




//////////////////////////////////////////////////////
// FIREWORKS CANVAS
//////////////////////////////////////////////////////


const canvas=
document.getElementById("fireworks");


const ctx=
canvas.getContext("2d");


canvas.width=
innerWidth;

canvas.height=
innerHeight;



let particles=[];



function startFireworks(){


setInterval(()=>{


let x=
Math.random()*canvas.width;


let y=
Math.random()*canvas.height/2;



for(let i=0;i<80;i++){


particles.push({

x:x,

y:y,

dx:
(Math.random()-.5)*8,

dy:
(Math.random()-.5)*8,

life:100

});


}



},1200);


animateFireworks();


}



function animateFireworks(){


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
4,
4
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
animateFireworks
);


}



//////////////////////////////////////////////////////
// MUSIC VISUALIZER
//////////////////////////////////////////////////////


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



function animate(){


analyser.getByteFrequencyData(data);


document
.querySelectorAll(".bar")
.forEach((bar,i)=>{


bar.style.height=
data[i]*.5+"px";


});


requestAnimationFrame(
animate
);


}


animate();


}
