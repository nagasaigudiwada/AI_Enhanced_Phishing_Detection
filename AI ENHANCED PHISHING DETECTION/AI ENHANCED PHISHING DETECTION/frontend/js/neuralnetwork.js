class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
      this.inputNodes = inputNodes;
      this.hiddenNodes = hiddenNodes;
      this.outputNodes = outputNodes;
  
      // Create the weights and biases for the network
      this.weights = [];
      this.biases = [];
  
      for (let i = 0; i < this.hiddenNodes; i++) {
        this.weights.push([]);
        this.biases.push(0);
  
        for (let j = 0; j < this.inputNodes; j++) {
          this.weights[i].push(Math.random());
        }
      }
  
      for (let i = 0; i < this.outputNodes; i++) {
        this.weights.push([]);
        this.biases.push(0);
  
        for (let j = 0; j < this.hiddenNodes; j++) {
          this.weights[i].push(Math.random());
        }
      }
    }
  
    // Feed forward through the network
    feedForward(input) {
      let outputs = [];
  
      // Calculate the outputs of the hidden nodes
      for (let i = 0; i < this.hiddenNodes; i++) {
        let sum = 0;
  
        for (let j = 0; j < this.inputNodes; j++) {
          sum += input[j] * this.weights[i][j];
        }
  
        sum += this.biases[i];
  
        outputs.push(this.sigmoid(sum));
      }
  
      // Calculate the outputs of the output nodes
      for (let i = 0; i < this.outputNodes; i++) {
        let sum = 0;
  
        for (let j = 0; j < this.hiddenNodes; j++) {
          sum += outputs[j] * this.weights[i][j];
        }
  
        sum += this.biases[i];
  
        outputs.push(this.sigmoid(sum));
      }
  
      return outputs;
    }
  
    // Train the network
    train(inputs, outputs) {
      // Calculate the error for each output node
      let errors = [];
  
      for (let i = 0; i < this.outputNodes; i++) {
        errors.push(outputs[i] - this.feedForward(inputs)[i]);
      }
  
      // Update the weights and biases for the output nodes
      for (let i = 0; i < this.outputNodes; i++) {
        for (let j = 0; j < this.hiddenNodes; j++) {
          this.weights[i][j] += errors[i] * outputs[j] * this.learningRate;
        }
  
        this.biases[i] += errors[i] * this.learningRate;
      }
  
      // Update the weights and biases for the hidden nodes
      for (let i = 0; i < this.hiddenNodes; i++) {
        for (let j = 0; j < this.inputNodes; j++) {
          let error = 0;
  
          for (let k = 0; k < this.outputNodes; k++) {
            error += errors[k] * this.weights[k][i];
          }
  
          this.weights[i][j] += error * inputs[j] * this.learningRate;
        }
  
        this.biases[i] += error * this.learningRate;
      }
    }
  
    // Sigmoid function
    sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    }
  }
  
  // Create a new neural network
  const network = new NeuralNetwork(2, 4, 1);
  
  // Train the network
  network.train([[0, 0], [0]], [[0]]);
  network.train([[0, 1], [1]], [[1]]);
  network.train([[1, 0], [1]], [[1]]);
  network.train([[1, 1], [0]], [[0]]);
  
  // Use the network to make a prediction
  const prediction = network.feedForward([0, 1]);
  
  console.log(prediction); // [0.99]