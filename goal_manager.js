GoalManager = function(rows, cols) {
  this.rows = rows;
  this.cols = cols;

  this.random_goal = function() {
    this.add_goal(
      Math.floor((Math.random() * this.rows)),
      Math.floor((Math.random() * this.cols))
    )
  };

  this.add_goal = function(x, y) {
    Sketch.rows[y][x].is_goal();
  };
};
