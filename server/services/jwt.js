import jwt from "jsonwebtoken"
import jwtKey from "./code.js"

const generateSessionToken = (username) => jwt.sign(
  {
    type: "SESSION",
    id: username,
  },
  jwtKey
)

export default generateSessionToken
