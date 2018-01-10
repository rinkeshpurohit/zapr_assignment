import React, { Component } from 'react';
import axios from 'axios';

import ProductListingComponent from '../ProductListingComponent/ProductListingComponent';
import FiltersComponent from '../FiltersComponent/FiltersComponent';

class App extends Component {
    constructor() {
        super();
        this.state = {
            'products': [],
            'categories': []
        };
    }

    componentDidMount() {
        var _this = this;
        this.productRequest = axios.get(`/products.json`)
            .then(res => {
                const products = res.data;
                _this.setState({
                    'products': products
                });
            });

        this.filterRequest = axios.get('/categories.json')
            .then(res => {
                const categories = res.data;
                _this.setState({
                    'categories': categories
                });
            });

    }

    render() {
        return (
            <section className="container-fluid">
                <div className="row">
                    <div className="filter-section">
                        <FiltersComponent categories={this.state.categories} />
                    </div>
                </div>
                <div className="col-md-offset-2 col-md-10 products-section">
                    <div className="products-header row">
                        <h3 className="col-md-6">Category Name</h3>
                        <div className="col-md-6 sort-section">
                            <select className="pull-right" name="Sort by" id=""></select>
                        </div>
                    </div>
                    <ProductListingComponent products={this.state.products} />
                </div>
            </section>
        )
    }
}

export default App;