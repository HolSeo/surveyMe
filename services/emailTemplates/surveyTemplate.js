const keys = require('../../config/keys')

module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>I'd like your input!</h3>
                    <p>Please rate our services</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/response">5 Stars</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/response">4 Stars</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/response">3 Stars</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/response">2 Stars</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/response">1 Star</a>
                    </div>
                </div>
            </body>
        </html>
    `;
}