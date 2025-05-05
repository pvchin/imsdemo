const formattedReturn = require("./formattedReturn");
const getRecs = require("./usersTable/getUsers");
const createRec = require("./usersTable/createUser");
const deleteRec = require("./usersTable/deleteUser");
const updateRec = require("./usersTable/updateUser");
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
