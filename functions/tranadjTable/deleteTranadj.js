const { table } = require("./airtable-tranadj");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedItem = await table.destroy(id);
    return formattedReturn(200, deletedItem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
