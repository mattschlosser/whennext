exports.handler = async function (event, context) {
    if (event.queryStringParameters) {
        console.log(event.queryStringParameters);
    }
}