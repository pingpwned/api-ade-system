import React from 'react'
import WarningMessage from './WarningMessage'

export default class Form extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
          url: '',
          method: 'get',
          header: "",
          response: {},
          error: {},
          showWarning: false,
        }
    }

    render() 
    {
        return(
            <form onSubmit={this.handleSubmit}>
              <select value={this.state.method} onChange={this.handleSelectChange} className="classic">
                  <option value="get" defaultValue>GET</option>
                  <option value="post">POST</option>
                  <option value="put">PUT</option>
                  <option value="delete">DELETE</option>
              </select>
              <div id="address__container">
                <input id="input__address" type="text" name="urlinput" onChange={this.handleInputChange} value={this.state.url} placeholder="http://192.168.0.1"/>
              </div>
              <input type="submit" value="send!" className={this.state.taActive ? "taActive__class" : null}/>
              <div id="contentType__container">
                <label forhtml="header__input">Content-type:</label>
                <input id="header__input" type="text" name="headerinput" onChange={this.handleHeaderChange} value={this.state.header} placeholder="text/plain" />
              </div>
              <textarea ref="textarea" value={this.state.data ? JSON.parse(this.state.data) : ""} 
                        placeholder={JSON.parse("\"{\\n\\t\\\"key\\\": \\\"value\\\"\\n}\"")} 
                        onChange={this.handleTAChange}
                        disabled={ this.state.method  === "post" || this.state.method === "put" ? false : true }/>
              <WarningMessage showWarning={this.state.showWarning} />
            </form>
        )
    }
    componentWillReceiveProps(nextProps){
      console.log(nextProps.request.headers, "HEADERRR")
      this.setState({
        url: nextProps.request.url,
        method: nextProps.request.method
      })
      if ( nextProps.request.data && Object.keys(nextProps.request.data).length > 0 ) {
        
          this.setState({
            data: JSON.stringify(nextProps.request.data)
          })
          
      } else {
        this.setState({data: ""})
      }
      if ( nextProps.request.headers && Object.keys(nextProps.request.headers).length > 0 ) {
        for(let header in nextProps.request.headers) {
          
          if (header) {
            this.setState({
              header: nextProps.request.headers[header]
            })
          }
        }
      } else {
        this.setState({header: ""})
      }
    }
    handleInputChange = event => {
      this.setState({url: event.target.value})
    }
    handleSelectChange = event => {
      this.setState({method: event.target.value})
    }
    handleTAChange = event => {
      this.setState({data: JSON.stringify((event.target.value).trim())})
    }
    handleHeaderChange = event => {
        this.setState({header: event.target.value});
    }
    handleSubmit = event => {
      event.preventDefault()
      if(this.state.url === ""){
        this.setState({showWarning: true})
        this.triggerError()
      } else {
        let request = {}
        if (this.state.data) {
          if(JSON.parse(this.state.data)[0] === "{") {
            request = {
              url: this.state.url.includes('http://') ? this.state.url : this.state.url.includes('https://') ? this.state.url : 'https://'+this.state.url ,
              method: this.state.method,
              data: JSON.parse(this.state.data),
              headers: {"Content-Type": this.state.header},
              crossdomain: true
            }
          } else {
            request = {
              url: this.state.url.includes('http://') ? this.state.url : this.state.url.includes('https://') ? this.state.url : 'https://'+this.state.url ,
              method: this.state.method,
              data: "{"+JSON.parse(this.state.data)+"}",
              headers: {"Content-Type": this.state.header},
              crossdomain: true
            }
          }
          
        } else {
          request = {
            url: this.state.url.includes('http://') ? this.state.url : this.state.url.includes('https://') ? this.state.url : 'https://'+this.state.url ,
            method: this.state.method,
            headers: {"Content-Type": this.state.header},
            crossdomain: true
          }
        }
        
        this.props.sendRequest(request)
      }
    }
    triggerError = () => {
      setTimeout(() => {this.setState({showWarning: false})}, 1500)
    }
}