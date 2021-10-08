exports.handler = async function (event, context) {
    if (event.queryStringParameters) {
        return event.queryStringParameters;
    }
}