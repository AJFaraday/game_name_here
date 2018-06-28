moved = false;
if(API.coord[0] < API.goal[0] && API.neighbours().right != 'wall') {
  API.right()
  moved = true;
} else if (API.coord[0] > API.goal[0] && API.neighbours().left != 'wall') {
  API.left()
  moved = true;
}

if(API.coord[1] < API.goal[1]  && API.neighbours().down != 'wall') {
  API.down()
  moved = true;
} else if (API.coord[1] > API.goal[1]  && API.neighbours().up != 'wall') {
  API.up()
  moved = true;
}

$.each([0,0,0,0,0], function() {
  if (moved == false) {
    moveable = [];
    $.each(API.neighbours(), function(k,v) {
      if (v == 'blank') {moveable.push(k)}
    });
    dir = moveable[Math.floor(Math.random() * moveable.length)];
    API[dir]()
  }
});