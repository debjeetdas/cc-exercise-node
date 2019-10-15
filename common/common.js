module.exports = {
    validVal: function (data) {
        if (data === '' || data === null || data === undefined) {
            return false;
        } else {
            if (Array.isArray(data)) {
                return data.length > 0;
            } else {
                return true;
            }
        }
    },
    validateName: function (name) {
        const regex = /^[a-zA-Z ]{2,30}$/;
        return this.validVal(name) && regex.test(name);
    },
    validateCreditCardNumber: function (value) {
        // Takes a credit card string value and returns true on valid number
        // Accept only digits, dashes or spaces
        if (/[^0-9-\s]{2,19}/.test(value)) return false;

        // The Luhn Algorithm. It's so pretty.
        let nCheck = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) == 0;
    },
    validateNumber: function(n) {
        const regex = /^(\d*\.)?\d+$/;
        return this.validVal(n) && regex.test(n);
    },
    cardMessages: {
        'NOTFOUND': 'NOT FOUND',
        'BADREQUEST': 'BAD REQUEST',
        'SUCCESSCREATION': 'SUCCESSFULLY CREATED THE CARD',
        'SUCCESSFETCH': 'SUCCESSFULLY RETREIVED THE CARD',
        'SUCCESSFETCHALL': 'SUCCESSFULLY RETREIVED THE CARDS',
        'SUCCESSUPDATE': 'SUCCESSFULLY UPDATED THE CARD',
        'CCINVALID': 'CREDIT CARD NUMBER IS INVALID',
        'CCAVAILABLE': 'CREDIT CARD NUMBER IS ALREADY AVAILABLE',
        'LIMITINVALID': 'INVALID LIMIT ENTERED',
        'BALANCEINVALID': 'INVALID BALANCE ENTERED',
        'NAMEINVALID': 'PLEASE ENTER PROPER NAME'
    }
}