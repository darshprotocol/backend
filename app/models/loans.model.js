module.exports = mongoose => {
    const schema = mongoose.Schema({
        loanId: {
            type: Number,
            unique: true
        },
        offerId: {
            type: Number
        },
        state: {
            type: Number
        },
        principalToken: {
            type: String
        },
        collateralToken: {
            type: String
        },
        initialPrincipal: {
            type: String
        },
        currentPrincipal: {
            type: String
        },
        initialCollateral: {
            type: String
        },
        currentCollateral: {
            type: String
        },
        interest: {
            type: String
        },
        startDate: {
            type: Number
        },
        maturityDate: {
            type: Number
        },
        graceDays: {
            type: Number
        },
        collateralPriceInUSD: {
            type: String
        },
        numInstallmentsPaid: {
            type: Number
        },
        unClaimedPrincipal: {
            type: String
        },
        unClaimedCollateral: {
            type: String
        },
        unClaimedDefaultCollateral: {
            type: String
        },
        unClaimedBorrowedPrincipal: {
            type: String
        },
        totalInterestPaid: {
            type: String
        },
        repaidOn: {
            type: Number
        },
        borrower: {
            type: String
        },
        lender: {
            type: String
        }
    }, { timestamps: false });

    return mongoose.model("loans", schema);
};
