import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions' 

class Payment extends Component {
    render() {
        return (
            <div>
                <StripeCheckout 
                    name="SurveyMe"
                    description="$5 for 5 email credits!"
                    amount={500}
                    token={token => this.props.handleToken(token)} //cb function with token we get back from stripe
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                >
                <button className="btn">Add Credits</button>
                </StripeCheckout>
            </div>
        )
    }
}

export default connect(null,actions)(Payment)