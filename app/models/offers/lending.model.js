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
        currentPrincipal: {
            type: String,
            required: true
        },
        initialPrincipal: {
            type: String,
            required: true
        },
        interest: {
            type: String,
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
        lender: {
            type: String,
            required: true
        }
    }, { timestamps: false });

    return mongoose.model("lendingoffers", schema);
};