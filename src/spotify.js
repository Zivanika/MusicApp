import axios from 'axios'
const authEndpoint="https://accounts.spotify.com/authorize?"
const clientID="a725b6e62d8a4013a36e3a19c00350c9"
// const clientID="fd0a111965944f4c8c9929ef07f7b313"
const redirectUri="https://zivanika.github.io/MusicApp"
const scopes=["user-library-read","playlist-read-private"]
export const loginEndpoint=`${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
// a725b6e62d8a4013a36e3a19c00350c9
// http://localhost:3000/#access_token=BQCubuz3tGyQ68b0YM0YfDQTObFRkE5bJaz-e2L_22vfrbyVsPM7EMS4TdaRLy4ZbmWDXRLaEbJNPCW9jyCM61D3MBdRwVYbVr-Te_53ftpC4LiL3JWD5XIQKXkK3eXbeE0telQcE4BGff1uZJYRhV7ilGyBMIJ8QpOEgEDfcq0jA4cGw1HTS8WGbKiXExXTudl-QDoUV_96D1vkf8nH40CtNRs&token_type=Bearer&expires_in=3600
const apiClient=axios.create({
    baseURL:"https://api.spotify.com/v1/"
});
export const setClientToken=(token)=>{
    apiClient.interceptors.request.use(async function(config){
        config.headers.Authorization="Bearer "+token;
        return config
    })
}
export default apiClient;