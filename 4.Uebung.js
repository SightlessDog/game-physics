/* template GTAT2 Game Technology & Interactive Systems */
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
let newButton;
let resetButton;
// Massstab
let M;
// set up the frame rate
let fr = 60;
// Our time axis
let t, dt;
// Koordinatenursprung
let x0, y0;
// Grundlänge in [m]
const baseline = 5;
// Reset-Button, Variable, Start der Bewegungsberechnung
let Reset, reset, START, INIT;

let moveBall = false;
let vxBall, vyBall; // Ballgeschwindigkeit
let vx0Ball = -5; // -2m/s --> Startgeschwindigkeit 200 km/h = 200/2 m/s
let vy0Ball = 2;
let sBall = 0;
let vBall = 0;

const stickPosition = { x: -0.175 * 28.9, y: 0, length: 0.042 * 28.9 };
const ball = { x: 0, y: 0, radius: 0.0025 * 28.9 };
y0Ball = 0;
x0Ball = 0;
let xBall, yBall;

const buttonWidth = canvasWidth * 0.1;
const buttonHeight = canvasHeight * 0.08;
let angle;
let stat = "";
// Erdbeschleunigung
let g = 9.81;
let g_;

function setup() {
  /* here are program-essentials to put */
  createCanvas(windowWidth, windowHeight);
  M = (0.7 * canvasWidth) / baseline;
  // Declare the frame rate of our scene
  frameRate(fr);

  t = 0;
  angle = calculateAngle();

  START = true;
  INIT = false;
}

function draw() {
  /* here is the dynamic part to put */
  /* administrative work */
  if (!moveBall) {
    START = true;
    INIT = false;
    ball.x = 0;
    ball.y = 0;
    sBall = 0;
    stat = "plane 1"; // Startlage Golfball wieder herstellen
  }
  push();
  translate(canvasWidth * 0.9, canvasHeight * 0.7);
  scale(1, -1);
  /* calculations */
  if (START) {
    if (INIT) {
      INIT = false;
      START = false;
      t = 0;
      dt = 1 / fr;
      ball.x = 0;
      ball.y = 0;
      sBall = 0;
      vBall = vx0Ball;
      vyBall = vy0Ball;
      stat = "plane 1";
    }
  } else {
    t = t + dt;
    g_ = g * Math.sin(angle);
    if (sBall >= P[0][0]) {
      stat = "plane 1";
      vBall = vBall + g_ * dt;
      sBall = sBall + vBall * dt;
      if (sBall > 0) {
        dt = 0;
      }
    }
    if (sBall <= P[0][0] && sBall >= P[1][0]) {
      stat = "slope 1";
      vBall = vBall + g_ * dt;
      sBall = sBall + vBall * dt;
      xBall = x0Ball + sBall * Math.cos(angle) - ball.radius * Math.sin(angle);
      yBall = sBall * Math.sin(angle) - ball.radius * Math.cos(angle);
    }
    if (sBall <= P[1][0]) {
      stat = "fly";
      vyBall = vyBall + g * dt;
    }
  }
  /* display */
  background(200);
  // Water
  push();
  fill("#99CCFF");
  beginShape();
  vertex(-0.1325 * 28.9 * M, -0.002 * 28.9 * M);
  vertex(-0.131 * 28.9 * M, -0.01 * 28.9 * M);
  vertex(-0.114 * 28.9 * M, -0.01 * 28.9 * M);
  vertex(-0.1125 * 28.9 * M, -0.002 * 28.9 * M);
  endShape();
  pop();

  // The baseground
  push();
  playGround();
  pop();

  // The stick
  push();
  strokeWeight(4);
  stroke("black");
  line(
    stickPosition.x * M,
    stickPosition.y * M,
    stickPosition.x * M,
    stickPosition.length * M
  );
  pop();

  // The ball
  push();
  translate(0, ball.y + 0.5 * ball.radius * M);
  if (stat === "slope 1") {
    rotate(-angle);
    translate(0, -(0.3 * M));
    console.log(
      "position first slope is ",
      sBall * M,
      -(ball.y + 0.5 * ball.radius * M)
    );
  } else if (stat === "fly") {
    translate(0, -(0.3 * M));
    xBall = xBall + vx0Ball * dt;
    sBall = xBall;
    yBall = yBall + vyBall * dt;
    ball.y = yBall;
  }
  fill("red");
  ellipse(sBall * M, -ball.y * M, ball.radius * M);
  pop();

  // The golf stick
  push();
  translate(0, 0.02 * 28.9 * M);
  scale(1, -1);
  rotate(-45);
  line(0, 0, 0, 0.02 * 28.9 * M);
  pop();

  push(); // markiert den Nullpunkt des Koordinatensystems
  stroke(0);
  strokeWeight(2);
  line(10, 0, -10, 0);
  line(0, 10, 0, -10);
  pop();
  pop();

  createButtons();
}

function mousePressed() {
  // if the mouse is on "reset button"
  if (
    mouseX > canvasWidth * 0.1 &&
    mouseX < canvasWidth * 0.1 + 200 &&
    mouseY > canvasHeight * 0.9 &&
    mouseY < canvasHeight * 0.9 + 70
  ) {
    ball.x = 0;
    ball.y = 0.0025 * 28.9;
    t = 0;
    moveBall = false;
  }

  if (
    mouseX > canvasWidth * 0.8 &&
    mouseX < canvasWidth * 0.8 + 200 &&
    mouseY > canvasHeight * 0.9 &&
    mouseY < canvasHeight * 0.9 + 70
  ) {
    moveBall = true;
    INIT = true;
    stat = "";
  }
}

function windowResized() {
  /* responsive part */
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  resizeCanvas(windowWidth, windowHeight);
}

function createButtons() {
  push();
  fill("blue");
  rect(canvasWidth * 0.8, canvasHeight * 0.9, buttonWidth, buttonHeight);
  push();
  translate(
    canvasWidth * 0.8 + buttonWidth / 5,
    canvasHeight * 0.9 + buttonHeight / 1.5
  );
  rectMode(CENTER);
  fill("white");
  textSize(buttonWidth / 4);
  text("NEW", 0, 0);
  pop();
  pop();

  push();
  fill("red");
  rect(canvasWidth * 0.1, canvasHeight * 0.9, buttonWidth, buttonHeight);
  push();
  translate(
    buttonWidth + buttonWidth / 10,
    canvasHeight * 0.9 + buttonHeight / 1.5
  );
  rectMode(CENTER);
  fill("white");
  textSize(buttonWidth / 4);
  text("RESET", 0, 0);
  pop();
  pop();
}
