import * as authServices from "../services/auth.js";
import * as emailServices from "../services/emailService.js";
import { User } from "../models/User.js";
import {v4 as uuidv4} from "uuid";


export const registration = async (req, res) => {
  const {email, password, name} = req.body;

  const user = await User.create({email, password, name})
  const activationToken = uuidv4();

  await emailServices.sendActivationLink(email, activationToken)
  // if (!'') {
  //   res.sendStatus(404);
  //   return;
  // }

  res.send({data: user.id});
}