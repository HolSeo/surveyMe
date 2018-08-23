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
                        <span className="card-title"><h4 style={{ marginTop: '0' }}>{survey.title}</h4></span>
                        <button className="btn right" onClick={() => this.props.deleteSurvey(survey._id)}>
                            <i className="material-icons">clear</i>
                        </button>
                        <h6>{survey.body}</h6>
                        <br/>
                        <p className="left">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>1 star: {survey.oneStar}</a>
                        <a>2 stars: {survey.twoStar}</a>
                        <a>3 stars: {survey.threeStar}</a>
                        <a>4 stars: {survey.fourStar}</a>
                        <a>5 stars: {survey.fiveStar}</a>
                        <a className="right">
                        Avg: {((survey.oneStar + survey.twoStar*2 + survey.threeStar*3 + survey.fourStar*4 + survey.fiveStar*5) /
                            (survey.oneStar + survey.twoStar + survey.threeStar + survey.fourStar + survey.fiveStar)).toFixed(2)} stars
                        </a>
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