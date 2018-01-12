import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import App from "./App";

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

it('calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount');
    const component = mount(
        <App />
    );
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
});
