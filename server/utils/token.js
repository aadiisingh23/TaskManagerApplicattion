const crypto = require("crypto");

const getSecret = () => process.env.JWT_SECRET || "replace-this-secret-in-env";
const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
const decode = (value) => JSON.parse(Buffer.from(value, "base64url").toString("utf8"));

const signToken = (payload) => {
  const header = { alg: "HS256", typ: "JWT" };
  const body = { ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 };
  const unsigned = encode(header) + "." + encode(body);
  const signature = crypto.createHmac("sha256", getSecret()).update(unsigned).digest("base64url");

  return unsigned + "." + signature;
};

const verifyToken = (token) => {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    throw new Error("Invalid token");
  }

  const expectedSignature = crypto
    .createHmac("sha256", getSecret())
    .update(header + "." + payload)
    .digest("base64url");

  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    throw new Error("Invalid token");
  }

  const decoded = decode(payload);

  if (decoded.exp < Date.now()) {
    throw new Error("Token expired");
  }

  return decoded;
};

module.exports = { signToken, verifyToken };
