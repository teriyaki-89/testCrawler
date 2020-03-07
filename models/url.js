const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    h1: {
        type: String
    },
    h2: {
        type: String
    },
    h3: {
        type: String
    },
    aHref: {
        type: String
    }
});

urlSchema.methods.saveUrl = async function() {
    const url = this;
    const match = await Url.findOne({ url: url.url });
    if (!match) {
        await url.save();
        return url;
    } else {
        let updateRecord = match;
        let allowedProperties = ["h1", "h2", "h3", "aHref"];
        allowedProperties.forEach(key => {
            updateRecord[key] = url[key];
        });
        await updateRecord.save();
        return updateRecord;
    }
};

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
