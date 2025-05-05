const formattedReturn = require("./formattedReturn");
const getRecs = require("./transTable/getTrans");
const createRec = require("./transTable/createTran");
const deleteRec = require("./transTable/deleteTran");
const updateRec = require("./transTable/updateTran");
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
