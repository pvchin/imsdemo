const formattedReturn = require("./formattedReturn");
const getRecs = require("./setupTable/getSetup");
const createRec = require("./setupTable/createSetup");
const deleteRec = require("./setupTable/deleteSetup");
const updateRec = require("./setupTable/updateSetup");
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
