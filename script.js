const button=document.getElementById("playButton");
const song=document.getElementById("birthdaySong");

button.onclick=()=>{

song.play();

button.innerHTML="🎵 Playing...";

button.disabled=true;

// light candles
document.querySelectorAll(".flame").forEach(f=>{
f.classList.add("lit");
});

launchConfetti();

};

////////////////////////////////////////////////
// Balloons
////////////////////////////////////////////////

const balloonArea=document.getElementById("balloons");

const emojis=["🎈","🎈","🎈","🎉","🎁"];

setInterval(()=>{

const b=document.createElement("div");

b.className="balloon";

b.innerHTML=emojis[Math.floor(Math.random()*emojis.length)];

b.style.left=Math.random()*100+"vw";

b.style.animationDuration=6+Math.random()*6+"s";

balloonArea.appendChild(b);

setTimeout(()=>b.remove(),12000);

},600);

////////////////////////////////////////////////
// Confetti
////////////////////////////////////////////////

const canvas=document.getElementById("confetti");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let pieces=[];

function launchConfetti(){

pieces=[];

for(let i=0;i<250;i++){

pieces.push({

x:canvas.width/2,

y:canvas.height/2,

dx:(Math.random()-.5)*12,

dy:(Math.random()-.5)*12,

size:4+Math.random()*6,

color:`hsl(${Math.random()*360},100%,50%)`

});

}

animate();

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

pieces.forEach(p=>{

ctx.fillStyle=p.color;

ctx.fillRect(p.x,p.y,p.size,p.size);

p.x+=p.dx;

p.y+=p.dy;

p.dy+=0.15;

});

pieces=pieces.filter(p=>p.y<canvas.height+20);

if(pieces.length){

requestAnimationFrame(animate);

}

}

window.onresize=()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

};
