import React, { Component } from 'react';
import axios from 'axios';
import './App.css'

import ProductListingComponent from '../ProductListingComponent/ProductListingComponent';
import TreeNode from "../FiltersComponent/TreeNode";
import Paginator from "../Paginator/Paginator";

class App extends Component {
    constructor() {
        super();
        this.sort = ['price', 'rating'];
        let _this = this;

        this.state = {
            'products': [],
            'categories': [],
            'filters': [],
            'displayedPdts': [],
            'slicedPdts': [],
            'sortBy': _this.sort[0]
        };

        this.handleFilterSelection = this.handleFilterSelection.bind(this);
        this.handleSlicedArray = this.handleSlicedArray.bind(this);
        this.sortProducts = this.sortProducts.bind(this);
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
        let _this = this;
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
        },()=> {
            _this.sortDisplayedPdts(this.state.sortBy);
        });
    }

    componentDidMount() {
        var _this = this;
        this.productRequest = axios.get('/products.json')
            .then(res => {
                const products = res.data;
                _this.setState({
                    'products': products,
                    'displayedPdts': products
                },()=> {
                    _this.sortDisplayedPdts(this.state.sortBy);
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

    sortProducts(event) {
        this.setState({
            sortBy: event.target.value
        });
        this.sortDisplayedPdts(event.target.value);
    }

    sortDisplayedPdts(key) {
        let _this = this;
        let products = this.state.displayedPdts.slice(0);
        let sorted = products.sort((a,b) => {
            return b[key] - a[key];
        });

        this.setState({
            displayedPdts: sorted
        },()=> {
            _this.handleSlicedArray([0, 10]);
        })
    }

    clearAllFilters() {
        let _this = this;
        let products = this.state.products;
        this.setState({
            filters: [],
            displayedPdts: products 
        },()=>{
            _this.sortDisplayedPdts(this.state.sortBy);
        });
    }

    handleSlicedArray(sliceIndesxes) {
        let products = this.state.displayedPdts;
        let sliced = Array.prototype.slice.apply(products,sliceIndesxes);

        this.setState({
            'slicedPdts': sliced
        });
    }

    render() {
        let tree1 = this.state.categories.map(function (child) {
            return <TreeNode key={child.id} data={child} onFilterSelection={this.handleFilterSelection} />;
        }.bind(this));

        let total = this.state.displayedPdts.length;

        return (
            <section className="container-fluid">
                <div className="row">
                    <div className="filter-section">
                        {tree1}
                        {
                            (this.state.filters.length)
                            ? <span className="clear-filters" onClick={this.clearAllFilters.bind(this)}>Clear All</span>
                            : ''
                        }
                    </div>
                </div>
                <div className="col-sm-offset-2 col-sm-10 products-section">
                    <div className="products-header row">
                        <div className="col-sm-6 category-meta">
                            <h3 className="category-title">Category Name</h3>
                            <p className="product-count">Showing {total} products</p>
                        </div>
                        <div className="col-sm-6 sort-section">
                            <select className="pull-right" name="Sort by" 
                                onChange={this.sortProducts}>
                            {
                                this.sort.map((item,index)=>{
                                        return (<option key={index} value={item}>{item}</option>)
                                })
                            }
                            </select>
                        </div>
                    </div>
                    {
                        (total===0)
                        ? <p> Loading......</p>
                        : (
                            <div>
                                <ProductListingComponent products={this.state.slicedPdts} />
                                <Paginator sliceArray={this.handleSlicedArray} totalItems={total} />
                            </div>
                        )
                    }
                </div>
            </section>
        )
    }
}

export default App;