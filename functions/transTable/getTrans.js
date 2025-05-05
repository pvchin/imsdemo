const { table } = require("./airtable-trans");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const rec = await table.find(id);
    const formattedRec = { id: rec.id, ...rec.fields };
    if (rec.error) {
      return {
        statusCode: 404,
        body: `No Transaction with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedRec);
  }
  if (fv) {
    const recs = await table
      .select({ filterByFormula: `t_no = '${fv}'` })
      .firstPage();
    const formattedRecs = recs.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedRecs);
  }

  try {
    const recs = await table.select().firstPage();
    const formattedRecs = recs.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedRecs);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
