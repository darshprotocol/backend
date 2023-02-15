module.exports = mongoose => {
    const schema = mongoose.Schema({
        address: {
            type: String
        },
        ipfsHash: {
            type: String
        },
        name: {
            type: Number
        }
    }, { timestamps: false });

    return mongoose.model("users", schema);
};
