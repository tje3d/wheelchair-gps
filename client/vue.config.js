const fs = require('fs');

module.exports = {
  devServer: {
    https: {
      cert: fs.readFileSync('../cert.pem'),
      key: fs.readFileSync('../key.pem'),
      // ca: fs.readFileSync('./certs/ca.crt'),
    },
  },
};
