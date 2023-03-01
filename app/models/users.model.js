module.exports = mongoose => {
    const schema = mongoose.Schema({
        address: {
            type: String
        },
        borrowedTimes: {
            type: Number
        },
        lentTimes: {
            type: Number
        },
        borrowedVolume: {
            type: String
        },
        lentVolume: {
            type: String
        },
        lastActive: {
            type: Number
        },
        collateralVolume: {
            type: String
        },
        interestPaidVolume: {
            type: String
        },
        defaultedTimes: {
            type: Number
        },
        defaultedVolume: {
            type: String
        },
        firstBorrowAt: {
            type: Number
        },
        activeLoans: {
            type: Number
        }
    }, { timestamps: false });

    return mongoose.model("users", schema);
};
