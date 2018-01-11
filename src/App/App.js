import React, { Component } from 'react';
import axios from 'axios';

import ProductListingComponent from '../ProductListingComponent/ProductListingComponent';
import FiltersComponent from '../FiltersComponent/FiltersComponent';

class App extends Component {
    constructor() {
        super();
        this.state = {
            'products': [],
            'categories': [],
            'filters': [],
            'displayedPdts': []
        };

        this.handleFilterSelection = this.handleFilterSelection.bind(this);
    }

    handleFilterSelection(categories) {
        let filters = this.state.filters.slice(0);
        filters.push(categories);
        this.setState({
            'filters': filters
        });
        this.filterProducts(filters);
    }

    filterProducts(filters) {
        let filteredProducts = [];
        let products = this.state.products;

        filters.forEach(filter => {
            let tempPdts = products.filter((product) => {
                if (filter.indexOf(product.categoryId) > -1) {
                    return true;
                }
                return false;
            });
            filteredProducts = filteredProducts.concat(tempPdts);
        })

        console.log('filtered', filteredProducts.length);
        this.setState({
            'displayedPdts' : filteredProducts
        });
    }

    componentDidMount() {
        var _this = this;
        this.productRequest = axios.get(`/products.json`)
            .then(res => {
                const products = res.data;
                _this.setState({
                    'products': products,
                    'displayedPdts': products
                });
            });

        this.filterRequest = axios.get('/categories.json')
            .then(res => {
                const categories = res.data;
                _this.setState({
                    'categories': categories
                });
                console.log('categories', categories);
            });

    }

    render() {
        return (
            <section className="container-fluid">
                <div className="row">
                    <div className="filter-section">
                        <FiltersComponent 
                            data={this.state.categories} 
                            onFilterSelection={this.handleFilterSelection}    
                        />
                    </div>
                </div>
                <div className="col-md-offset-2 col-md-10 products-section">
                    <div className="products-header row">
                        <h3 className="col-md-6">Category Name</h3>
                        <div className="col-md-6 sort-section">
                            <select className="pull-right" name="Sort by" id=""></select>
                        </div>
                    </div>
                    <ProductListingComponent products={this.state.displayedPdts} />
                </div>
            </section>
        )
    }
}

export default App;