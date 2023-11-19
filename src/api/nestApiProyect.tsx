import axios from 'axios';


const baseURL = 'http://localhost:3002'; 

const APIproyect = axios.create({baseURL})


export default APIproyect;