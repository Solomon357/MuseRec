import { useState, useEffect } from "react"
import * as INFO from "../ClientInfo";
const useAccessToken = () => {

  const [accessToken, setAccessToken] = useState(null);
  //const [error, setError] = useState(null);

  const creds = {
    client_id: INFO.CLIENT_ID,
    client_secret: INFO.CLIENT_SECRET,
  };

  useEffect(() => {

    const fetchData = async () => {

      const abortConst = new AbortController();
      //authentification
      let authParams = {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id='+ creds.client_id + '&client_secret='+ creds.client_secret,
        signal: abortConst.signal,
      }

      await fetch("https://accounts.spotify.com/api/token", authParams)
        .then(res => {
          if (!res.ok){
            throw new Error("Couldn't fetch data")
          } 
            return res.json()
          })
        .then(data => {
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

export default useAccessToken;