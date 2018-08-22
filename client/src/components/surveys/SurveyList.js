import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys, deleteSurvey } from '../../actions'

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }
    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <button className="card-title right" onClick={() => this.props.deleteSurvey(survey._id)}>
                            <i className="material-icons">clear</i>
                        </button>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Five Star: {survey.fiveStar}</a>
                        <a>Four Star: {survey.fourStar}</a>
                        <a>Three Star: {survey.threeStar}</a>
                        <a>Two Star: {survey.twoStar}</a>
                        <a>One Star: {survey.oneStar}</a>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

function mapStateToProps({ surveys }) {
    return { surveys }
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList)