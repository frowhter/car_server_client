import {$host} from "./index";
import {ICar} from "../types/cars";
import axios from "axios";
import {string} from "prop-types";

export const fetchBrand = async () => {
    const {data} = await $host.get(`http://localhost:5000/api/brands`)
    return data
}

export const fetchModels = async (brand: string) => {
    const {data} = await $host.get(`http://localhost:5000/api/models/`, {
        params:{
            brand: brand,
        }
    })
    return data
}

export const fetchGenerations = async (model: string) => {
    const {data} = await $host.get(`http://localhost:5000/api/models_info/`, {
        params:{
            model: model
        }
    })
    return data
}

export const fetchDetails = async (brand: string, model: string) => {
    const {data} = await $host.get(`http://localhost:5000/api/details/`, {
        params:{
            brand: brand,
            model: model,
        }
    })
    return data
}

export const fetchProducts = async (brand: string, model: string, detail: string) => {
    const {data} = await $host.get(`http://localhost:5000/api/products/`, {
        params:{
            brand: brand,
            model: model,
            detail: detail,
        }
    })
    return data
}

export const fetchReviews = async () => {
    const {data} = await $host.get(`http://localhost:5000/api/customer_reviews/`)
    return data
}




type sendMail= (
    formData: FormData
)=> any
export const sendMailSelections: sendMail = async (formData) => {
    const {data} = await $host.post(`http://localhost:5000/api/mail/selection`, formData)
    return data
}
export const sendMailCall: sendMail = async (formData) => {
    const {data} = await $host.post(`http://localhost:5000/api/mail/call`, formData)
    return data
}