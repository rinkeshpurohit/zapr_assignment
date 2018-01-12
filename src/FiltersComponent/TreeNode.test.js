import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import TreeNode from "./TreeNode";
import { constants } from 'fs';

describe('Filters', () => {
    it('should add a single leaf node', () => {
        const clickSpy = sinon.spy();
        const n = {
            "name": "Adidas",
            "id": 5
        };
        const node = mount(<TreeNode key={n.id} data={n} onFilterSelection={clickSpy}/>);
        node.find('a').simulate('click');
        expect(clickSpy.calledOnce).to.equal(true);
    });

    it('should add a nested node', () => {
        const n = {
            "id": 3,
            "name": "Brands",
            "subCategories": [
                {
                    "name": "Adidas",
                    "id": 5
                },
                {
                    "name": "Puma",
                    "id": 6
                },
                {
                    "name": "Nike",
                    "id": 7
                },
                {
                    "name": "FILA",
                    "id": 8
                },
                {
                    "name": "HRX",
                    "id": 9
                }
            ]
        };
        const clickSpy = sinon.spy();
        const node = mount(<TreeNode key={n.id} data={n} onFilterSelection={clickSpy} />);
        expect(node.find('.tree-node-children .tree-node-leaf')).to.have.length(n.subCategories.length);
    })
});