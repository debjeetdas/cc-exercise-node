const moment = require('moment');
const uuid = require('uuid');

// adding inmemory database
const db = require('diskdb');

// connecting to the db
db.connect('./data', ['cards']);

class Card {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.cards = [];
  }
  /**
   * 
   * @returns {object} card object
   */
  create(data) {
    console.log('Creation of card started');
    const newCard = {
      id: uuid.v4(),
      ccnumber: data.ccnumber || 0,
      name: data.name || '',
      limit: data.limit || 0,
      balance: data.balance || 0,
      createdDate: moment.now(),
      modifiedDate: moment.now()
    };
    this.cards.push(newCard);
    if (this.cards.length > 0) {
        db.cards.save(newCard);
        return newCard;
    }
  }
  /**
   * 
   * @param {uuid} id
   * @returns {object} card object
   */
  findOne(id) {
    return db.cards.findOne({id: id});
  }
  /**
   * 
   * @param {number} ccnumber
   * @returns {object} card object
   */
  findOneByNumber(ccnumber) {
    return db.cards.findOne({ccnumber: ccnumber});
  }
  /**
   * @returns {object} returns all cards
   */
  findAll() {
    return db.cards.find();
  }
  /**
   * 
   * @param {uuid} id
   * @param {object} data 
   */
  update(id, data) {
    var options = {
      multi: false,
      upsert: false
    };
    let card = this.findOne(id);
    // const index = this.cards.indexOf(card);
    card.ccnumber = data['ccnumber'] || card.ccnumber;
    card.name = data['name'] || card.name;
    card.limit = data['limit'] || card.limit;
    card.balance = data['balance'] || card.balance;
    card.modifiedDate = moment.now();
    const updated = db.cards.update({id: id}, card, options);
    return updated;
  }
  /**
   * 
   * @param {uuid} id 
   */
  delete(id) {
    const card = this.findOne(id);
    if (card) {
      db.cards.remove({id: id});
      return {};
    } else {
      return null;
    }
  }
}
module.exports = new Card();