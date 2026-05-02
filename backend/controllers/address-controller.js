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
  try {
    const {name, phone, address, email, order_id} = req.body;
    const newAddress = await createAddressInDB(name, phone, address, email, order_id);
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ error: 'Failed to create address' });
  }
}

export const test = async (req, res) => {
  return res.status(200).json({ message: "test api" });
}
