module.exports = mongoose => {
    const schema = mongoose.Schema({
        offerId: {
            type: String,
            unique: true
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
        collateralTokens: {
            type: Array
        },
        expiresAt: {
            type: Number
        },
        createdAt: {
            type: Number
        },
        lender: {
            type: String
        }
    }, { timestamps: false });

    return mongoose.model("lendingoffers", schema);
};