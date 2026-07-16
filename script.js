const song =
document.getElementById("song");


const play =
document.getElementById("play");


const pause =
document.getElementById("pause");


const resume =
document.getElementById("resume");


const progress =
document.getElementById("progress");


const age =
document.getElementById("age");



let visualStarted=false;



play.onclick=()=>{


song.currentTime=0;


song.play();



document
.querySelectorAll(".flame")
.forEach(
f=>f.classList.add("lit")
);



createBalloons();

createSparkles();

startFireworks();



if(!visualStarted){

startVisualizer();

visualStarted=true;

}


};




pause.onclick=()=>{

song.pause();

};



resume.onclick=()=>{

song.play();

};







// AGE PROGRESS


song.addEventListener(
"timeupdate",
()=>{


if(song.duration){


let percent=

(song.currentTime/song.duration)*100;



progress.style.width=

percent+"%";



age.innerHTML=

Math.floor(
percent/100*41
);



}

});







// BALLOONS


function createBalloons(){


for(let i=0;i<20;i++){


let b=document.createElement("div");


b.className="balloon";


b.innerHTML="🎈";


b.style.left=

Math.random()*100+"vw";


b.style.animationDuration=

6+
Math.random()*8+
"s";


document
.getElementById("balloons")
.appendChild(b);


}


}







// SPARKLES


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







// FIREWORKS


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
Math.random()*300;



for(let i=0;i<40;i++){


particles.push({

x:x,

y:y,

dx:(Math.random()-.5)*6,

dy:(Math.random()-.5)*6,

life:80

});


}


},1500);



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
"hsl("+Math.random()*360+",100%,50%)";


ctx.fillRect(
p.x,
p.y,
3,
3
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







// VISUALIZER


function startVisualizer(){


let audio =
new AudioContext();


let analyser =
audio.createAnalyser();


let source =
audio.createMediaElementSource(song);



source.connect(analyser);


analyser.connect(
audio.destination
);



let data =
new Uint8Array(
analyser.frequencyBinCount
);



let box =
document.getElementById("visualizer");



for(let i=0;i<30;i++){


let bar =
document.createElement("div");


bar.className="bar";


box.appendChild(bar);


}



function draw(){


analyser.getByteFrequencyData(data);



document
.querySelectorAll(".bar")
.forEach((bar,i)=>{


bar.style.height =
data[i]+"px";


});



requestAnimationFrame(draw);


}


draw();


}
