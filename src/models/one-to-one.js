const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});

const Customers = mongoose.model("Customers", customersSchema);

const identifiersSchema = new mongoose.Schema({
  // customer:customersSchema,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
  },
});

const Identifiers = mongoose.model("Identifiers", identifiersSchema);
module.exports={
    Customers,
    Identifiers,
}