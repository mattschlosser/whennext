const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const headers = {
    'Content-type': 'application/json', 
    'Cache-Control': 'public,max-age=3600'
};
let token = null;
const fetchToken = () => fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
    method: 'POST'
}).then(res => {
    return res.json()
})

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
    results = [];
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
    }).then(res => res.json())
}

exports.handler = async function (event, context) {
    if (token === null) {
        token = await fetchToken();
    }
    if (event.queryStringParameters) {
        let username = event.queryStringParameters.user;
        if (username) {
            let user = await getUser(username)
            let follows = await getFollows(user);
            let upcomingStreams = [];
            for (let follow of follows) {
                let schedule = await getSchedule(follow);
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
            }
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