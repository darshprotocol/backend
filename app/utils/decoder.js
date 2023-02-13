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
                return ['uint160', 'address', 'uint256', 'uint256', 'uint256', 'uint16', 'address[]', 'uint160', 'uint160', 'address']
            case 'borrowing-offers':
                return ['uint160', 'address', 'address', 'uint256', 'uint256', 'uint256', 'uint16', 'uint160', 'uint160', 'address']
            case 'loan-created':
                return ['uint256', 'uint160', 'uint8', 'address', 'address', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint160', 'uint160', 'address', 'address']
            case 'lending-requests':
                return ['uint160', 'uint16', 'uint16', 'uint160', 'uint256', 'uint160', 'address', 'uint160']
            case 'borrowing-requests':
                return ['uint160', 'uint16', 'address', 'uint256', 'uint16', 'uint160', 'uint256', 'uint160', 'address', 'uint160']
            default: return null
        }
    },
    toObject: function (collection, data) {
        switch (collection) {
            case 'lending-offers':
                return {
                    offerId: data[0],
                    principalToken: data[1],
                    currentPrincipal: data[2],
                    initialPrincipal: data[3],
                    interest: data[4],
                    daysToMaturity: data[5],
                    collateralTokens: data[6],
                    expiresAt: data[7],
                    createdAt: data[8],
                    lender: data[9].toLowerCase()
                }
            case 'borrowing-offers':
                return {
                    offerId: data[0],
                    principalToken: data[1],
                    collateralToken: data[2],
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
                    principalToken: data[3],
                    collateralToken: data[4],
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
            case 'lending-requests':
                return {
                    requestId: data[0],
                    percentage: data[1],
                    daysToMaturity: data[2],
                    expiresAt: data[3],
                    interest: data[4],
                    createdAt: data[5],
                    lender: data[6].toLowerCase(),
                    offerId: data[7]
                }
            case 'borrowing-requests':
                return {
                    requestId: data[0],
                    percentage: data[1],
                    collateralToken: data[2],
                    collateralAmount: data[3],
                    daysToMaturity: data[4],
                    expiresAt: data[5],
                    interest: data[6],
                    createdAt: data[7],
                    borrower: data[8],
                    offerId: data[9]
                }
            default: return null
        }
    }
}