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
            case 'loans-property':
                return ['uint256', 'uint256', 'uint8', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256']
            case 'transfers':
                return ['uint256', 'uint256', 'address', 'uint256', 'address', 'uint8', 'uint256']
            case 'activities':
                return ['address', 'uint16', 'uint16', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint16', 'uint256', 'uint256', 'uint16']
            case 'notifications': 
                return ['uint', 'uint256', 'address', 'address']
            default: return null
        }
    },
    toObject: function (collection, data, transactionHash) {
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
            case 'loans-property':
                return {
                    loanId: data[0],
                    collateralPriceInUSD: data[1],
                    numInstallmentsPaid: data[2],
                    unClaimedPrincipal: data[3],
                    unClaimedCollateral: data[4],
                    unClaimedDefaultCollateral: data[5],
                    unClaimedBorrowedPrincipal: data[6],
                    totalInterestPaid: data[7],
                    repaidOn: data[8]
                }
            case 'transfers':
                return {
                    transferId: data[0],
                    offerId: data[1],
                    from: data[2].toLowerCase(),
                    amount: data[3],
                    token: data[4],
                    type: data[5],
                    hash: transactionHash,
                    timestamp: data[6]
                }
            case 'activities':
                return {
                    address: data[0].toLowerCase(),
                    borrowedTimes: data[1],
                    lentTimes: data[2],
                    borrowedVolume: data[3],
                    lentVolume: data[4],
                    lastActive: data[5],
                    collateralVolume: data[6],
                    interestPaidVolume: data[7],
                    defaultedTimes: data[8],
                    defaultedVolume: data[9],
                    firstBorrowAt: data[10],
                    activeLoans: data[11]
                }
            case 'notifications':
                return {
                    id: data[0],
                    timestamp: data[1],
                    from: data[2].toLowerCase(),
                    to: data[3].toLowerCase(),
                    readAt: 0
                }
            default: return null
        }
    }
}