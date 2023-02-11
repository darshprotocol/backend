const Web3 = require('web3')

module.exports = {
    instance: new Web3(),
    decode: function (format, value) {
        const web3 = this.instance
        return web3.eth.abi.decodeParameters(format, value)
    },
    format: function (collection) {
        switch (collection) {
            case 'lending-offers':
                return ['uint256', 'uint8', 'uint256', 'uint256', 'uint256', 'uint', 'uint160', 'uint160', 'address']
            case 'borrowing-offers':
                return ['uint256', 'uint8', 'uint8', 'uint256', 'uint256', 'unit256', 'uint', 'uint160', 'uint160', 'address']
            case 'loan-created':
                return ['uint256', 'uint256', 'uint8', 'uint8', 'uint8', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint160', 'uint160', 'address', 'address']
            default: return null
        }
    },
    toObject: function (collection, data) {
        switch (collection) {
            case 'lending-offers':
                return {
                    offerId: data[0],
                    principalType: data[1],
                    currentPrincipal: data[2],
                    initialPrincipal: data[3],
                    interest: data[4],
                    daysToMaturity: data[5],
                    expiresAt: data[6],
                    createdAt: data[7],
                    lender: data[8].toLowerCase()
                }
            case 'borrowing-offers':
                return {
                    offerId: data[0],
                    principalType: data[1],
                    collateralType: data[2],
                    initialCollateral: data[3],
                    currentCollateral: data[4],
                    interest: data[5],
                    daysToMaturity: data[6],
                    expiresAt: data[7],
                    createdAt: data[8],
                    borrower: data[9].toLowerCase()
                }
            case 'loan-created':
                return {
                    loanId: data[0],
                    offerId: data[1],
                    state: data[2],
                    principalType: data[3],
                    collateralType: data[4],
                    initialPrincipal: data[5],
                    currentPrincipal: data[6],
                    initialCollateral: data[7],
                    currentCollateral: data[8],
                    interest: data[9],
                    startDate: data[10],
                    maturityDate: data[11],
                    borrower: data[12],
                    lender: data[13]
                }
            default: return null
        }
    }
}