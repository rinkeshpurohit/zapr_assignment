import axios from "axios";

const URL = {
    'products': '/products.json',
    'categories': '/categories.json'
}

const requests = {
    'getProducts' : () => {
        return axios.get(URL.products);
    },
    'getCategories': () => {
        return axios.get(URL.categories);        
    }
}

export {requests};