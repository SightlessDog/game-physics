class Draggable {
  constructor(x, y, x2, y2, endDiameter) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.endDiameter = endDiameter;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragged = false;
    this.m = 1; // 1kg
    this.federKons = 40; //40N/m
    this.daempfung = 4; // s-1
    this.stickV = 0;
    this.stickS = x;
    this.hitTheBall = false;
    this.initialized = false;
  }

  over() {
    // Is mouse over object
    if (
      mouseX > canvasWidth * 0.84 &&
      mouseX < canvasWidth * 0.85 &&
      mouseY > 692 &&
      mouseY < 714
    ) {
      console.log("over");
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.stickS = mouseX + this.offsetX;
    }
  }

  show() {
    if (this.stickS < 0 && this.dragged && !this.initialized) {
      this.hitTheBall = true;
      newTrial = false; // Pushbutton
      START = true;
      INIT = true;
      status = "start";
      this.initialized = true;
    }
    if (this.dragged) {
      if (this.stickS > 0 && !this.hitTheBall) {
        this.stickV =
          this.stickV -
          (9.81 + this.federKons * this.federKons * (this.stickS - this.x)) *
            (timeScale / frmRate);
      } else {
        this.stickV =
          this.stickV -
          (9.81 +
            2 * this.stickV * this.daempfung +
            this.federKons * this.federKons * (this.stickS - this.x)) *
            (timeScale / frmRate);
      }
    }
    this.stickS = this.stickS + this.stickV * (timeScale / frmRate);
    strokeWeight(3);
    line(this.stickS, 0, this.stickS, this.y2);
    ellipse(this.stickS, 0, this.endDiameter);
  }

  pressed() {
    // Did I click on the rectangle?
    console.log(this.dragged);
    if (
      mouseX > canvasWidth * 0.84 &&
      mouseX < canvasWidth * 0.85 &&
      mouseY > 692 &&
      mouseY < 714 &&
      !this.dragged
    ) {
      console.log("dragging");
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.stickS - mouseX;
    }
  }

  released() {
    if (this.dragging) {
      // Quit dragging
      this.dragged = true;
      this.dragging = false;
    }
  }
}
