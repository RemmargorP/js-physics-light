function Graphics(element) {
  this.canvas = element;
  this.ctx = this.canvas.getContext("2d");
  this.offset = new Vector(10, 10, 0);
  this.scale = new Vector(1, 1, 0);

  this.getWidth = function() {
    return this.canvas.width - 2 * this.offset.x;
  };
  this.getHeight = function() {
    return this.canvas.height - 2 * this.offset.y;
  };

  this.setProps = function(offset = new Vector(), scale = new Vector(1, 1, 0)) {
    this.offset = offset;
    this.scale = scale;
  };

  this.getContext = function() {
    return this.ctx;
  };

  this.scaled = function(v) {
    console.log('kek', this.scale, v, this.scale.mulV(v));
    return this.scale.mulV(v);
  };

  this.getPosition = function(v) {
    return this.offset.sum(this.scaled(v).mulV(new Vector(1, -1, 1)).sum(new Vector(0, this.getHeight(), 0)));
  };

  this.clearCanvas = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};
