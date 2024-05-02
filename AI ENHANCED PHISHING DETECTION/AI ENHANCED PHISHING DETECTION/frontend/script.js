if (document.getElementById('c')) {
    var c_canvas = document.getElementById("c");
    var context = c_canvas.getContext("2d");
  
  
    for (var x = 0.5; x < 500; x += 10) {
      context.moveTo(x, 0);
      context.lineTo(x, 375);
    }
  
    for (var y = 0.5; y < 375; y += 10) {
      context.moveTo(0, y);
      context.lineTo(500, y);
    }
  
    context.strokeStyle = "#eee";
    context.stroke();
  
    context.beginPath();
    context.moveTo(0, 375 / 2);
    context.lineTo(500, 375 / 2);
  
    context.moveTo(60, 0);
    context.lineTo(60, 27);
    context.moveTo(60, 47);
    context.lineTo(60, 375);
  
    context.strokeStyle = "#000";
    context.stroke();
  
  
    context.font = "bold 12px sans-serif";
    context.textAlign = "center"; // Align text to the center
    context.fillStyle = "#000"; // Set text color to black
  
    context.fillText("Percentages", 300, 200);
    context.fillText("Algorithms", 28, 42);
  
  
    var rouletteRed = (function() {
      var winnings = 0;
      return function() {
        winnings += Math.random() < 17/36 ? 1 : -1;
        return winnings;
      };
    })();
  
    var roulette17 = (function() {
      var winnings = 0;
      return function() {
        winnings += Math.random() < 1/36 ? 34 : -1;
        return winnings;
      };
    })();
  
    var lineGraph = function(o, label, yOffset) {
      context.beginPath();
      context.moveTo(60, 375 / 2);
      for(var i = 61; i < 500; i += 1) {
        context.lineTo(i, -o.stepFunction() + 375 / 2);
      }
      context.strokeStyle = o.color;
      context.stroke();
      context.fillStyle = o.color;
      context.fillText(label, 250, yOffset); // Adjust the positioning of the label
    };
  
    lineGraph({
      'stepFunction': rouletteRed,
      'color': '#e00'
    }, "Naive Bayes", 20);
  
    lineGraph({
      'stepFunction': roulette17,
      'color': '#00e'
    }, "Decision Tree", 40);
    lineGraph({
      'stepFunction': roulette17,
      'color': '#663300'
    }, "Random Forest", 60);
    lineGraph({
      'stepFunction': roulette17,
      'color': '#ff00ff'
    }, "Neural Networks", 80);
    lineGraph({
      'stepFunction': roulette17,
      'color': '#0099ff'
    }, "Support Vector Machine", 100);
    
  
  }
  