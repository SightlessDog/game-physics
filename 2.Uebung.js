/* template GTAT2 Game Technology & Interactive Systems */
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
let newButton;
let resetButton;
// Massstab
let M;
// set up the frame rate
let fr = 50;
// Our time axis
let t;
let dt;
let moveBall = false;

function setup() {
  /* here are program-essentials to put */
  createCanvas(windowWidth, windowHeight);
  M = (0.7 * canvasWidth) / baseline;
  // Declare the frame rate of our scene
  frameRate(fr);
  dt = 1 / fr;
  t = 0;
}

const baseline = 5;
const corners = [
  [0.025 * 28.9, 0, "#99CCFF"],
  [0.025 * 28.9, -0.015 * 28.9, "#99CCFF"],
  [-0.225 * 28.9, -0.015 * 28.9, "yellow"],
  [-0.225 * 28.9, 0.028 * 28.9, "yellow"],
  [-0.191 * 28.9, 0, "yellow"],
  // The hole
  [-0.17 * 28.9, 0, "#99CCFF"],
  [-0.17 * 28.9, -0.007 * 28.9, "#99CCFF"],
  [-0.163 * 28.9, -0.007 * 28.9, "#99CCFF"],
  [-0.163 * 28.9, 0, "green"],
  // Water hole
  [-0.133 * 28.9, 0, "#99CCFF"],
  [-0.131 * 28.9, -0.01 * 28.9, "#99CCFF"],
  [-0.115 * 28.9, -0.01 * 28.9, "#99CCFF"],
  [-0.112 * 28.9, 0, "#99CCFF"],
  [-0.097 * 28.9, 0, "green"],
  [-0.066 * 28.9, 0.01 * 28.9, "green"],
  [-0.035 * 28.9, 0, "yellow"],
];
const stickPosition = { x: -0.175 * 28.9, y: 0, length: 0.042 * 28.9 };
const ball = { x: 0, y: 0.0025 * 28.9, radius: 0.0025 * 28.9 };
const buttonWidth = canvasWidth * 0.1;
const buttonHeight = canvasHeight * 0.08;

function draw() {
  /* here is the dynamic part to put */
  /* administrative work */
  push();
  translate(canvasWidth * 0.9, canvasHeight * 0.7);
  scale(1, -1);
  /* calculations */
  t = t + dt;
  endPosition = -0.035;
  if (ball.x >= -0.033 * 28.9 && moveBall) {
    ball.x = ball.x - 0.036 * t;
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
  fill("orange");
  beginShape();
  for (let i = 0; i < corners.length; i++) {
    strokeWeight(4);
    stroke(corners[i][2]);
    vertex(corners[i][0] * M, corners[i][1] * M);
  }
  endShape(CLOSE);
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
  fill("red");
  ellipse(ball.x * M, (ball.y / 2) * M, ball.radius * M);
  pop();

  // The golf stick
  push();
  translate(0, 0.02 * 28.9 * M);
  scale(1, -1);
  rotate(-45);
  line(0, 0, 0, 0.02 * 28.9 * M);
  pop();
  pop();

  // // The two Buttons
  // push();
  // fill("blue");
  // rect(canvasWidth * 0.8, canvasHeight * 0.9, 200, 70);
  // push();
  // translate(canvasWidth * 0.8 + 100, canvasHeight * 0.9 + 35);
  // rectMode(CENTER);
  // fill("white");
  // textSize(50);
  // text("NEW", -50, 20);
  // pop();
  // pop();

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

function mousePressed() {
  // if the mouse is on "reset button"
  if (
    mouseX > canvasWidth * 0.1 &&
    mouseX < canvasWidth * 0.1 + 200 &&
    mouseY > canvasHeight * 0.9 &&
    mouseY < canvasHeight * 0.9 + 70
  ) {
    ball.x = 0;
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
  }
}

function windowResized() {
  /* responsive part */
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  resizeCanvas(windowWidth, windowHeight);
}
