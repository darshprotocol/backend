module.exports = mongoose => {
    const schema = mongoose.Schema({
        id: {
            type: Number
        },
        timestamp: {
            type: Number
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        offerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'offers'
        },
        offerType: {
            type: Number
        },
        readAt: {
            type: Number
        }
    }, { timestamps: false });

    return mongoose.model("notifications", schema);
};
