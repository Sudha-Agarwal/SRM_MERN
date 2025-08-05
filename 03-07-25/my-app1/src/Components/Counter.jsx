import React, {Component} from 'react';

class Counter extends React.Component{
    state = {};
    constructor(props){
        super(props);
        this.state = {count:0}
    }
    increment = function() {
        this.setState({count: this.state.count+1})
    }
    render(){
        return(
            <>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment.bind(this)}>Increment</button>
        </>
    )

    }
    
}

export default Counter;

