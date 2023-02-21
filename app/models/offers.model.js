module.exports = mongoose => {
    const schema = mongoose.Schema({
        offerId: {
            type: Number,
            unique: true
        },
        state: {
            type: Number
        },
        principalToken: {
            type: String
        },
        currentPrincipal: {
            type: String
        },
        initialPrincipal: {
            type: String
        },
        interest: {
            type: String
        },
        daysToMaturity: {
            type: Number
        },
        expiresAt: {
            type: Number
        },
        createdAt: {
            type: Number
        },
        creator: {
            type: String
        },
        collateralTokens: {
            type: Array
        },
        collateralToken: {
            type: String
        },
        currentCollateral: {
            type: String
        },
        initialCollateral: {
            type: String
        },
        offerType: {
            type: Number
        },
        loans: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'loans'
        }],
        requests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'requests'
        }],
        transfers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'transfers'
        }]
    }, { timestamps: false });

    return mongoose.model("offers", schema);
};