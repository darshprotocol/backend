module.exports = mongoose => {
    const schema = mongoose.Schema({
        requestId: {
            type: String,
            unique: true
        },
        percentage: {
            type: Number
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
        lender: {
            type: String
        },
        offerId: {
            type: String
        }
    }, { timestamps: false });

    return mongoose.model("lendingrequests", schema);
};
