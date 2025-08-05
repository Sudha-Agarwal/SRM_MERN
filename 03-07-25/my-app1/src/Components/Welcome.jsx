import {Component} from 'react';


class Welcome extends Component{     

    render(){
        const { name, email} = this.props.user; //destructuring
        return (
            <>
                <h2>Welcome {name}</h2>
                <p>Email: {email}</p>
            </>
        )
    }

}
export default Welcome;





