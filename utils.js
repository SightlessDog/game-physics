const G = [
  [0.025 * 28.9, 0], // 0
  [0.025 * 28.9, -0.015 * 28.9], // 1
  [-0.225 * 28.9, -0.015 * 28.9], // 2
  [-0.225 * 28.9, 0.028 * 28.9], // 3
  [-0.191 * 28.9, 0], //4
  // The hole
  [-0.17 * 28.9, 0], // 5
  [-0.17 * 28.9, -0.007 * 28.9], // 6
  [-0.163 * 28.9, -0.007 * 28.9], // 7
  [-0.163 * 28.9, 0], // 8
  // Water hole
  [-0.133 * 28.9, 0], // 9
  [-0.131 * 28.9, -0.01 * 28.9], // 10
  [-0.115 * 28.9, -0.01 * 28.9], // 11
  [-0.112 * 28.9, 0], // 12
  // Mountain
  [-0.097 * 28.9, 0], // 13
  [-0.066 * 28.9, 0.01 * 28.9], // 14
  [-0.035 * 28.9, 0], // 15
];

const P = [
  [-0.035 * 28.9, 0],
  [-0.066 * 28.9, 0.01 * 28.9],
  [-0.097 * 28.9, 0],
];

function playGround() {
  fill(100, 50, 0); // Playground
  beginShape();
  for (var i = 0; i < G.length; i++) vertex(G[i][0] * M, G[i][1] * M);
  endShape();

  push(); // Rasen
  strokeWeight(5);
  noFill();
  push();
  stroke(0, 200, 0);
  beginShape();
  for (var i = 12; i < 16; i++) vertex(G[i][0] * M, G[i][1] * M);
  endShape();
  line(G[8][0] * M, G[8][1] * M, G[9][0] * M, G[9][1] * M);
  line(G[15][0] * M, G[15][1] * M, G[0][0] * M, G[0][1] * M);
  pop();
  push(); // Sandberg
  stroke(200, 200, 0);
  beginShape();
  for (var i = 3; i < 6; i++) vertex(G[i][0] * M, G[i][1] * M);
  endShape();
  pop();
  pop();
}

function calculateAngle() {
  return Math.atan2(0.01, -0.066 - -0.097);
}
