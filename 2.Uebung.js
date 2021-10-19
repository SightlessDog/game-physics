/* template GTAT2 Game Technology & Interactive Systems */
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
let newButton;
let resetButton;

function setup() {
  /* here are program-essentials to put */
  createCanvas(windowWidth, windowHeight);
  newButton = createButton("NEW");
  newButton.style("background-color", "#6BE3F8");
  newButton.style("width", "200px");
  newButton.style("height", "70px");
  newButton.style("border", "none");
  newButton.style("cursor", "pointer");
  newButton.style("letter-spacing", "1px");
  newButton.style("font-weight", "bold");
  resetButton = createButton("RESET");
  resetButton.style("background-color", "#ED654A");
  resetButton.style("height", "70px");
  resetButton.style("border", "none");
  resetButton.style("cursor", "pointer");
  resetButton.style("letter-spacing", "1px");
  resetButton.style("font-weight", "bold");
  resetButton.style("width", "200px");
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

function draw() {
  /* here is the dynamic part to put */
  newButton.position(canvasWidth * 0.8, canvasHeight * 0.9);
  resetButton.position(canvasWidth * 0.1, canvasHeight * 0.9);

  /* administrative work */
  push();
  translate(canvasWidth * 0.9, canvasHeight * 0.7);
  scale(1, -1);
  /* calculations */
  let M = (0.7 * canvasWidth) / baseline;
  /* display */
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
}

function windowResized() {
  /* responsive part */
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  resizeCanvas(windowWidth, windowHeight);
}
