import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ProductListingComponent from './ProductListingComponent';

it('renders all the provided elements', () => {
  const products = [
    {
      "id": 28,
      "name": "Trish",
      "price": "992.20",
      "rating": 2,
      "color": "Yellow",
      "imgUrl": "http://dummyimage.com/300x200.png/dddddd/000000",
      "discount": 2.6,
      "categoryId": 33
    },
    {
      "id": 12,
      "name": "Danyelle",
      "price": "989.18",
      "rating": 3,
      "color": "Green",
      "imgUrl": "http://dummyimage.com/300x200.png/5fa2dd/ffffff",
      "discount": 5.8,
      "categoryId": 4
    },
    {
      "id": 34,
      "name": "Tove",
      "price": "983.20",
      "rating": 0,
      "color": "Yellow",
      "imgUrl": "http://dummyimage.com/300x200.png/cc0000/ffffff",
      "discount": 5.8,
      "categoryId": 30
    },
    {
      "id": 144,
      "name": "Stephi",
      "price": "976.64",
      "rating": 0,
      "color": "Red",
      "imgUrl": "http://dummyimage.com/300x200.png/cc0000/ffffff",
      "discount": 3.1,
      "categoryId": 10
    },
    {
      "id": 63,
      "name": "Eden",
      "price": "970.99",
      "rating": 3,
      "color": "Orange",
      "imgUrl": "http://dummyimage.com/300x200.png/dddddd/000000",
      "discount": 5.8,
      "categoryId": 30
    },
    {
      "id": 7,
      "name": "Temple",
      "price": "966.10",
      "rating": 5,
      "color": "Yellow",
      "imgUrl": "http://dummyimage.com/300x200.png/cc0000/ffffff",
      "discount": 6.5,
      "categoryId": 14
    },
    {
      "id": 154,
      "name": "Suki",
      "price": "965.80",
      "rating": 0,
      "color": "Red",
      "imgUrl": "http://dummyimage.com/300x200.png/cc0000/ffffff",
      "discount": 4,
      "categoryId": 34
    },
    {
      "id": 22,
      "name": "Garrik",
      "price": "965.21",
      "rating": 0,
      "color": "Yellow",
      "imgUrl": "http://dummyimage.com/300x200.png/dddddd/000000",
      "discount": 6,
      "categoryId": 2
    },
    {
      "id": 107,
      "name": "Clovis",
      "price": "964.76",
      "rating": 4,
      "color": "Yellow",
      "imgUrl": "http://dummyimage.com/300x200.png/dddddd/000000",
      "discount": 6.6,
      "categoryId": 25
    },
    {
      "id": 11,
      "name": "Cull",
      "price": "962.04",
      "rating": 4,
      "color": "Red",
      "imgUrl": "http://dummyimage.com/300x200.png/ff4444/ffffff",
      "discount": 3,
      "categoryId": 5
    }
  ];
  const listing = mount(
    <ProductListingComponent products={products}/>
  );
  const product = listing.find('.product')
  expect(product).to.have.length(products.length);
  expect(listing.props().products.length).to.equal(products.length);
});
