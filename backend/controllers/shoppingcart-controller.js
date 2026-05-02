import express from "express";
import { generateUniqueId, addItemToCart, findCartById, updateCartById, removeProductFromCart } from "../db/shoppingcart.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Shopping cart API is working" });
});

export const generateId = async (req, res) => {
  try {
    const uniqueId = await generateUniqueId();
    res.status(200).json({ cartId: uniqueId });
  } catch (error) {
    console.error('Error generating unique ID:', error);
    res.status(500).json({ error: 'Failed to generate cart ID' });
  }
};

export const add = (req, res) => {
  res.status(200).json({ message: "success" });
};

export const addItem = async (req, res) => {
  const { cartId, productId, quantity } = req.body.params;
  try {
    const result = await addItemToCart(cartId, productId, quantity);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

export const findCart = async (req, res) => {
  try {
    const cart = await findCartById(req.params.cart_id);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error finding cart:', error);
    res.status(500).json({ error: 'Failed to find cart' });
  }
};

export const updateCart = async (req, res) => {
  const { joined_ids } = req.params;
  const arrc = joined_ids.split("&");
  const item_id = arrc[0];
  const cart_id = arrc[arrc.length - 1];
  const { quantity } = req.body.params;
  
  try {
    const result = await updateCartById(item_id, cart_id, quantity);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

export const removeProduct = async (req, res) => {
  const { joined_ids } = req.params;
  const arrc = joined_ids.split("&");
  const item_id = arrc[0];
  const cart_id = arrc[arrc.length - 1];
  
  try {
    const result = await removeProductFromCart(item_id, cart_id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Failed to remove product from cart' });
  }
};

export default router;
