import jwt from "jsonwebtoken";

export default class Helpers {
  isDefinedWithContent(item) {
    if (typeof item !== "undefined" && item && item !== "" && item !== null) {
      if (item.constructor === Array && item.length > 0) {
        return true;
      } else if (item.constructor === Array && item.length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  parseAuthHeader(str) {
    console.info("parseAuthHeader", str);
    const credentials = Buffer.from(str.split("Basic ")[1], "base64").toString(
      "ascii"
    );
    return credentials.split(":");
  }

  createJWT(data) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const jwtData = {
      time: Date(),
      ...data,
    };
    const jwtOptions = {
      expiresIn: "7d",
    };

    const token = jwt.sign(jwtData, jwtSecretKey, jwtOptions);

    return token;
  }

  async emailToUsername(email) {
    // const { nanoid } = await import("nanoid");

    const emailUsername = email.split("@")[0];
    // const pin = nanoid(10);
    const generatedUsername = emailUsername + "-";
    //+ pin;

    return generatedUsername;
  }
}
