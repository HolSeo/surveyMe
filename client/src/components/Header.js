import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <nav>
                <div style={{ margin: '0 10px' }}>
                    <div className="nav-wrapper">
                        <a href="#" className="left brand-logo">SurveyMe</a>
                        <ul id="nav-mobile" className="right">
                            <li><a href="sass.html">Sass</a></li>
                            <li><a href="badges.html">Components</a></li>
                            <li><a href="collapsible.html">JavaScript</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header