function Cell(col, row) {
  this.html = $('<div>').addClass('cell');
  this.goal = false;

  var cell = this;
  this.is_goal = function() {
    this.wall = false;
    this.goal = true;
    this.html
      .stop(true)
      .animate(
        {'background-color': '#0000FF'},
        200
      );
  };

  this.is_wall = function() {
    if(this.goal == false) {
      this.wall = true;
      this.html
        .stop(true)
        .animate(
          {'background-color': '#FF0000'},
          200
        );
    }
  };

  this.html.on(
    'mouseenter',
    function() {
      cell.html
        .stop(true)
        .css('background-color', '#00FF00');
      if(cell.goal) {
        Sketch.increase_score();
        Sketch.goal_manager.random_goal();
        Sketch.wall_manager.random_walls(Sketch.blue_suqare_value());
        cell.goal = false;
        Sketch.set_message(
          "Mmmmm, lovely blue squares!"
        );
      }
      if(cell.wall) {
        cell.wall = false;
        Sketch.set_message(
          "Ouch! You hit a wall!"
        );
        Sketch.lose_life();
      }
    }
  );


  this.html.on(
    'mouseleave',
    function() {
      cell.html.animate(
        {'background-color': '#000000'},
        500
      )
    }
  );


}
