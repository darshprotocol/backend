module.exports = mongoose => {
    const schema = mongoose.Schema({
        offerId: {
            type: String,
            required: true,
            unique: true
        },
        principalType: {
            type: Number,
            required: true
        },
        collateralType: {
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
            type: Number,
            required: true
        },
        daysToMaturity: {
            type: Number,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Number,
            required: true
        },
        borrower: {
            type: String,
            required: true
        }
    }, { timestamps: false });

    return mongoose.model("borrowingoffers", schema);
};