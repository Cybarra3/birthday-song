const song =
document.getElementById("song");


const play =
document.getElementById("play");


const pause =
document.getElementById("pause");


const resume =
document.getElementById("resume");


const age =
document.getElementById("age");


const progress =
document.getElementById("progress");



let visualStarted=false;

let fireworksStarted=false;



play.onclick=()=>{


song.play();


document
.querySelectorAll(".flame")
.forEach(f=>
f.classList.add("lit")
);



createBalloons();

createSparkles();



if(!fireworksStarted){

fireworksStarted=true;

startFireworks();

}



if(!visualStarted){

visualStarted=true;

startVisualizer();

}


};



pause.onclick=()=>song.pause();


resume.onclick=()=>song.play();






song.addEventListener(
"timeupdate",
()=>{


let percent=
(song.currentTime/song.duration)*100;


progress.style.width=
percent+"%";


age.innerHTML=
Math.floor(
percent/100*41
);


});






song.addEventListener(
"ended",
()=>{


age.innerHTML="41";


progress.style.width="100%";



document
.querySelectorAll(".flame")
.forEach(f=>
f.classList.remove("lit")
);



document
.getElementById("finale")
.classList.add("show");



megaFireworks();

createConfetti();



});







function createBalloons(){


for(let i=0;i<20;i++){


let b=document.createElement("div");


b.className="balloon";


b.innerHTML="🎈";


b.style.left=
Math.random()*100+"vw";


b.style.animationDuration=
(6+Math.random()*6)+"s";


document
.getElementById("balloons")
.appendChild(b);


}


}





function createSparkles(){


for(let i=0;i<60;i++){


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






const canvas=
document.getElementById("fireworks");


const ctx=
canvas.getContext("2d");



canvas.width=innerWidth;

canvas.height=innerHeight;



let particles=[];




function startFireworks(){


setInterval(()=>{


burst();


},1500);


animate();


}



function burst(){


let x=
Math.random()*canvas.width;


let y=
Math.random()*300;



for(let i=0;i<50;i++){


particles.push({

x:x,

y:y,

dx:(Math.random()-.5)*8,

dy:(Math.random()-.5)*8,

life:100

});


}

}




function megaFireworks(){


for(let i=0;i<8;i++){


setTimeout(
burst,
i*400
);


}

}




function animate(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particles.forEach(p=>{


ctx.fillStyle="yellow";


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
animate
);


}







function createConfetti(){


for(let i=0;i<200;i++){


let c=document.createElement("div");


c.className="confetti";


c.style.left=
Math.random()*100+"vw";


c.style.background=
"hsl("+Math.random()*360+",100%,50%)";


c.style.animationDuration=
(3+Math.random()*4)+"s";


document
.getElementById("confetti")
.appendChild(c);


}


}





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



let box=
document.getElementById("visualizer");



for(let i=0;i<30;i++){


let bar=document.createElement("div");

bar.className="bar";

box.appendChild(bar);


}



function draw(){


analyser.getByteFrequencyData(data);



document
.querySelectorAll(".bar")
.forEach((b,i)=>{


b.style.height=
data[i]+"px";


});


requestAnimationFrame(draw);


}


draw();


}
