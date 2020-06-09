"use strict";

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(__filename);

require("dotenv").config(); // var server = require("./routes");


// console.log("server",server);
// module.exports = {
//   server
// };
console.log(_routes.default);