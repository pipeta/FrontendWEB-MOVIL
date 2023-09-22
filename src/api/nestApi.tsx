import axios from 'axios';


const baseURL = 'https/localhost/3000'; // pone la ip del backend

const API = axios.create({baseURL})


export default API;