import React from 'react'

export default class WarningMessage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showWarning: false
        }
    }
    render() {
        return(
        <div id="warning__message" 
          className={this.state.showWarning ? "showWarning" : null} 
          style={!this.state.showWarning ? {opacity: 0} : null}
        >
          <img alt="warning" src={require('../assets/warning.png')} />
          <p>Request URL is empty</p>
        </div>
        )
    }
    componentDidMount() {
        this.setState({showWarning: this.props.showWarning})
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ showWarning: nextProps.showWarning });  
    }
}