import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  rate: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Settings =
  mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);

export default Settings;
