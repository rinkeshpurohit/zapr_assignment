import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import axios from 'axios';
import mock from "axios-mock-adapter";
import fs from "fs";

import { requests } from "./API";

let mockA = new mock(axios);

mockA.onGet('http://localhost:3000/products.json').reply(200, {
    data: [
        {
            "id": 1,
            "name": "Berke",
            "price": "440.41",
            "rating": 3,
            "color": "Yellow",
            "imgUrl": "http://dummyimage.com/300x200.png/cc0000/ffffff",
            "discount": 4.9,
            "categoryId": 17
        },
        {
            "id": 2,
            "name": "Flossy",
            "price": "427.46",
            "rating": 1,
            "color": "Red",
            "imgUrl": "http://dummyimage.com/300x200.png/5fa2dd/ffffff",
            "discount": 2.3,
            "categoryId": 4
        },
        {
            "id": 3,
            "name": "Editha",
            "price": "387.59",
            "rating": 2,
            "color": "Green",
            "imgUrl": "http://dummyimage.com/300x200.png/cc0000/ffffff",
            "discount": 6.5,
            "categoryId": 28
        },
        {
            "id": 4,
            "name": "Fidela",
            "price": "691.66",
            "rating": 0,
            "color": "Red",
            "imgUrl": "http://dummyimage.com/300x200.png/5fa2dd/ffffff",
            "discount": 1.4,
            "categoryId": 8
        }
    ]
});

describe('Make API calls', () => {
    it('should load products', () => {
        return requests.getProducts()
            .then(data => {
                expect(data.data.data.length).to.greaterThan(0);
            })
    })
})