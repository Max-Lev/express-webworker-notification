if (process.argv.indexOf('-d') > 0) {
  module.exports = require('./config/webpack.dev.js');
}

else if (process.argv.indexOf('-p') > 0) {
  module.exports = require('./config/webpack.prod.js');
}
else{
    module.exports = require('./config/webpack.dev.js');
}