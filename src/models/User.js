const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String },
    phone:    { type: String },
    role:     { type: String, enum: ["customer", "admin"], default: "customer" },
    isActive: { type: Boolean, default: true },

    addresses: [
      {
        name:    { type: String },
        phone:   { type: String },
        city:    { type: String },
        address: { type: String },
        isDefault: { type: Boolean, default: false }
      }
    ],

    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name:      { type: String },
        price:     { type: Number },
        qty:       { type: Number }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);

