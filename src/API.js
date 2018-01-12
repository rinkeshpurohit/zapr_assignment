import axios from "axios";

// added to supprt testing
const env = process.env.NODE_ENV;
let prefix;

if(env === 'test') { 
    prefix = 'http://localhost:3000';
}
else {
    prefix = '';
}

const URL = {
    'products': prefix+'/products.json',
    'categories': prefix+'/categories.json'
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