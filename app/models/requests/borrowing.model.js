module.exports = mongoose => {
    const schema = mongoose.Schema({
        requestId: {
            type: String,
            unique: true
        },
        percentage: {
            type: Number
        },
        collateralToken: {
            type: String
        },
        collateralAmount: {
            type: String
        },
        daysToMaturity: {
            type: Number
        },
        expiresAt: {
            type: Number
        },
        interest: {
            type: String
        },
        createdAt: {
            type: Number
        },
        borrower: {
            type: String
        },
        offerId: {
            type: String
        }
    }, { timestamps: false });

    return mongoose.model("borrowingrequests", schema);
};