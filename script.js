const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

let trails = [],
  mouse = {
    x: 0,
    y: 0,
  };

class Trail {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.n = 0;
    this.node = (() => {
      let n = document.createElement("div");
      n.className = "cursor-trail";
      document.body.appendChild(n);
      return n;
    })();
  }
  draw() {
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
  }
}

// Create 12 trail objects and add them to the trails array
for (let i = 0; i < 2; i++) {
  let d = new Trail();
  trails.push(d);
}

document.querySelectorAll(".cursor-trail")[0].className = "cursor-trail first";

function draw() {
  let x = mouse.x;
  let y = mouse.y;

  trails.forEach(function (trail, index) {
    if (index === 0) {
      // The first trail follows the mouse directly
      trail.x += (x - trail.x) * 0.2;
      trail.y += (y - trail.y) * 0.2;
    } else {
      // Each subsequent trail follows the previous one
      trail.x += (trails[index - 1].x - trail.x) * 0.2;
      trail.y += (trails[index - 1].y - trail.y) * 0.2;
    }
    trail.draw();
  });
}
function mousemove(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}
document.addEventListener("mousemove", mousemove);

function animate() {
  draw();
  requestAnimationFrame(animate);
}

animate();
