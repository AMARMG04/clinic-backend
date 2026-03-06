const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, required: true },
});

const clinicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    address: { type: addressSchema, required: true },

    departments: [{ type: String }],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clinic", clinicSchema);