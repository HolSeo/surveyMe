module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>I'd like your input!</h3>
                    <p>Please rate our services</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="http://localhost:3000">5 Stars</a>
                    </div>
                    <div>
                        <a href="http://localhost:3000">4 Stars</a>
                    </div>
                    <div>
                        <a href="http://localhost:3000">3 Stars</a>
                    </div>
                    <div>
                        <a href="http://localhost:3000">2 Stars</a>
                    </div>
                    <div>
                        <a href="http://localhost:3000">1 Star</a>
                    </div>
                </div>
            </body>
        </html>
    `;
}