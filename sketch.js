Sketch = {

  init_to_fill_window: function() {
    var height = $(window).height() - 100;
    var width = $(window).width() - 40;
    Sketch.init(
      Math.floor(width / 22),
      Math.floor(height / 22)
    )
  },

  init: function(cols, rows) {
    Sketch.rows = rows;
    Sketch.cols = cols;
    Sketch.space = $('#sketch');
    Sketch.rows = [];
    for(var row = 0; row < rows; row++) {
      var row_cells = [];
      for(var col = 0; col < cols; col++) {
        row_cells.push(
          new Cell(col, row)
        );
      }
      Sketch.rows.push(row_cells);
    }
    Sketch.initial_draw();
    Sketch.resize_space();
    // TODO allow other control systems
    Sketch.init_mouse();

    Sketch.game_active = false;

    Sketch.score = $('#score');
    Sketch.lives_readout = $('#lives');
    Sketch.message = $('#message');

    Sketch.wall_manager = new WallManager(cols, rows);
    Sketch.goal_manager = new GoalManager(cols, rows);
    Sketch.set_lives(5);
    Sketch.set_score(0);
    Sketch.current_hundred = 0;
  },

  resize_space: function() {
    Sketch.space
      .css('width', (22 * Sketch.cols))
      .css('height', (22 * Sketch.rows))
  },

  clear_board: function() {
    $.each(
      Sketch.rows,
      function(i, row) {
        $.each(
          row,
          function(i, cell) {
            cell.wall = false;
            cell.goal = false;
          }
        )
      }
    );
    $('.cell')
      .stop(true)
      .animate(
        {'background-color': '#000000'},
        1000
      );
    Sketch.set_score(0);
    Sketch.set_lives(5);
    Sketch.current_hundred = 0;
  },

  set_message: function(mess) {
    Sketch.message.html(mess);
  },

  set_score: function(sco) {
    Sketch.points = sco;
    Sketch.score.html("Score: " + sco);
  },

  increase_score: function() {
    Sketch.set_score(Sketch.points + Sketch.blue_square_value());
    while(Math.floor(Sketch.points/100) > Sketch.current_hundred) {
      Sketch.set_lives(Sketch.lives + 1);
      Sketch.current_hundred++;
    }
  },


  set_lives: function(lives) {
    Sketch.lives = lives;
    Sketch.lives_readout.html("Lives: " + lives);
    if(Sketch.lives <= 0) {
      Sketch.end_game();
    }
  }
  ,

  end_game: function() {
    Sketch.set_message('Oh noes! You lost! Your score was ' + Sketch.points + '. Click to try again.');
    Sketch.clear_board();
    Sketch.game_active = false;
  }
  ,

  lose_life: function() {
    Sketch.set_lives(Sketch.lives - 1);
  }
  ,

  start_game: function() {
    if(Sketch.game_active == false) {
      Sketch.game_active = true;
      Sketch.set_message("Game on! Grab blues and avoid reds!");
      Sketch.set_score(0);
      Sketch.goal_manager.random_goal();
    }
  }
  ,

  initial_draw: function() {
    $.each(
      Sketch.rows,
      function(row_idx, row) {
        $.each(
          row,
          function(cell_idx, cell) {
            Sketch.space.append(cell.html);
          }
        );
        Sketch.space.append($('<br clear="both"/>'));
      }
    );
  }
  ,

  init_mouse: function() {
    Sketch.space.on('click', function() {
      Sketch.start_game();
    });
    Sketch.space.on(
      'mouseleave',
      function() {
        if(Sketch.game_active) {
          Sketch.set_message(
            "Don't leave the play area! You lose a life!"
          );
          Sketch.lose_life();
        }
      }
    );
  }
  ,

  // Both the score increase and the number of walls
  blue_square_value: function() {
    return Math.floor(Sketch.points / 10) + 1
  }
}
;
