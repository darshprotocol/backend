const Web3 = require('web3')

module.exports = {
    instance: new Web3(),
    decode: function (format, value) {
        const web3 = this.instance
        return web3.eth.abi.decodeParameters(format, value)
    },
    format: function (collection) {
        switch (collection) {
            case 'offers':
                return ['uint160', 'address', 'uint256', 'uint256', 'uint256', 'uint16', 'uint160', 'uint160', 'address', 'address[]', 'address', 'uint256', 'uint256', 'uint8']
            case 'requests':
                return ['uint160', 'uint16', 'uint16', 'uint160', 'uint256', 'uint160', 'address', 'uint160', 'address', 'uint256', 'uint256', 'uint160', 'uint8']
            case 'loans':
                return ['uint256', 'uint160', 'uint8', 'address', 'address', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint160', 'uint160', 'uint16', 'address', 'address']
            default: return null
        }
    },
    toObject: function (collection, data) {
        switch (collection) {
            case 'offers':
                return {
                    offerId: data[0],
                    principalToken: data[1],
                    currentPrincipal: data[2],
                    initialPrincipal: data[3],
                    interest: data[4],
                    daysToMaturity: data[5],
                    expiresAt: data[6],
                    createdAt: data[7],
                    creator: data[8].toLowerCase(),
                    collateralTokens: data[9],
                    collateralToken: data[10],
                    currentCollateral: data[11],
                    initialCollateral: data[12],
                    offerType: data[13]
                }
            case 'requests':
                return {
                    requestId: data[0],
                    percentage: data[1],
                    daysToMaturity: data[2],
                    expiresAt: data[3],
                    interest: data[4],
                    createdAt: data[5],
                    creator: data[6].toLowerCase(),
                    offerId: data[7],
                    collateralToken: data[8],
                    collateralAmount: data[9],
                    collateralPriceInUSD: data[10],
                    ltvUsed: data[11],
                    requestType: data[12]
                }
            case 'loans':
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
                    graceDays: data[12],
                    borrower: data[13].toLowerCase(),
                    lender: data[14].toLowerCase()
                }
            default: return null
        }
    }
}