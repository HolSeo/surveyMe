import React, { Component } from 'react'
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    render() {
        return (
            <div>
                <SurveyForm />
                <SurveyFormReview />
            </div>
        )
    }
}

export default SurveyNew