import axios from 'axios';
/* import { accountService } from 'services';
 */
const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const instance = axios.create({
    baseURL: `${SERVER_BASE_URL}/api`,
    timeout: 100000,
    //withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
});
instance.interceptors.request.use(
    async instance => {
        try {
           /*  var token = accountService.getToken();
            if (token)
                instance.headers.Authorization = `Bearer ${token}`; */
        } catch { }
        return instance;
    },
    error => {
        Promise.reject(error);
    }
);
instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        /*   if (error.response) {
              //console.log(error.response);
              console.log(error.response.data);
          } else if (error.request) {
              console.log(error.request);
          } else if (error.message) {
              console.log(error.message);
          } 
        if (error.response && error.response.status === 401)
            accountService.redirectToLogin();*/
        /* else if (error.response && error.response.status === 404)
            window.location.href = "/errors/error-404" */

        return Promise.reject(error)
    }
);
export default instance;
