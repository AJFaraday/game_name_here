Timeout = {

  last_mark: Date.now(),
  start: function () {
    if (typeof Timeout.process === 'undefined' || Timeout.process === null) {
      Timeout.last_mark = Date.now();
      Timeout.process = setInterval(Timeout.check_time, 100);
    }
  },

  stop: function () {
    clearInterval(Timeout.process)
  },

  check_time: function () {
    if (Sketch.points >= 1) {
      var now = Math.floor(Date.now() / 1000);
      var time_since = Math.floor(now - Timeout.last_mark / 1000) + 1;
      var time_left = 20 - time_since;
      if (time_left > 0) {
        $('#timeout').html("Timeout: " + time_left);
      } else {
        Timeout.last_mark = Date.now();
        Sketch.set_message("20 seconds since your last blue square. OUCH!")
        Sketch.lose_life();
      }
    }
  }

};

