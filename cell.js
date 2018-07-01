function Cell(col, row) {
  this.row = row;
  this.col = col;
  this.html = $('<div>').addClass('cell');
  this.goal = false;

  var cell = this;
  this.is_goal = function() {
    this.wall = false;
    this.goal = true;
    this.html.addClass('goal').removeClass('wall');
    if(typeof API !== 'undefined') {API.set_goal(col, row);}
  };

  this.is_wall = function() {
    if(this.goal == false) {
      this.wall = true;
      this.html.addClass('wall');
      if(typeof API !== 'undefined') {API.add_wall(col, row);}
    }
  };

  this.visit = function() {
    if(cell.goal) {
      Sketch.increase_score();
      Sketch.goal_manager.random_goal();
      Sketch.wall_manager.random_walls(Sketch.blue_square_value());
      cell.goal = false;
      cell.html.removeClass('goal');
      Sketch.set_message(
        "Mmmmm, lovely blue squares!"
      );
    }
    if(cell.wall) {
      if(typeof API !== 'undefined') {API.remove_wall(col, row);}
      cell.wall = false;
      cell.html.removeClass('wall');
      Sketch.set_message(
        "Ouch! You hit a wall!"
      );
      Sketch.lose_life();
    }
    cell.html.addClass('snake');
  };

  this.leave = function() {
    cell.html.removeClass('snake');
  };

  this.init_mouse = function() {
    this.html.on('mouseleave', cell.leave);
    this.html.on('mouseenter', cell.visit);
  };

}
