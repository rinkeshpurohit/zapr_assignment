import React, { Component } from 'react';
import './Navi.css';


 // {data.children.map((child, index) => (
 //   <Navi {...child} key={index} onClick={this.onClick} />
 // ))}
 

export default class Navi extends Component {
  static defaultProps = {
    children: [],
    props: {
      name: '',
      url: '#'
    },
    level: 1
  };

  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.detectClick = this.detectClick.bind(this);
  }

  detectClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ expanded: !prevState.expanded }));
    this.props.onClick && this.props.onClick(this.props.level, e);
  }

  renderItems() {
    let { children, props, level } = this.props;
    let { expanded } = this.state;
    let { title, url } = props;
    let onClick = this.props.onClick
      ? this.props.onClick.bind(null, level)
      : null;
    return !children.length
      ? <a className={'naviLevel level-' + level} href={url} onClick={onClick}>
          {title}
        </a>
      : <div
          className={'clearfix naviLevel level-' + level}
          onClick={this.detectClick}>
          <span className="pull-left">
            {title}
          </span>
          <i
            style={{ padding: 0 }}
            className={`pull-right icon icon-${expanded
              ? 'chevron2'
              : 'chevron'}`}
          />
        </div>;
  }

  render() {
    let { expanded } = this.state;
    let { children, level } = this.props;
    return (
      <div className="navi">
        <div className="naviWrapper">
          {expanded &&
            children.map(naviData =>
              <Navi
                {...naviData}
                level={level + 1}
                onClick={this.props.onClick}
              />
            )}
        </div>
      </div>
    );
  }
}