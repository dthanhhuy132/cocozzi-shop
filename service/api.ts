import axios from 'axios';
import Cookies from 'js-cookie';
const baseURL = 'http://localhost:5000/api/';

const api = {
   call() {
      return axios.create({
         baseURL,
         headers: {
            // 'Content-type': 'application/json',
            // Authorization: "Bearer " + localStorage.getItem("spotifyAuthToken"),
         },
      });
   },

   callWithToken() {
      return axios.create({
         baseURL,
         headers: {
            // 'Content-type': 'application/json',
            Authorization: 'Bearer ' + Cookies.get('token'),
         },
      });
   },
};

export default api;
