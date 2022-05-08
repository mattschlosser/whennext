const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const headers = {
    'Content-type': 'application/json', 
    'Cache-Control': 'public,max-age=3600'
};
let token = null;
const fetchToken = () => fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
    method: 'POST'
}).then(res => res.json())

const getUser = async (username) => {
    return await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
        method: 'get',
        headers: {
            'Client-Id': process.env.TWITCH_CLIENT_ID, 
            'Authorization': `Bearer ${token.access_token}`
        }
    }).then(res => res.json()).then(res => res.data[0]);
}
const getFollows = async(user) => {
    let results = [];
    let r = {};
    do {
        r = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${user.id}${r.pagination ? `&after=${r.pagination.cursor}` : ``}`, {
            method: 'get', 
            headers: {
            'Client-Id': process.env.TWITCH_CLIENT_ID, 
            'Authorization': `Bearer ${token.access_token}`
            }
        }).then(res => res.json());
        results = [...results,  ...r.data];
    } while (r.pagination.cursor);
    return results;
}
const getSchedule = async(follow) => {
    return await fetch(`https://api.twitch.tv/helix/schedule?broadcaster_id=${follow.to_id}`, {
        method: 'get', 
        headers: {
            'Client-Id': process.env.TWITCH_CLIENT_ID, 
            'Authorization': `Bearer ${token.access_token}`
        }
    }).then(res => { console.log(new Date(), res.headers.get('ratelimit-remaining')); return res.json()})
}
let corsDomains = ['localhost:8080', 'next.rugg.rocks'];

exports.handler = async function (event, context) {
    // if this is a preflight request
    if (event.httpMethod === 'OPTIONS') {
        // get the origin header
        let url = new URL(event.headers.origin);
        // check if the origin is in the list of allowed hosts
        if (corsDomains.includes(url.host)) {
            // if it is, return the appropriate headers
            return {
                headers: {
                    'Access-Control-Allow-Origin': url.protocol + '//' + url.host,
                    'Access-Control-Allow-Methods': "GET", 
                    'Access-Control-Allow-Headers': 'x-cache-bucket'
                }, 
                statusCode: 200
            }
        }
    }
    // if this is a GET request
    if (event.httpMethod === 'GET') {
        console.log(event);
        if (token === null) {
            token = await fetchToken();
        }
        // prevent script from running on any other site, except dev
        // check the origin
        if (event.headers.origin) {
            let url = new URL(event.headers.origin);
            // if it is not same-origin
            if (url.host !== process.env.HOST) {
                // it is a croos-origin request

                // check the origin's host is in the list of allowed hosts
                if (corsDomains.includes(url.host)) {
                    // allow the origin
                    headers['Access-Control-Allow-Origin'] = url.protocol + '//' +  url.host
                    headers['Access-Control-Allow-Methods'] = "GET"
                } else {
                    // don't run the script, because the API call to Twitch counts toward a rate limit
                    return {
                        statusCode: 400
                    }
                }
            }
        }
        if (event.queryStringParameters) {
            let username = event.queryStringParameters.user;
            if (username) {
                let user = await getUser(username)
                headers['Vary'] = `X-Cache-Bucket`;
                let follows = await getFollows(user);
                let upcomingStreams = [];
                let promises = [];
                for (let follow of follows) {
                    promises.push(getSchedule(follow).then(schedule => {
                        if (schedule.data) {
                            // assume the first stream is net
                            if (schedule.data.segments?.length) {
                                let nextTime = schedule.data.segments[0];
                                upcomingStreams.push({
                                    streamer: follow.to_name, 
                                    next_stream: nextTime
                                })
                            }
                        }
                    }))
                }
                // wait for every promise
                await Promise.all(promises);
                upcomingStreams.sort(({next_stream: a},{next_stream: b}) => a.start_time > b.start_time ? 1 : a.start_time < b.start_time ? -1 : 0)
                return {
                    statusCode: 200, 
                    headers, 
                    body: JSON.stringify(
                        upcomingStreams
                    )
                }
            } else {
                return {
                    statusCode: 400, 
                    headers, 
                    body: JSON.stringify({
                        message: "Invalid command"  
                    })
                }
            }
        }
    }
}