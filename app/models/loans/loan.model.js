module.exports = mongoose => {
    const schema = mongoose.Schema({
        loanId: {
            type: String
        },
        offerId: {
            type: String
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
        borrower: {
            type: String
        },
        lender: {
            type: String
        }
    }, { timestamps: false });

    return mongoose.model("loans", schema);
};
