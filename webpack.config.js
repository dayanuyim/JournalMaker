const path = require('path');

module.exports = {
  entry: {
    main: ["./src/js/main.js", "webpack-hot-middleware/client?reload=true"],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
