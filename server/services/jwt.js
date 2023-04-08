import jwt from "jsonwebtoken"
import jwtKey from "./code.js"

const generateSessionToken = (code) => jwt.sign(
  {
    type: "SESSION",
    id: code,
  },
  jwtKey
)

export default generateSessionToken
