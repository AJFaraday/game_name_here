Editor = {
  init: function() {
    Editor.step = $('a#step');
    Editor.slow = $('a#slow');
    Editor.fast = $('a#fast');
    Editor.stop = $('a#stop');
    Editor.reset = $('a#reset');
    Editor.input = $('textarea#custom_function');

    Editor.step.on('click', Editor.run_step);
    Editor.slow.on('click', function() {Editor.start_process(1000)});
    Editor.fast.on('click', function() {Editor.start_process(100)});
    Editor.stop.on('click', Editor.stop_process);
    Editor.reset.on('click', function() {
      Sketch.end_game();
      Editor.stop_process();
      API.reset();
    });
  },

  process: null,

  start_process: function(interval) {
    Editor.stop_process();
    Editor.process = setInterval(Editor.run_step, interval);
  },

  stop_process: function() {
    if(Editor.process != null) {
      clearInterval(Editor.process);
    }
  },

  run_step: function() {
    if(Sketch.game_active) {
      eval(Editor.input.val());
    } else {
      Editor.stop_process();
    }
  }
};
