API = {

  init: function() {
    API.reset();
    API.height = Sketch.height;
    API.width = Sketch.width;
  },

  reset: function() {
    API.coord = [
      Math.floor(Math.random() * Sketch.width),
      Math.floor(Math.random() * Sketch.height)
    ];
    API.current_cell().visit();
    Sketch.start_game();
  },

  current_cell: function() {
    return API.get_cell(API.coord[0], API.coord[1]);
  },

  get_cell: function(x, y) {
    var row = Sketch.rows[y];
    if(typeof row == 'undefined') {
      return null;
    } else {
      return row[x];
    }
  },

  set_goal: function(x, y) {
    API.remove_wall(x, y);
    API.goal = [x, y];
  },

  add_wall: function(x, y) {
    var is_goal = false;
    for(var k = 0; k < API.walls.length; k++) {
      if(API.walls[k][0] == x && API.walls[k][1] == y) {
        is_goal = true
      }
    }
    if(is_goal == false) {
      API.walls.push([x, y]);
    }
  },

  remove_wall: function(x, y) {
    for(var k = 0; k < API.walls.length; k++) {
      if(API.walls[k][0] == x && API.walls[k][1] == y) {
        API.walls.splice(k, 1);
      }
    }
  },

  display_cell: function(x, y) {
    var cell = API.get_cell(x, y);
    if(typeof cell === 'undefined' || cell == null) {
      return 'edge'
    } else if(cell.goal) {
      return 'goal'
    } else if(cell.wall) {
      return 'wall'
    } else {
      return 'blank'
    }
  },

  neighbours: function() {
    return {
      up: API.display_cell(API.coord[0], API.coord[1] - 1),
      right: API.display_cell(API.coord[0] + 1, API.coord[1]),
      down: API.display_cell(API.coord[0], API.coord[1] + 1),
      left: API.display_cell(API.coord[0] - 1, API.coord[1])
    }
  },

  goal: [],  // [1,2]
  walls: [], // [ [1, 2], [4, 5] ]

  up: function() {
    var target = API.get_cell(API.coord[0], API.coord[1] - 1);
    if(target != null) {
      var this_cell = API.current_cell();
      setTimeout(function() {this_cell.leave()}, 10);
      API.coord[1] -= 1;
      API.current_cell().visit();
    } else {
      Sketch.lose_life();
    }
  },

  down: function() {
    var target = API.get_cell(API.coord[0], API.coord[1] + 1);
    if(target != null) {
      var this_cell = API.current_cell();
      setTimeout(function() {this_cell.leave()}, 10);
      API.coord[1] += 1;
      API.current_cell().visit();
    } else {
      Sketch.lose_life();
    }
  },

  left: function() {
    var target = API.get_cell(API.coord[0] - 1, API.coord[1]);
    if(target != null) {
      var this_cell = API.current_cell();
      setTimeout(function() {this_cell.leave()}, 10);
      API.coord[0] -= 1;
      API.current_cell().visit();
    } else {
      Sketch.lose_life();
    }
  },

  right: function() {
    var target = API.get_cell(API.coord[0] + 1, API.coord[1]);
    if(target != null) {
      var this_cell = API.current_cell();
      setTimeout(function() {this_cell.leave()}, 10);
      API.coord[0] += 1;
      API.current_cell().visit();
    } else {
      Sketch.lose_life();
    }
  }

};
