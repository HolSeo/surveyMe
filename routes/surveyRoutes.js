const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys') // side-stepping error from testing.

module.exports = app => {
    app.get('/api/surveys/response', (req,res) => {
        res.send('Thanks for voting!')
    })
    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(recipient => ({ email: recipient.trim() })), // return list of email object
            _user: req.user.id,
            dateSent: Date.now()
        })

        const mailer = new Mailer(survey,surveyTemplate(survey));
        try {
            await mailer.send()
            await survey.save()

            req.user.credits -= 1

            const user = await req.user.save()
        } catch(err) {
            res.status(422).send(err)
        }

        res.send(user)
    })

    // We cannot customize the URL to record User's answers because everybody gets the same email template.
    // So we use Sendgrid, the email provider, which will replace any links with their unique link, which 
    // contains a unique identifying token. We extracts information via Webhook.
}