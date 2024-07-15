const { model, Schema } = require("mongoose");

const ChatMsgSchema = new Schema(
    {
        username: String,
        message: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("chat_msg", ChatMsgSchema);
