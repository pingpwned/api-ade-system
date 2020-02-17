import React from 'react'
import Form from './Form'
export default class Request extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      url: '',
      method: 'get',
      data: {},
      header: {},
      response: {},
      error: {}
    }
  }
  render() {
    return (
      <div id="main__container">
        <div id="form__container">
            <Form handleSubmit={this.handleSubmit}
                  url={this.state.url} 
                  setUrl={this.setUrl}
                  setMethod={this.setMethod}
                  setData={this.setData}
                  setHeader={this.setHeader}/>
            
        </div>
      </div>
    )
  }
  
 
  setUrl = url => {
    this.setState({
      url
    })
  }
  setMethod = method => {
    this.setState({
      method
    })
  }
  setData = data => {
    this.setState({
      data
    })
  }
  setHeader = header => {
    this.setState({
      header
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let request = {
      url: this.state.url,
      method: this.state.method,
      data: this.state.data,
      header: this.state.header
    }
    this.props.sendRequest(request)
  }
}