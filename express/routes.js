const router = require('express').Router();
const emailService = require('./services/emailService');
const { labels } = require('./constants');

// TODO: can be misused from postman, protect!!
router.post('/send-email', async (req, res) => {
  const isEmailSent = await emailService.sendEmail(req.body.email, req.body.email_type);
  if (!isEmailSent) {
    return res.status(500).send({ response: labels.EMAIL_SEND_FAILED })
  }
  res.status(200).send({ response: labels.EMAIL_SEND_SUCCESFUL });
});

module.exports = router;
