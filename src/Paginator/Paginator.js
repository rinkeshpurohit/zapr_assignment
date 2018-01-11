import React, { Component } from 'react';

export default class Paginator extends Component {
    constructor(props) {
        super(props);

        const perPage = 10;
        let totalItems = this.props.totalItems;
        let totalPage = Math.ceil(totalItems / perPage);

        this.state = {
            'initialPage': 1,
            'perPage': perPage,
            'currPage': 1,
            'totalPage': totalPage
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.totalItems === nextProps.totalItems) {
            return;
        }
        const perPage = 10;
        let totalItems = nextProps.totalItems;
        let totalPage = Math.ceil(totalItems / perPage);

        this.setState({
            'currPage': 1,
            'totalPage': totalPage
        });
       
    }


    handlePageChange(direction) {
        let currPage = this.state.currPage;
        let totalPage = this.state.totalPage;
        let perPage = this.state.perPage;
        let sliceIndexes = [];

        (direction>0) ? currPage++ : currPage--;

        if(currPage>totalPage) currPage = totalPage;
        if(currPage<this.state.initialPage) currPage = this.state.initialPage;

        this.setState({
            'currPage': currPage
        });

        if(currPage===1) sliceIndexes.push(0,perPage);
        else if(currPage===totalPage) sliceIndexes.push((currPage-1)*perPage,this.props.totalItems)
        else sliceIndexes.push((currPage - 1 )* perPage, currPage*perPage)

        this.props.sliceArray(sliceIndexes);
    }

    render() {
        let currPage = this.state.currPage;
        let totalPage = this.state.totalPage;
        let initialPage = this.state.initialPage;
        let next = <button onClick={e=> {this.handlePageChange(1)}}>Next</button>;
        let previous = <button onClick={e=> {this.handlePageChange(-1)}}>Previous</button>;
        let buttons;

        if(totalPage === 1) {
            buttons = '';
        }
        else if(currPage>=totalPage) {
            buttons = previous;
        }
        else if(currPage<=initialPage) {
            buttons = next;
        }
        else {
            buttons = (
                <div>
                    {next}<span>{currPage}</span>{previous}
                </div>
            )
        }
        return (
            <div className="paginator">
                {buttons}
            </div>
        )
    }
}