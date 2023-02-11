module.exports = mongoose => {
    const schema = mongoose.Schema({
        loanId: {
            type: String,
            required: true,
            unique: true
        },
        offerId: {
            type: String,
            required: true
        },
        state: {
            type: Number,
            required: true
        },
        principalType: {
            type: Number,
            required: true
        },
        collateralType: {
            type: Number,
            required: true
        },
        initialPrincipal: {
            type: String,
            required: true
        },
        currentPrincipal: {
            type: String,
            required: true
        },
        initialCollateral: {
            type: String,
            required: true
        },
        currentCollateral: {
            type: String,
            required: true
        },
        interest: {
            type: String,
            required: true
        },
        startDate: {
            type: Number,
            required: true
        },
        maturityDate: {
            type: Number,
            required: true
        },
        borrower: {
            type: String,
            required: true
        },
        lender: {
            type: String,
            required: true
        }
    }, { timestamps: false });

    return mongoose.model("loans", schema);
};
