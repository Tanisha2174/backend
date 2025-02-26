const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ServiceSchema = new mongoose.Schema({
  serviceId: { type: Number, required: true }, 
  type: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" }
});

const UserSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true , sparse: true },
    phone: { type: String, unique: true, required: true , sparse: true },
    password: { type: String, required: true },
    isBusiness: { type: Boolean, default: false },
    businessName: { type: String },
    businessType: { 
      type: String, 
      enum: [
        "sole-proprietor", "pvt-ltd", "llp", "ngo", "trust", 
        "society", "public-ltd", "one-person-company", "other"
      ] 
    },
    location: { type: String, required: true },
    resetPasswordToken: { type: String, default: null }, // Token for password reset
    resetPasswordExpires: { type: Date, default: null },
    isVerified: { type: Boolean, default: false }, 
    googleId: { type: String },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document", default: [] }],
    services: { type: [ServiceSchema], default: [] },

  },
  { timestamps: true }
);

UserSchema.plugin(AutoIncrement, { inc_field: "id" });

const User = mongoose.model("User", UserSchema);
module.exports = User;

