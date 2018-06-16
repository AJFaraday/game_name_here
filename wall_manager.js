WallManager = function(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  manager = this;

  this.random_wall = function() {
    this.add_wall(
      Math.floor((Math.random() * this.rows)),
      Math.floor((Math.random() * this.cols))
    )
  };

  this.random_walls = function(n) {
    for(var i = 0; i < n; i++) {
      manager.random_wall();
    }
  };

  this.add_wall = function(x, y) {
    Sketch.rows[y][x].is_wall();
  };
};
