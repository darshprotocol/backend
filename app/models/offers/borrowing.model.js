module.exports = mongoose => {
    const schema = mongoose.Schema({
        offerId: {
            type: String,
        },
        principalToken: {
            type: String
        },
        collateralToken: {
            type: String
        },
        initialCollateral: {
            type: String
        },
        currentCollateral: {
            type: String
        },
        interest: {
            type: Number
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
        borrower: {
            type: String
        }
    }, { timestamps: false });

    return mongoose.model("borrowingoffers", schema);
};