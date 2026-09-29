const { query } = require("../../db/query")

const getSchedulesByOperatorId = async ( operatorId ) => {
    const text = `
        SELECT businesses."name" as "businessName"
            , ops."title" as "opTitle"
            , ops."pay" as "pay"
            , ops."startTime" as "startTime"
            , ops."endTime" as "endTime"
            , businesses."addressLine1" as "addressLine1"
            , businesses."addressLine2" as "addressLine2"
            , businesses."city" as "city"
            , businesses."state" as "state"
            , businesses."zip" as "zip"
        FROM ops
        JOIN businesses ON businesses.id = ops."businessId"
        WHERE ops."operatorId" = $1
        ORDER BY ops."startTime" ASC;
    `;
    return await query( text, [ operatorId ] );
};

module.exports = {
    getSchedulesByOperatorId
}
