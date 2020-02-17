import React from 'react';
import ReactJson from 'react-json-view' ;
export default class Response extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            response: {},
            error: {}
        }
    }
    render() {
        return( //TODO: ADD CUSTOM SCROLLBAR
            <div id="response__container">
            {Object.keys(this.state.response).length === 0 ? null 
                : 
                <div className="render__response"> Response:
                    <span className="pre"><ReactJson src={this.state.response} collapsed={true} /></span>
                    {/* {<pre>{JSON.stringify(this.state.response, null, 2)}</pre>} */}
                </div>
            }
            {Object.keys(this.state.error).length === 0 ? null 
                : 
                <div className="render__response" > Error:
                    <span className="pre">
                        <ReactJson src={JSON.parse(JSON.stringify(this.state.error))} collapsed={true} />
                    </span>
                </div> 
            }
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ response: nextProps.response, error: nextProps.error });  
    }
}