function getRandomColor() {
  var letters = '0123456789';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 10)];
  }
  return color;
}

function Vector(x=0, y=0, z=0) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.neg = function() {
    return new Vector(-this.x, -this.y, -this.z);
  };

  this.mul = function(d) {
    return new Vector(this.x * d, this.y * d, this.z * d);
  };
  this.mulV = function(v) {
    return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
  };

  this.sum = function(v) {
    if (!(v instanceof Vector)) alert('Trying to get vector + not a vector');
    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
  };

  this.len = function() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }

  this.norm = function(len) {
    if (this.len() == 0) return;
    return this.mul(len / this.len());
  };

};
Vector.prototype = new Vector();

function Segment(a, b) {
  if (!(a instanceof Vector)) alert('First argument is not a point');
  if (!(b instanceof Vector)) alert('Second argument is not a point');
  this.a = a;
  this.b = b;
};
Segment.prototype = new Segment(new Vector(), new Vector());

function Particle(position = new Vector(0, 0, 0), velocity = new Vector(0, 0, 0), acceleration = new Vector(0, 0, 0)) {
  if (!(position instanceof Vector)) alert('Position is not a vector');
  if (!(velocity instanceof Vector)) alert('Velocity is not a vector');
  if (!(acceleration instanceof Vector)) alert('Acceleration is not a vector');
  this.position = position;
  this.velocity = velocity;
  this.acceleration = acceleration;
  this.appearance = {
    color: getRandomColor()
  };
  this.y0 = []

  this.collide = function(timeElapsed) {
    if (this.position.y < 0) {
      this.velocity.y = Math.abs(this.velocity.y);
      this.y0.push(timeElapsed.toFixed(3));
    }
  };

  this.update = function(delta_t) {
    this.velocity = this.velocity.sum(this.acceleration.mul(delta_t));
    this.position = this.position.sum(this.velocity.mul(delta_t))
  }
};
