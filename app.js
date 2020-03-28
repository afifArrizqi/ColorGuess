const circles         = document.querySelectorAll(".circle"),
      difficultyButon = document.querySelectorAll(".mod"),
      rgbDisplay      = document.querySelector("#displayColor"),
      message         = document.querySelector("#message"),
      resetButon      = document.querySelector("#reset"),
      header          = document.querySelector("header")
let   circleColor     = [],
      heart           = 2

start();

resetButon.addEventListener("click", function(){
  reset();
});

function start(){
  difficultySelector();
  circleChecker();
  reset();
}

function reset(){
  difficultyButon[0].classList.contains("active") ? heart = 5 : heart = 2;
  message.innerHTML = heartPrint(); 
  circleColor = spreadColors();
  for(let i = 0; i < circles.length; i++){
    circles[i].style.visibility = "visible";
    circles[i].style.backgroundColor = circleColor[i];
  }
  rgbDisplay.innerHTML = circleColor[colorDisplayDistributor()];
  header.style.backgroundColor = "#62cb52"
}
  
  
function circleChecker(){
  for(let circle of circles){
    circle.addEventListener("click",function(){
      if(this.style.backgroundColor === rgbDisplay.innerHTML && heart > 0){
        header.style.backgroundColor = rgbDisplay.innerHTML;
        message.innerHTML = "You've Won!";
        heart = NaN;
      }else if(this.style.backgroundColor !== rgbDisplay.innerHTML && heart > 0){
        this.style.backgroundColor = "#222";
        setTimeout(function(){
          circle.style.visibility = "hidden";
        },600);
        message.querySelectorAll(".fa-heart")[heart-1].style.visibility = "hidden";
        heart--;
      }else if(heart <= 0){
        message.innerHTML = "<i class='fas fa-hand-point-left'></i>Try Again";
      } 
    });
  }
}
  

function difficultySelector(){
  for(let dif of difficultyButon){
    dif.addEventListener("click", function(){
      difficultyButon[0].classList.remove("active");
      difficultyButon[1].classList.remove("active");
      this.classList.add("active");
      this.textContent === "Easy" ? heart = 5 : heart = 2;
      message.innerHTML = heartPrint();
      reset();
    });
  }
}

function heartPrint(){
  let str = "";
  for(let i = 0; i < heart; i++){
    str+= "<i class=\"fas fa-heart\"></i>"
  }
  return str;
}

function colorDisplayDistributor(){
  return Math.floor(Math.random() * circles.length);
}

function spreadColors(){
  const arr = [];
  for(let i = 0; i < circles.length; i++){
    arr[i] = randomColor();
  }
  return arr;
}

function randomColor(){
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`
}