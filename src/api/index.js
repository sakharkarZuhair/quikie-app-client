import axios from "axios";

const API_KEY = "8d7be793a6cd17412f99336a0b580b54";

export const liveData = () =>
  axios.get(`http://api.coinlayer.com/live?access_key=${API_KEY}`);

export const listData = () =>
  axios.get(`http://api.coinlayer.com/list?access_key=${API_KEY}`);
