import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './Landing'
import Header from './Header'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App