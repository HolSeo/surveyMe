const _ = require('lodash')
const Path = require('path-parser').default
const { URL } = require('url') // default in Node.js
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys') // side-stepping error from testing.

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req,res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false }); // not include recipients.
        res.send(surveys)
    })

    app.get('/api/surveys/:surveyId/:choice', (req,res) => {
        res.send('Thanks for voting!')
    })
    
    app.post('/api/surveys/webhooks', (req,res) => {
        const p = new Path('/api/surveys/:surveyId/:choice') // extracts surveyID and choice
        _.chain(req.body)
            .map(({ url, email }) => {
                const match = p.test(new URL(url).pathname) // new URL extracts route, match is object of matches or null
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice }
                }
            })
            .compact() // removes undefined elements
            .uniqBy('email', 'surveyId') // removes duplicates in email or surveyId keys
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true }, // set selected recipients responded to true
                    lastResponded: new Date()
                }).exec()
            })
            .value() // return value
        res.send({})
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
            res.send(user)
        } catch(err) {
            res.status(422).send(err)
        }
    })

    // We cannot customize the URL to record User's answers because everybody gets the same email template.
    // So we use Sendgrid, the email provider, which will replace any links with their unique link, which 
    // contains a unique identifying token. We extracts information via Webhook.
}