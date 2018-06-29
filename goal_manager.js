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
    if(typeof API != 'undefined' && API.goal[0] == API.coord[0] && API.goal[1] == API.coord[1]) {
      API.current_cell().visit();
    }
  };
};
