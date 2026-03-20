let butterflies = [];
let numButterflies = 25;

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < numButterflies; i++) {
    butterflies.push(new Butterfly(random(width), random(height)));
  }
}

function draw() {
  background(135, 206, 235); // sky blue

  for (let b of butterflies) {
    b.move();
    b.display();
  }
}

function mousePressed() {
  for (let b of butterflies) {
    b.scatter(mouseX, mouseY);
  }
}

class Butterfly {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.5, 2));
    this.size = random(20, 40);
    this.wingOffset = random(1000); // used for flapping animation
    this.color = color(random(150,255), random(100,200), random(150,255));
  }

  move() {
    // gentle floating movement
    let flutter = p5.Vector.random2D().mult(0.2);
    this.velocity.add(flutter);

    this.velocity.limit(2);
    this.position.add(this.velocity);

    // Edge collision logic (bounce off screen)
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  scatter(mx, my) {
    let mouse = createVector(mx, my);
    let direction = p5.Vector.sub(this.position, mouse);
    let distance = direction.mag();

    if (distance < 150) {
      direction.normalize();
      direction.mult(5); // strong push away
      this.velocity.add(direction);
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y);

    // Wing flapping animation
    let flap = sin(frameCount * 0.2 + this.wingOffset) * 10;

    noStroke();
    fill(this.color);

    // Left wing
    ellipse(-this.size/2, 0, this.size + flap, this.size);

    // Right wing
    ellipse(this.size/2, 0, this.size + flap, this.size);

    // Body
    fill(50);
    ellipse(0, 0, this.size/4, this.size);

    pop();
  }
}