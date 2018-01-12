import React, { Component } from 'react';
import './App.css'
import { requests } from "../API";

import ProductListingComponent from '../ProductListingComponent/ProductListingComponent';
import TreeNode from "../FiltersComponent/TreeNode";
import Paginator from "../Paginator/Paginator";
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

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
            'sortBy': _this.sort[0],
            'range': [0,10000]
        };

        this.handleFilterSelection = this.handleFilterSelection.bind(this);
        this.handleSlicedArray = this.handleSlicedArray.bind(this);
        this.sortProducts = this.sortProducts.bind(this);
        this.setRange = this.setRange.bind(this);
    }

    handleFilterSelection(categories) {
        let _this = this;
        let filters = this.state.filters.slice(0);
        filters.push(categories);
        this.setState({
            'filters': categories
        },()=>{
            _this.filterProducts();
        });
    }

    filterProducts() {
        let _this = this;
        let filters = this.state.filters;
        let filteredProducts = [];

        this.applyRanges(this.state.range, goForward);

        function goForward() {
            let products = _this.state.displayedPdts;
            console.log(filters)
            if(filters.length>0) {
                let tempPdts = products.filter((product) => {
                    if (filters.indexOf(product.categoryId) > -1) {
                        return true;
                    }
                    return false;
                });
                filteredProducts = filteredProducts.concat(tempPdts);
            }
            else {
                filteredProducts = products.slice(0);
            }
            console.log('filtered', filteredProducts.length);
            _this.setState({
                'displayedPdts': filteredProducts
            }, () => {
                _this.sortDisplayedPdts(_this.state.sortBy);
            });
        }
    }

    setRange(range) {
        let _this = this;
        this.setState({
            'range': range
        },()=> {
            _this.filterProducts();
        })
    }

    componentDidMount() {
        var _this = this;
        requests.getProducts().then(res => {
            const products = res.data;
            _this.setState({
                'products': products,
                'displayedPdts': products
            },()=> {
                _this.sortDisplayedPdts(this.state.sortBy);
            });
        });

        requests.getCategories().then(res => {
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
        this.applyRanges(this.state.range,()=>{
            this.setState({
                filters: [],
                displayedPdts: _this.state.displayedPdts    
            }, () => {
                _this.sortDisplayedPdts(this.state.sortBy);
            });
        });
        
    }

    handleSlicedArray(sliceIndesxes) {
        let products = this.state.displayedPdts;
        let sliced = Array.prototype.slice.apply(products,sliceIndesxes);

        this.setState({
            'slicedPdts': sliced
        });
    }

    applyRanges(range,cb) {
        let products = this.state.products;
        let inRange = products.filter((product)=>{
            if(product.price<=range[1] && product.price>=range[0]) {
                return true;
            }
            return false;
        });
        console.log('range', range);
        console.log('in range',inRange.length);

        this.setState({
            'displayedPdts': inRange
        }, () => {
            if(cb || typeof cb === 'function') cb();
        });
    }

    render() {
        let tree1 = this.state.categories.map(function (child) {
            return <TreeNode key={child.id} data={child} onFilterSelection={this.handleFilterSelection} />;
        }.bind(this));

        let total = this.state.displayedPdts.length;
        let range = this.state.range;

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
                        <div className="range-section">
                            <div className="clearfix">
                                <span className="pull-left">Rs. {range[0]}</span>
                                <span className="pull-right">Rs. {range[1]}</span>
                            </div>
                            <Range onChange={this.setRange} step={500} min={0} max={10000} />
                        </div>
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
                        ? <p> No Products..</p>
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