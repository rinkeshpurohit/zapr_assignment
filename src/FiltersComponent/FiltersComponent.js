import React, { Component } from 'react';

class FiltersComponent extends Component {

    constructor(props) {
        super(props);

        this.getChildCategories = this.getChildCategories.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
    }

    getChildCategories(item) {
        let categories = [item.id];
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

    toggleCategory(item) {
        item.expanded = !item.expanded;
        this.renderSubMenu(item.subCategories);
    }

    renderSubMenu(items) {
        let _this = this;
        let keyIndex = 0;
        const menuOptions = items.map(item => {
            const display = (<span onClick={(e)=> {
                e.stopPropagation();
                _this.toggleCategory(item);
            }}>{item.name}</span>),
                hasChildren = (item.subCategories
                    && item.subCategories.length > 0
                );

            let subMenu;

            if (hasChildren && item.expanded) {
                subMenu = _this.renderSubMenu(item.subCategories);
            }
            return (
                (hasChildren) ?
                    <li className='parent-category'
                        key={keyIndex++}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            _this.getChildCategories(item);
                        }}>
                        {display}
                        <ul>
                            {subMenu}
                        </ul>
                    </li>
                    :
                    <li className='child-category' key={keyIndex++} onClick={
                        (e) => {
                            e.stopPropagation();
                            console.log('child');
                        }
                    }>
                        {display}
                    </li>
            );
        })

        return menuOptions;
    }

    render() {
        const items = this.props.data;

        return (
            <ul>
                {this.renderSubMenu(items)}
            </ul>

        )
    }
}

export default FiltersComponent;