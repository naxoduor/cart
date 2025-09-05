import { getAllAddresses, createAddressInDB } from "../db/address.js";
export const  getAddresses = async (req, res) => {
    try {
        const addresses = await getAllAddresses();
        res.status(200).json(addresses);
    } catch (error){
        res.status(500).json({ error: 'Failed to fetch addresses' });
    }
}

export const createAddress = async (req, res) => {
  console.log("create address from api", req)
  try {
    const {name, phone, address, email, order_id} = req.body
    const newAddress = await createAddressInDB(name, phone, address, email, order_id)
    res.status(201).json(newAddress)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create address' });
  }
  
}

export const test = async (req, res) => {
  return res.send("test api")
}
