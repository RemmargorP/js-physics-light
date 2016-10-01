function Model() {
  this.constants = {
    g: new Vector(0, -10, 0)
  };

  this.particles = [];
  this.update = function(delta_t, timeElapsed) {
    this.particles.forEach(function(item, index, arr) {
      item.update(delta_t);
    });
    this.particles.forEach(function(item, index, arr) {
      item.collide(timeElapsed);
    });
  }
};

function Simulator() {
  this.graphics = new Graphics(document.getElementById("simulation"));
  this.graphics.setProps(new Vector(10, 10, 0), new Vector(2, 2, 0));
  this.model = new Model();

  this.UPS = 1e4;
  this.deltaT = 1e-4;
  this.FPS = 90;
  this.running = false;

  this.lastUpdate = Date.now();
  this.lastRender = Date.now();
  this.timeElapsed = 0;

  this.draw = function() {
    var graphics = this.graphics;
    graphics.clearCanvas();

    var ctx = graphics.getContext();
    ctx.beginPath();
    var pos = graphics.getPosition(new Vector(-5000, 0));
    ctx.moveTo(pos.x, pos.y);
    pos = graphics.getPosition(new Vector(5000, 0));
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.closePath();

    this.model.particles.forEach(function(item, index, arr) {
      var pos = graphics.getPosition(item.position);
      ctx.beginPath();
      var sizes = graphics.scaled(new Vector(2, 2, 0));
      ctx.arc(pos.x - sizes.x / 2, pos.y - sizes.y / 2, sizes.y, 0, Math.PI * 2, false);
      ctx.fillStyle = item.appearance.color;
      ctx.fill();
      ctx.closePath();
    });
  }

  this.update = function() {
    this.timeElapsed += this.deltaT;
    this.model.update(this.deltaT, this.timeElapsed);
  }

  this.printData = function() {
    // particles
    var tmp = document.getElementsByClassName("data")[0];
    if (tmp.getElementsByClassName("particles").length == 0) {
      var elem = document.createElement('div');
      elem.innerHTML = '<div>Particles:</div><div class="particles info"><div></div></div>';
      elem.className = 'model particles';
      tmp.appendChild(elem);
    }

    this.model.particles.forEach(function(item, index, arr) {
      var list = document.getElementsByClassName("particles info")[0].childNodes[0];
      while (index >= list.childNodes.length) {
        list.appendChild(document.createElement('div'));
      }
      var elem = list.childNodes[index];
      elem.innerHTML = '<div class="box" style="background-color: ' + item.appearance.color + ';"></div>' +
                        '<div> position: (' + item.position.x.toFixed(3) + '; ' + item.position.y.toFixed(3) + ')<br>'+
                        'velocity: (' + item.velocity.x.toFixed(3) + '; ' + item.velocity.y.toFixed(3) + ')<br>' +
                        'acceleration: (' + item.acceleration.x.toFixed(3) + '; ' + item.acceleration.y.toFixed(3) + ')<br>' +
                        'y=0 moments: [' + item.y0 + ']</div>';
    });
  }

  this.simulate = function() {
    if (Date.now() - this.lastRender >= 1000 / this.FPS) {
      this.draw();
      this.printData();
      this.lastRender = Date.now();
    }
    if (!this.running) {
      this.lastUpdate = Date.now();
      return;
    };
    var cnt = 0;
    while (Date.now() - this.lastUpdate >= 1000 / this.UPS) {
      this.update();
      this.lastUpdate += 1000 / this.UPS;
      cnt++;
      if (cnt >= this.UPS) break;
    }
  }

  this.addParticle = function() {
    var rx = parseFloat(document.getElementById('rx').value), ry = parseFloat(document.getElementById('ry').value);
    var vx = parseFloat(document.getElementById('vx').value), vy = parseFloat(document.getElementById('vy').value);
    var ax = parseFloat(document.getElementById('ax').value), ay = parseFloat(document.getElementById('ay').value);
    this.model.particles.push(new Particle(new Vector(rx, ry), new Vector(vx, vy), new Vector(ax, ay)))
  };

  this.start = function() {
    this.running = true;
    document.getElementsByClassName("isPaused")[0].innerHTML = '<div class="isRunning"><input type="button" value="Pause" onclick="simulator.pause();"></div>';
  }

  this.pause = function() {
    this.running = false;
    document.getElementsByClassName("isRunning")[0].innerHTML = '<div class="isPaused"><input type="button" value="Continue" onclick="simulator.start();"></div>';
  }
}
