import React, { Component } from 'react';

class ParentCategory extends Component {
    render() {
        return (
            <li className="parent-category" >{this.props.name}</li>
        );
    }
}

export default ParentCategory;