import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    // Email verifikacija
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: null,
    },
    verificationCodeExpires: {
      type: Date,
      default: undefined,
    },
    // Invitation sistem
    invitationUsed: {
      type: String,
      default: "",
    },
    myInvitationCode: {
      type: String,
      unique: true,
      required: false,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    invitedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    invitationCount: {
      type: Number,
      default: 0,
    },
    terms: {
      type: Boolean,
      default: false,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

function generateInvitationCode(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

userSchema.pre('save', async function(next) {
  if (this.isNew && !this.myInvitationCode) {
    let code = generateInvitationCode();
    while (await mongoose.models.User.findOne({ myInvitationCode: code })) {
      code = generateInvitationCode();
    }
    this.myInvitationCode = code;
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;