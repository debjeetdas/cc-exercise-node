// create express variable - importing express
const express = require('express');

// import common function
const common = require('./../../common/common');

// setting up express router
const router = express.Router();

// import Card model class
const Card = require('../models/card');

// GET request to retreive the cards
router.get('/', (req, res, next) => {
    console.log('Listing all cards');
    const cards = Card.findAll();
    if (cards) {
        res.status(200).json({
            message: common.cardMessages.SUCCESSFETCHALL,
            data: cards
        });
    } else {
        res.status(400);
        next();
    }
});

// POST request to add the card
router.post('/', (req, res, next) => {
    console.log('saving the card', req.body);
    const validatedResp = validateSaveOrUpdateRequests(req, res, next, 'save');
    console.log('validatedResp ----> ', validatedResp);
    if (common.validateCreditCardNumber(req.body.ccnumber)) {
        const card = Card.findOneByNumber(req.body.ccnumber);
        if (card) {
            res.status(400);
            res.statusMessage = common.cardMessages.CCAVAILABLE;
            next();
        } else {
            const data = {
                name: req.body.name,
                ccnumber: req.body.ccnumber,
                limit: req.body.limit,
                balance: (req.body.balance) ? req.body.balance : 0
            }
            const card = Card.create(data);
            if (card) {
                res.status(200).json({
                    message: common.cardMessages.SUCCESSCREATION,
                });
            } else {
                res.status(400);
                next();
            }
        }
    } else {
        res.status(400);
        next();
    }
});

// GET request to get specific card
router.get('/:cardId', (req, res, next) => {
    console.log('Getting card with ID :', req.params.cardId);
    const id = req.params.cardId;
    // checking if the Id is present or not
    const card = Card.findOneByNumber(id);
    if (card) {
        console.log('ID available');
        res.status(200).json({
            message: common.cardMessages.SUCCESSFETCH,
            data: card
        });
    } else {
        console.log('ID unavailable');
        res.status(400).json({
            message: common.cardMessages.NOTFOUND
        });
    }
});

// PATCH request to update the card
router.patch('/:cardId', (req, res, next) => {
    console.log('Updating card with ID :', req.params.cardId);
    const id = req.params.cardId;
    const card = Card.findOne(id);

    console.log('patch body ----> ', req.body);
    // checking if the Id is present or not
    if (card) {
        const validatedResp = validateSaveOrUpdateRequests(req, res, next, 'update');
        console.log('validatedResp ----> ', validatedResp);
        if (common.validateName(req.body.name) &&
            common.validateCreditCardNumber(req.body.ccnumber) &&
            common.validateNumber(req.body.limit)) {
            console.log('ID available');
            const data = {
                name: req.body.name,
                ccnumber: req.body.ccnumber,
                limit: req.body.limit,
                balance: (req.body.balance) ? req.body.balance : 0
            }
            const card = Card.update(id, data);
            console.log('update card ------> ', card);
            res.status(200).json({
                message: 'Updated Card',
                id: id
            });
        }
    }
    else {
        console.log('ID unavailable');
        res.status(400).json({
            message: 'Special Id not retreived'
        });
        next();
    }
});


// validate Requests
const validateSaveOrUpdateRequests = function (req, res, next, type) {
    if (!common.validateName(req.body.name)) {
        res.status(400);
        res.statusMessage = common.cardMessages.NAMEINVALID;
        next();
    }
    if (!common.validateCreditCardNumber(req.body.ccnumber)) {
        res.status(400);
        res.statusMessage = common.cardMessages.CCINVALID;
        next();
    }
    if (!common.validateNumber(req.body.limit)) {
        res.status(400);
        res.statusMessage = common.cardMessages.LIMITINVALID;
        next();
    }
    if (req.body.balance && !common.validateNumber(req.body.balance)) {
        res.status(400);
        res.statusMessage = common.cardMessages.BALANCEINVALID;
        next();
    }
    return type;
}

// DELETE request to update the card
router.delete('/:cardId', (req, res, next) => {
    console.log('Deleting card with ID :', req.params.cardId);
    const id = req.params.cardId;
    const card = Card.delete(id);
    // checking if the Id is present or not
    if (card) {
        console.log('ID available');
        res.status(200).json({
            message: 'Deleted Card',
            id: id
        });
    } else {
        console.log('ID unavailable');
        res.status(400).json({
            message: 'Special Id not retreived'
        });
    }
});

module.exports = router;