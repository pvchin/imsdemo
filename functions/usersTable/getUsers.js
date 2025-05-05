const { table } = require("./airtable-users");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const user = await table.find(id);
    const formattedUser = { id: user.id, ...user.fields };
    if (user.error) {
      return {
        statusCode: 404,
        body: `No User with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedUser);
  }
  if (fv) {
    const users = await table
      .select({ filterByFormula: `userid = '${fv}'` })
      .firstPage();
    const formattedUsers = users.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedUsers);
  }

  try {
    const users = await table.select().firstPage();
    const formattedUsers = users.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedUsers);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
