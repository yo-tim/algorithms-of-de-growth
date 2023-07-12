const p5 = require("p5");

let x1 = 0;
let x2 = 0;

let sketches = [];

let branch_length = 150;
let decrease_pct = 0.7;
let angle;

const sketch1 = (p) => {
  p.setup = () => {
    p.colorMode(p.HSB);
    p.createCanvas(
      document.getElementById("sketch1Container").offsetWidth,
      document.getElementById("sketch1Container").offsetHeight
    );

    p.frameRate(10);
  };

  p.draw = () => {
    p.background(0);
    p.translate(p.width / 2, p.height);
    angle = p.random(0.3, 0.7); // Randomize the angle within a range
    branch(branch_length, 255, 255, 4, 0); // Adjusted stroke weight and initial depth of 0
  };

  function branch(len, hue, saturation, strokeWeightVal, depth) {
    if (depth > 10) {
      return; // Return if the depth exceeds a certain limit
    }

    p.strokeWeight(strokeWeightVal);
    p.stroke(hue, saturation, 255);
    p.line(0, 0, 0, -len);
    p.translate(0, -len + 20);
    if (len > 15.0) {
      p.push();
      p.rotate(angle + p.random(-0.1, 0.1)); // Add random angle variation
      branch(
        len * decrease_pct + p.random(-20, 20),
        hue + p.random(-10, 10),
        saturation - 10,
        strokeWeightVal * 0.8,
        depth + 1
      ); // Add randomness to branch length and color
      p.pop();

      p.push();
      p.rotate(-angle + p.random(-0.1, 0.1)); // Add random angle variation
      branch(
        len * decrease_pct + p.random(-20, 20),
        hue + p.random(-10, 10),
        saturation - 10,
        strokeWeightVal * 0.8,
        depth + 1
      ); // Add randomness to branch length and color
      p.pop();
    }
  }
};

const sketch2 = (p) => {
  p.setup = () => {
    p.createCanvas(600, 600);
    p.noLoop();
  };

  p.draw = () => {
    p.background(120);

    // Update the x position of the circle
    x2 += 2; // Adjust the value to control the speed of movement

    // Wrap the circle to the left side of the canvas when it reaches the right side
    if (x2 > p.width) {
      x2 = 0;
    }

    p.ellipse(x2, p.height / 2, 50, 50);
  };
};

let sketch1El;
let sketch2El;

const disableOthers = (currentSketch) => {
  sketches.forEach((sketch) => {
    if (sketch !== currentSketch && sketch.isLooping()) {
      sketch.noLoop();
    }
  });
};

function setup() {
  const playButton1 = document.getElementById("playButton1");
  const pauseButton1 = document.getElementById("pauseButton1");
  const playButton2 = document.getElementById("playButton2");
  const pauseButton2 = document.getElementById("pauseButton2");

  playButton1.addEventListener("click", () => {
    sketch1El.loop();
    disableOthers(sketch1El);
  });

  pauseButton1.addEventListener("click", () => {
    sketch1El.noLoop();
  });

  playButton2.addEventListener("click", () => {
    sketch2El.loop();
    disableOthers(sketch2El);
  });

  pauseButton2.addEventListener("click", () => {
    sketch2El.noLoop();
  });

  sketch1El = new p5(sketch1, "sketch1Container");
  sketch2El = new p5(sketch2, "sketch2Container");

  sketches.push(sketch1El);
  sketches.push(sketch2El);

  console.log(sketch2El.isLooping());
}

setup();
