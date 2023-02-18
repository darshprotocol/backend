module.exports = mongoose => {
    const schema = mongoose.Schema({
        requestId: {
            type: String,
            unique: true
        },
        state: {
            type: Number
        },
        percentage: {
            type: Number
        },
        daysToMaturity: {
            type: Number
        },
        interest: {
            type: String
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
        offerId: {
            type: String
        },
        collateralToken: {
            type: String
        },
        collateralAmount: {
            type: String
        },
        collateralPriceInUSD: {
            type: String
        },
        ltvUsed: {
            type: Number
        },
        requestType: {
            type: Number
        }
    }, { timestamps: false });

    return mongoose.model("requests", schema);
};