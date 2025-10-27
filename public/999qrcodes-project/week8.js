
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

function updateMask() {
  const blockRect = block.getBoundingClientRect();
  const holeRect = hole.getBoundingClientRect();

  const x = holeRect.left - blockRect.left;
  const y = holeRect.top - blockRect.top;
  const w = holeRect.width;
  const h = holeRect.height;

  block.style.setProperty('--mask',
    `linear-gradient(black ${y}px, black ${y}px, transparent ${y}px, transparent ${y + h}px, black ${y + h}px),
     linear-gradient(to right, black ${x}px, black ${x}px, transparent ${x}px, transparent ${x + w}px, black ${x + w}px)`
  );
  requestAnimationFrame(updateMask);
}
updateMask();

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random()*200)+150);
    hole.style.top = random + "px";
    counter++;
});
setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+1.5)+"px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(321-characterTop);
    if((characterTop>321)||((blockLeft<10)&&(blockLeft>-60)&&((cTop<holeTop-10)||(cTop>holeTop+140)))){
        alert("Game over! Score: "+counter);
        character.style.top = 100 + "px";
        counter=0;
    }
},10);

document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    jump();
  }
});

function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-3)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}