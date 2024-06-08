import { BASE_API } from "../constant";
import { axiosRequest, axiosMethod } from "../helpers/axios";

export const getUserData = (url, params) => {
    return new Promise((resolve, reject) => {
        axiosRequest(BASE_API + url, axiosMethod.GET, params)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            console.log('error get data', error);
            reject(error);
        })
    })
}


