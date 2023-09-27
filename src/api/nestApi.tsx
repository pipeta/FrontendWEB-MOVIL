import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const baseURL = 'http://localhost:3000'; // pone la ip del backend

const API = axios.create({baseURL})

// API.interceptors.request.use(
    
//     async(config)=>{
//        const token = await AsyncStorage.getItem('token')
//        if(token){
//         config.headers.token = token
//        }
//        return config
//     }
// )

export default API;