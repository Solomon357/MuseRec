import { useState, useEffect } from "react"

const useAccessToken = () => {

    const [accessToken, setAccessToken] = useState(null);
    //const [error, setError] = useState(null);

    const creds = {
        client_id: 'efe3ac326230422785eca822336069d9',
        client_secret: '110bc2e445a44599919b66cd3805a675',
    };

    useEffect(() => {

        const fetchData = async () => {

            const abortConst = new AbortController();
            //need some params before we can get the token
            let authParams = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials&client_id='+ creds.client_id + '&client_secret='+ creds.client_secret,
                signal: abortConst.signal,
            }

            //fetching Access Token
            await fetch("https://accounts.spotify.com/api/token", authParams)
                .then(res => {
                    if (!res.ok){
                        throw new Error("Couldn't fetch data")
                    } 
                        return res.json()
                    })
                .then(data => {
                    //test to see access data
                    //console.log(data)
                    setAccessToken(data.access_token);
                    //setError(null);
                })
                .catch(error => {
                    if (error.name === "AbortError"){
                        throw new Error("fetch aborted");
                    }
                })

            return () => abortConst.abort();

            }

            fetchData();
        
    }, [creds.client_id, creds.client_secret]);

    return accessToken;
}

// so we can use this function with every page that requires an access token
export default useAccessToken;