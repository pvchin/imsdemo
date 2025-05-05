require("dotenv").config();
var Airtable = require("airtable");

var base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const table = base("translots");

module.exports = { table };
