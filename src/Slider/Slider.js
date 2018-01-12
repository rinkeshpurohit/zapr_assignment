import React, { Component } from 'react';
import './slider.css';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'range': props.range,
            'min': props.min,
            'max': props.max
        }

        this.getValue = this.getValue.bind(this);
    }

    getValue(event) {
        let value = event.target.value;
        let ranges = this.props.range;
        let newRange = [];
        if(value <= ranges[0]) newRange.push(value,ranges[1]);
        else newRange.push(ranges[0], value);
        this.setState({
            'range': newRange
        });
        this.props.onRangeSelection(newRange);
        console.log(value)
    }

    render() {
        let min = this.props.min;
        let max = this.props.max;
        let step = this.props.step;
        let range = this.state.range;

        return (
            <section className="range-slider">
                <span className="rangeValues">{range[0]}-{range[1]}</span>
                <input  min={min} max={max} step={step} onChange={this.getValue} type="range" />
                <input  min={min} max={max} step={step} onChange={this.getValue} type="range" />
            </section>
        )
    }
}