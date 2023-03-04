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
        }
    }, { timestamps: false });

    return mongoose.model("notifications", schema);
};
