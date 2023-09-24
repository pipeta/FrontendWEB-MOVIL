import axios from 'axios';


const baseURL = 'http://localhost:3000'; // pone la ip del backend

const API = axios.create({baseURL})


export default API;