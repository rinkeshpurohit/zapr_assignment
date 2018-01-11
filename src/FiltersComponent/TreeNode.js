import React, { Component } from 'react';
import Arrow from './Arrow';
import './tree-node.css';



export default class TreeNode extends Component {

    constructor(props) {
        super(props);
        this.state = { collapsed: true };

        this.getChildCategories = this.getChildCategories.bind(this);
    }


    onClick() {

        this.setState({
            collapsed: !this.state.collapsed
        });

    }

    getChildCategories(item) {
        let categories = [item.id];

        if(!item.subCategories) {
            this.props.onFilterSelection(categories);
            return;
        }

        let subCategories = item.subCategories;

        function work(subCategories) {
            for (let i = 0; i < subCategories.length; i++) {
                if (subCategories[i].subCategories) {
                    categories.push(subCategories[i].id);
                    work(subCategories[i].subCategories);
                }
                else {
                    categories.push(subCategories[i].id);
                }
            }
        }

        work(subCategories);

        this.props.onFilterSelection(categories);
    }

    render() {

        let subtree = null;
        if (this.props.data.subCategories) {
            subtree = this.props.data.subCategories.map(function (child) {
                return <TreeNode {...this.props} key={child.id} data={child} />;
            }.bind(this));
        }

        var arrowClassName = 'tree-node-arrow';
        var containerClassName = 'tree-node-children';
        if (this.state.collapsed) {
            arrowClassName += ' tree-node-arrow-collapsed';
            containerClassName += ' tree-node-children-collapsed';
        }

        if (subtree) {
            return (
                <div className="tree-node">
                    <div className="node-title">
                        <Arrow arrowClassName={arrowClassName} onClick={this.onClick.bind(this)} />
                        <a data-id={this.props.data.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                this.getChildCategories(this.props.data);
                            }}>
                            {this.props.data.name}
                        </a>
                    </div>
                    <div className={containerClassName}>
                        {subtree}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="tree-node-leaf">
                    <div className="node-title">
                        <a data-id={this.props.data.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.getChildCategories(this.props.data);
                            }}
                        >
                            {this.props.data.name}
                        </a>
                    </div>
                </div>
            );
        }


    }
};