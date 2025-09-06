import express from "express";
const router = express.Router();
import {createAddress, getAddresses, test} from '../controllers/address-controller.js'


router.get("/", getAddresses);

router.post("/createAddress", createAddress);

router.get("/createAddress", test)

export default router