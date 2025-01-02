import axios from "axios";
// export const TINY_KEY = "";
// export const BACKEND_URL = "";
const URL = "https://nimboi4.pythonanywhere.com/api";
const Axios = axios.create({
    baseURL: URL,
    withCredentials: false,
    headers: {
        'Content-Type' : 'multipart/form-data',
       'Access-Control-Allow-Origin': '*',
       'auth_key' :'i4_consulting_jaimatadii',
    },
});

// const requestOtp = async (data) => {
//     await Axios.post('add-health-goal/', data)
//         .then(response => {
//             console.log('ONnload call Response Data:', response.data.errors.user_token);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// };


// const data = new FormData();
// data.append('goal_id'); // Add necessary fields for the request
// data.append('user_token', 'set_password');
// requestOtp(data);


export default Axios;