class NaiveBayesClassifier {
    constructor() {
      this.labels = new Set();
      this.features = new Map();
    }
  
    train(text, label) {
      this.labels.add(label);
      const words = text.split(' ');
      for (const word of words) {
        const feature = this.features.get(word) || { count: 0 };
        feature.count++;
        this.features.set(word, feature);
      }
    }
  
    classify(text) {
      const probabilities = new Map();
      for (const label of this.labels) {
        const probability = this.calculateProbability(text, label);
        probabilities.set(label, probability);
      }
  
      const highestProbability = Math.max(...probabilities.values());
      const predictedLabel = [...probabilities.keys()].find(label => probabilities.get(label) === highestProbability);
      return predictedLabel;
    }
  
    calculateProbability(text, label) {
      const words = text.split(' ');
      let probability = 1;
      for (const word of words) {
        const feature = this.features.get(word);
        if (feature) {
          const featureProbability = feature.count / this.labels.size;
          probability *= featureProbability;
        }
      }
  
      return probability;
    }
  }
  
  const classifier = new NaiveBayesClassifier();
  classifier.train('I love dogs', 'positive');
  classifier.train('I hate cats', 'negative');
  const prediction = classifier.classify('I love cats');
  
  console.log(prediction); 