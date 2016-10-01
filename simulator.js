var simulator = simulator || {};
var renderer = renderer || {};
var model = model || {};

renderer.init = function() {
  renderer.canvas = document.getElementById("canvas");
  renderer.ctx = renderer.canvas.getContext("2d");
};

renderer.getPosition = function(v) {
  return new Vector(10 + v.x, -10 + renderer.canvas.height - v.y, v.z);
};

renderer.draw = function(model) {
  with(renderer) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    var pos = renderer.getPosition(new Vector(0, 0));
    ctx.moveTo(pos.x, pos.y);
    pos = renderer.getPosition(new Vector(5002, 0));
    ctx.lineTo(renderer.canvas.width, pos.y);
    ctx.stroke();
    ctx.closePath();

    model.particles.forEach(function(item, index, arr) {
      ctx.beginPath();
      var pos = renderer.getPosition(item.position);
      ctx.arc(pos.x, pos.y - 4, 4, 0, Math.PI * 2, false);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.closePath();
    });
  }
};

model.init = function() {
  model.constants = {
    g: new Vector(0, -10, 0)
  };

  r0 = new Vector(0, 100, 0);

  model.particles = [new Particle(r0, new Vector(3, 0, 0), model.constants.g)]
};

model.update = function(delta_t) {
  model.particles.forEach(function(item, index, arr) {
    item.update(delta_t);
    console.log(item.position.y, item.velocity.y);
  });
  model.particles.forEach(function(item, index, arr) {
    item.collide();
  });
}

simulator.init = function() {
  simulator.renderer = renderer;
  simulator.renderer.init();
  simulator.model = model;
  simulator.model.init();
};

simulator.draw = function() {
  simulator.renderer.draw(simulator.model)
};

simulator.update = function(delta_t) {
  simulator.model.update(delta_t)
};

var step = function() {
  for (i = 0; i < 20; ++i) simulator.update(0.001);
  simulator.draw();
}

var sim_id;

function start() {
  sim_id = setInterval(step, 1);
}

function stop() {
  clearInterval(sim_id);
}
