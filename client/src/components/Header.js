import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Payments from './Payments'

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return <li key="1"><a href="/auth/google">Login with Gooogle</a></li>
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3"><a href="/api/logout">Logout</a></li>
                ]
        }
    }
    render() {
        return (
            <nav>
                <div style={{ margin: '0 10px' }}>
                    <div className="nav-wrapper">
                        <Link 
                            to={this.props.auth ? '/surveys' : '/'}
                            className="left brand-logo"
                        >
                        SurveyMe
                        </Link>
                        <ul className="right">
                            {this.renderContent()}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Header)