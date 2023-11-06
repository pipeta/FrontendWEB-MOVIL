
import axios from 'axios';


const baseURL = 'http://localhost:3001'; 

const APIteam = axios.create({baseURL})


export default APIteam;