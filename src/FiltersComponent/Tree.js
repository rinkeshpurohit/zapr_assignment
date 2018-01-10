import React, { Component } from 'react';

import ChildCategory from "./ChildCategory";
import ParentCategory from "./ParentCategory";

class Tree extends Component {

    render() {
        const items = this.props.data;
        let treeItems = [];
        let keyIndex=0;

        for(let i=0; i<items.length; i++) {
            if (items[i].subCategories && items[i].subCategories.length) {
                treeItems.push(<ParentCategory name={items[i].name} key={keyIndex++} />);
                treeItems.push(<Tree data={items[i].subCategories} key={keyIndex++}/>);
            }
            else {
                treeItems.push(<ChildCategory name={items[i].name} key={keyIndex++} />)
            }
        }
        return (
            <ul>
                {treeItems}
            </ul>
        )
    }
}

export default Tree;