exports.handler = async function (event, context) {
    if (event.queryStringParameters) {
        return {
            statusCode: 200, 
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify(event)
        }
    }
}