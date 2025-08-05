import {Component} from 'react';

class ClassLifeCycleMethods extends Component{

    constructor(props){
        super(props);
        this.state = {count:0};
        console.log('contructor');
    }
    componentDidUpdate(){
        console.log('component did update')
    }
    render(){
        return(
            <div>
                <p>LifeCycle methods</p>
                <p>Count: {this.state.count}</p>
                <button onClick={()=>this.setState({count: this.state.count+1})}>Increment</button>
            </div>
        )
    }
}

export default ClassLifeCycleMethods;