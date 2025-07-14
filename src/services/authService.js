const { generateAToken } = require("../utils/jwt");
const AppError = require("../cores/appError");
const transporter = require("./mailService");
const { db, verifyFirebaseToken } = require("../config/firebase.config");

class AuthService {
  static login = async (payload) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
      from: process.env.EMAIL,
      to: payload.identifier,
      subject: "Email verification",
      text: `This is your email verification code: ${code}`,
    };

    await transporter.sendMail(mailOptions);

    const foundEmailVerification = await db
      .collection("verification")
      .where("email", "==", payload.identifier)
      .limit(1)
      .get();

    if (!foundEmailVerification.empty) {
      const doc = foundEmailVerification.docs[0];
      await doc.ref.update({ code, createAt: Date.now() });
    } else {
      await db
        .collection("verification")
        .add({ email: payload.identifier, code: code, createAt: Date.now() });
    }
  };

  static verify = async (payload) => {
    const foundEmailVerification = await db
      .collection("verification")
      .where("email", "==", payload.identifier)
      .where("code", "==", payload.code)
      .limit(1)
      .get();

    //can be verify expires using createAt

    if (foundEmailVerification.empty) {
      throw new AppError({
        message: "Verification code not found",
        statusCode: 404,
      });
    } else {
      await db
        .collection("verification")
        .doc(foundEmailVerification.docs[0].id)
        .delete();

      //find or get user
      let userRef = db.collection("user");
      let foundUser;

      try {
        foundUser = await userRef
          .where("email", "==", payload.identifier)
          .limit(1)
          .get();
      } catch (err) {
        console.log(err);
      }

      if (!foundUser || foundUser.empty) {
        foundUser = await db
          .collection("user")
          .add({ email: payload.identifier });
      }

      const token = generateAToken({
        userId: foundUser.id,
        email: payload.identifier,
      });

      return token;
    }
  };

  static githubAuth = async (payload) => {
    const decoded = await verifyFirebaseToken(payload.token);

    const tokenVal = {
      email: decoded.email,
      name: decoded.name ?? "",
      provider: decoded.firebase.sign_in_provider,
    };

    let userRef = db.collection("user");
    let foundUser;

    try {
      foundUser = await userRef
        .where("email", "==", tokenVal.email)
        .where("name", "==", tokenVal.name)
        .where("provider", "==", tokenVal.provider)
        .limit(1)
        .get();
    } catch (err) {
      console.log(err);
    }

    if (!foundUser || foundUser.empty) {
      foundUser = await db.collection("user").add(tokenVal);
    }

    const token = generateAToken({
      userId: foundUser.id,
      ...tokenVal,
    });

    return token;
  };
}

module.exports = AuthService;
