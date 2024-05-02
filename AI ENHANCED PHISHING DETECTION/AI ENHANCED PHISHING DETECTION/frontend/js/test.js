function test_model() {
  $.getJSON("https://raw.githubusercontent.com/picopalette/phishing-detection-plugin/master/static/classifier.json", function(clfdata) {
    var rf = random_forest(clfdata);
    $.getJSON("https://raw.githubusercontent.com/picopalette/phishing-detection-plugin/master/static/testdata.json", function(testdata) {
      var X = testdata['X_test'];
      var y = testdata['y_test'];
      for(var x in X) {
        for(var i in x) {
          x[i] = parseInt(x[i]);
        }
      }
      var pred = rf.predict(X);
      var TP = 0, TN = 0, FP = 0, FN = 0;
      for(var i in pred) {
        if(pred[i][0] == true && y[i] == "1") {
          TP++;
        } else if(pred[i][0] == false && y[i] == "1") {
          FN++;
        } else if(pred[i][0] == false && y[i] == "-1") {
          TN++;
        } else if(pred[i][0] == true && y[i] == "-1") {
          FP++;
        }
      }
      var precision = TP/(TP+FP);
      var recall = TP/(TP+FN);
      var f1 = 2 * precision * recall / (precision + recall);
      $('#precision').text(precision);
      $('#recall').text(recall);
      $('#accuracy').text(f1);

      var precision1 = TP/(TP+FP);
      var recall1 = TN/(TP+FP);
      var f2 = 2 * precision1 * recall1 / (precision1 + recall1);
      $('#precision1').text(precision1);
      $('#recall1').text(recall1);
      $('#accuracy1').text(f2);

      var precision2 = TP/(TP+FN);
      var recall2 = TP/(TP+FP);
      var f3 = 2 * precision2 * recall2 / (precision2 + recall2);
      $('#precision2').text(precision2);
      $('#recall2').text(recall2);
      $('#accuracy2').text(f3);


      var precision3 = TP/(TP+FN);
      var recall3 = TP/(TP+FP);
      var f4 = 2 * precision3 * recall3 / (precision3 + recall3);
      $('#precision3').text(precision3);
      $('#recall3').text(recall3);
      $('#accuracy3').text(f4);


      var precision4 = TP/(TP+FN);
      var recall4 = TN/(TP+FP);
      var f5 = 2 * precision4 * recall4 / (precision4 + recall4);
      $('#precision4').text(precision4);
      $('#recall4').text(recall4);
      $('#accuracy4').text(f5);
    });
  });
}

test_model();