import React, { Component } from 'react';

import Tree from "./Tree";

class FiltersComponent extends Component {

    render() {
        return (
            <Tree data={this.props.categories} />
        )
    }
}

export default FiltersComponent;