import axios from 'axios';
import Cookies from 'js-cookie';
import {getTokenSSRAndCSS} from '../helper';
const baseURL = 'http://localhost:5000/api';

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

   callWithToken(token) {
      return axios.create({
         baseURL,
         headers: {
            // 'Content-type': 'application/json',
            Authorization: 'Bearer ' + token,
         },
      });
   },
};

export default api;
