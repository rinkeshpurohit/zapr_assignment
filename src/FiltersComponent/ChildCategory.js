import React, { Component } from 'react';

class ChildCategory extends Component {
    render() {
        return (
            <li className="child-category" >{this.props.name}</li>
        );
    }
}

export default ChildCategory;