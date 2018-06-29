if(API.coord[0] < API.goal[0]) {
  API.right()
} else if (API.coord[0] > API.goal[0]) {
  API.left()
}

if(API.coord[1] < API.goal[1]) {
  API.down()
} else if (API.coord[1] > API.goal[1]) {
  API.up()
}