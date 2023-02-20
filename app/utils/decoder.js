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
                return ['uint256', 'uint8', 'address', 'uint256', 'uint256', 'uint256', 'uint16', 'uint256', 'uint256', 'address', 'address[]', 'address', 'uint256', 'uint256', 'uint8']
            case 'requests':
                return ['uint256', 'uint8', 'uint16', 'uint16', 'uint256', 'uint256', 'uint256', 'address', 'uint256', 'address', 'uint256', 'uint256', 'uint160', 'uint8']
            case 'loans':
                return ['uint256', 'uint256', 'uint8', 'address', 'address', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint16', 'address', 'address']
            case 'transfer':
                return ['uint256', 'address', 'address', 'uint256', 'address', 'uint256']
            default: return null
        }
    },
    toObject: function (collection, data) {
        switch (collection) {
            case 'offers':
                return {
                    offerId: data[0],
                    state: data[1],
                    principalToken: data[2],
                    currentPrincipal: data[3],
                    initialPrincipal: data[4],
                    interest: data[5],
                    daysToMaturity: data[6],
                    expiresAt: data[7],
                    createdAt: data[8],
                    creator: data[9].toLowerCase(),
                    collateralTokens: data[10],
                    collateralToken: data[11],
                    currentCollateral: data[12],
                    initialCollateral: data[13],
                    offerType: data[14]
                }
            case 'requests':
                return {
                    requestId: data[0],
                    state: data[1],
                    percentage: data[2],
                    daysToMaturity: data[3],
                    interest: data[4],
                    expiresAt: data[5],
                    createdAt: data[6],
                    creator: data[7].toLowerCase(),
                    offerId: data[8],
                    collateralToken: data[9],
                    collateralAmount: data[10],
                    collateralPriceInUSD: data[11],
                    ltvUsed: data[12],
                    requestType: data[13]
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
            case 'transfers':
                return {
                    offerId: data[0],
                    from: data[1].toLowerCase(),
                    to: date[2].toLowerCase(),
                    amount: data[3],
                    token: data[4],
                    timestamp: data[5]
                }
            default: return null
        }
    }
}