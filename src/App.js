import React, { Component } from 'react'
import axios from 'axios'
import './index.css'
import Form from './components/Form'
import History from './components/History'
import SplitPane from 'react-split-pane'
import Response from './components/Response'

class App extends Component {
  state = {
    history: [],
    request: {}
  }
  handleClick = (e) => {
    console.log(e)
  }
  render() {
    return (
      <div className="App">
        <div id="history__container">
          <History history={this.state.history} performRequest={this.performRequest} />
        </div>
        <div id="split__container">
          <SplitPane split="horizontal" defaultSize={200}>
            <Form sendRequest={this.sendRequest} request={this.state.request} />
            <Response response={this.state.response} error={this.state.error} />
          </SplitPane>
        </div>
      </div>
    );
  }
  addHistory = (request, response) => {
    const history = this.state.history
    history.push(
      [{
        method: request.method,
        url: request.url,
        data: request.data,
        headers: request.headers,
        response
      }]
    )
    this.setState({
      history
    })
  }
  sendRequest = request => {
    this.setState({
      request,
      response: {},
      error: {}
    })
      axios(request)
      .then(response => {
        this.addHistory(request, response)
        this.setState({response})
      })
      .catch(error => {
          this.addHistory(request, error)
          this.setState({error})
      })
  }
  performRequest = id => {
    let request = this.state.history[id]
    this.sendRequest(request[0])
  }
}

export default App;
