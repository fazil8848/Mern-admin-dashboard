import jsonwebtoken from "jsonwebtoken";

export const jwt = (user) => {
  const payload = { user: { id: user._id } };

  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
