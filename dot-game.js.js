let p = [200, 200];
let p_ms = 5;
let p_rad = 20;
let ex = [40, 120, 200, 280, 360];
let ey = [40, 40, 40, 40, 40];
let e_dirX = [0, 0, 0, 0, 0];
let e_dirY = [0, 0, 0, 0, 0];
let e_ms = 2;
let e_rad = 15;
let start = false;
let lose = false;
let counter = 0;
let text_counter = -1;
let dif_text = "";
let dif_timer = 1000;
const DIF_INCREMENT_TIME = 10;
const TEXT_TIME = 3;




function setup() {
  createCanvas(400, 400);
  frameRate(60);
  for (i = 0; i < ex.length; i++){
    x = random(TWO_PI);
    e_dirX[i] = cos(x);
    e_dirY[i] = sin(x);

  }

  dif_timer = DIF_INCREMENT_TIME*frameRate();

}

function draw() {
  background(220);
  if(lose){
    textSize(32);
    text("You Lose!", 125, 170);
    textSize(24);
    text("You survived for: " + round(counter * 100)/100 + " seconds", 40,       200);
    text("Press space bar to play again", 45, 230);
    if(keyIsDown(32)){
      start = true;
      lose = false;
      reset();

    }

  }
  else if(!start){
    textSize(28);
    text("Press space bar start", 70, 200);
    if(keyIsDown(32))
      start = true;
  }


  if(start){
    fill(256);
    ellipse(p[0],p[1], 2 * p_rad, 2 * p_rad);
    fill(90);

    if(keyIsDown(87) && (p[1] - p_rad > 0))
      p[1] -= p_ms;

    if(keyIsDown(83) && (p[1] + p_rad < height))
    p[1] += p_ms;

    if(keyIsDown(68) && (p[0] + p_rad < width))
    p[0] += p_ms;

    if(keyIsDown(65) && (p[0] - p_rad > 0))
    p[0] -= p_ms;

    drawEnemies();
    moveEnemies();
    checkCollision();
    checkTimers();
    displayText();

    textSize(11);
    text(round(counter * 100)/100, 20, 20);

    counter += 1.0/frameRate();
    dif_timer -= 1;
    if(text_counter >= 0)
      text_counter += 1;


  }

}

function drawEnemies(){

  for(i = 0; i < ex.length; i++){
    ellipse(ex[i], ey[i], 2 * e_rad, 2 * e_rad);
  }

}

function moveEnemies(){
  for(i = 0; i < ex.length; i++){

    if(e_dirX[i] > 0 && (ex[i] + e_rad  > width))
      e_dirX[i] *= -1;
    else if(e_dirX[i] < 0 && (ex[i] - e_rad  < 0))
      e_dirX[i] *= -1;

    if(e_dirY[i] > 0 && (ey[i] + e_rad  > height))
      e_dirY[i] *= -1;
    else if(e_dirY[i] < 0 && (ey[i] - e_rad  < 0))
      e_dirY[i] *= -1;

    ex[i] += e_ms * e_dirX[i];
    ey[i] += e_ms * e_dirY[i];


  }
}

function checkCollision(){
  for(i= 0; i < ex.length; i++){
    if (dist(p[0], p[1], ex[i], ey[i]) < p_rad + e_rad){
      start = false;
      lose = true;
    }
  }
}

function checkTimers(){
  if (dif_timer <= 0){
    dif_timer = DIF_INCREMENT_TIME*frameRate();
    let x = random();

    if(x < 0.33){
      e_rad += 5;
      dif_text = "Difficulty up! Enemy size increased";
    }
    else if(x < 0.66){
      e_ms += 0.8;
      dif_text = "Difficulty up! Enemy speed increased";
    }
    else{
      p_ms *= 0.85;
      dif_text = "Difficulty up! Player speed decreased";
    }
    text_counter = 0;
  }
}

function displayText(){
  if(text_counter >= 0){
    textSize(16);
    text(dif_text, 20, 40);
  }

  if(text_counter >= TEXT_TIME * frameRate())
    text_counter = -1;

}

function reset(){
  p = [200, 200];
  p_ms = 5;
  p_rad = 20;
  ex = [40, 120, 200, 280, 360];
  ey = [40, 40, 40, 40, 40];
  for (i = 0; i < ex.length; i++){
    x = random(TWO_PI);
    e_dirX[i] = cos(x);
    e_dirY[i] = sin(x);

  }
  e_ms = 2;
  e_rad = 15;
  dif_timer = DIF_INCREMENT_TIME*frameRate();
  counter = 0;
}
