import React, { Component } from 'react';
import './ProductListingComponent.css';

class ProductListingComponent extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
  
    let products = this.props.products;

    var productsHTML = products.map((product) => {
      return (
        <div key={product.id} className="product col-md-3 col-sm-6">
          <div className="pdt-img-cnt">
            <img src={product.imgUrl} alt={products.name} />
          </div>
          <div className="pdt-info-cnt">
            <div className="row">
              <p className="col-xs-7 pdt-name">{product.name}</p>
              <span className="col-xs-5 text-right">{product.rating}</span>
            </div>
            <p className="pdt-price">{product.price}</p>
          </div>
        </div >
      )
    })

    return (
        <div className="row products">
          {productsHTML}
        </div>
    );
  }
}

export default ProductListingComponent;
