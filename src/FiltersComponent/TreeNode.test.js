import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import TreeNode from "./TreeNode";
import { constants } from 'fs';

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

describe('Filters', () => {
    const nest = {
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
        const clickSpy = sinon.spy();
        const node = mount(<TreeNode key={nest.id} data={nest} onFilterSelection={clickSpy} />);
        expect(node.find('.tree-node-children .tree-node-leaf')).to.have.length(nest.subCategories.length);
    })

    it('should return all child categories.', ()=> {
        const clickSpy = sinon.spy();
        const node = mount(<TreeNode key={nest.id} data={nest} onFilterSelection={clickSpy} />);
        node.find('.node-title a').at(0).simulate('click');
        expect(clickSpy.calledWith([3, 5, 6, 7, 8, 9])).to.equal(true);
    });

    it('should only return the id if node is leaf node', ()=> {
        const clickSpy = sinon.spy();
        const node = mount(<TreeNode key={nest.id} data={nest} onFilterSelection={clickSpy} />);
        node.find('.node-title a').at(3).simulate('click');
        expect(clickSpy.calledWith([ 7])).to.equal(true);
    });
});