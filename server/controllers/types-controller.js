const Types = require("../models/Types");

async function getTypes() {
  const types = await Types.find();
  return types;
}
module.exports = { getTypes };
