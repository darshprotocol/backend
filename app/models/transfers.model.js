module.exports = mongoose => {
    const schema = mongoose.Schema({
        transferId: {
            type: Number
        },
        offerId: {
            type: Number
        },
        from: {
            type: String
        },
        amount: {
            type: String
        },
        token: {
            type: String
        },
        hash: {
            type: String
        },
        timestamp: {
            type: Number
        }
    }, { timestamps: false });

    return mongoose.model("transfers", schema);
};
