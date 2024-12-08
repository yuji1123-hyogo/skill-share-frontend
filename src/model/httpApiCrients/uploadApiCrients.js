import axios from "axios"
import apiClient from "./apiCrientSetting";



export const uploadImageApiCrient=async(formData)=>{
    const response =await  apiClient.post('/api/upload/',formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials:true
    })

    return response
}

export const uploadProfilePictureApiCrient=async(formData)=>{
    const response =await  apiClient.post('/api/upload/profilepicture',formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials:true
    })

    return response
}

export const uploadThemeImageApiCrient=async(formData)=>{

    const response =await  apiClient.post(`/api/upload/club/themeImage`,formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials:true
    })

    return response
}