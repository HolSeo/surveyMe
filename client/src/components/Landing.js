import React, { Component } from 'react'

class Landing extends Component {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h3>Welcome to SurveyMe!</h3>
                <img src={require('./picture.jpg')} style={{ borderRadius: 50 }}/>
            </div>
        )
    }
}

export default Landing