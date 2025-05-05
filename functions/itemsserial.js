const formattedReturn = require("./formattedReturn");
const getRecs = require("./itemsserialTable/getItemserial");
const createRec = require("./itemsserialTable/createItemserial");
const deleteRec = require("./itemsserialTable/deleteItemserial");
const updateRec = require("./itemsserialTable/updateItemserial");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getRecs(event);
  } else if (event.httpMethod === "POST") {
    return await createRec(event);
  } else if (event.httpMethod === "PUT") {
    return await updateRec(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteRec(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
