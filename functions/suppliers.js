const formattedReturn = require("./formattedReturn");
const getRecs = require("./suppliersTable/getSuppliers");
const createRec = require("./suppliersTable/createSupplier");
const deleteRec = require("./suppliersTable/deleteSupplier");
const updateRec = require("./suppliersTable/updateSupplier");
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
