import React from 'react';
export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        }
    }
    render() {
        let ri
        if (Object.keys(this.state.history).length === 0) {
            ri = <p className="emptyHistory">Empty history</p>
        } else {
            ri = this.state.history.map((item, i) => {
                if (item[0].method) {
                    return(
                        <div key={i} id={i} className="history__method__container" onClick={this.performRequest}>
                            {item[0].method.toUpperCase()}
                            <div className="status__container">
                                {item[0].response.status === 200 || item[0].response.status === 201 ? <div className="status__ok"></div> : <div className="status__error"></div>}
                                <span className="history__path">{item[0].url.substring(0,25)+'...'}</span>
                            </div>
                        </div>
                ) 
                }
                  
            })
        }
        return(
            <div>
                {ri}
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ history: nextProps.history });
    }
    performRequest = e => {
        e.preventDefault()
        if (typeof this.props.performRequest === 'function') {
            this.props.performRequest(e.currentTarget.id);
        }
    }


}   