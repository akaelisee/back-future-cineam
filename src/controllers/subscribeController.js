// @ts-nocheck
const path = require('path');
const Mailchimp = require('mailchimp-api-v3');

const mc_api_key = process.env.MAILCHIMP_API_KEY;
const list_id = process.env.LIST_ID

const mailchimp = new Mailchimp(mc_api_key);

exports.postSubscribe = async (req, res) => {
    const {email} = req.body; 

    mailchimp
        .post(`lists/${list_id}/members/`, {
            email_address: email,
            status: "subscribed"
        })
        .then(result => {
            res.status(201).send({
                status: result.status
            })
        })
        .catch( err => {
            res.status(400).send({message: err})
        })
}