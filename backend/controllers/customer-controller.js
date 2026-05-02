import passport from "passport";
import {
  findAllCustomerOrders, findCustomerByEmail, updateCustomer, updatePassword, findCustomerById, updateNewPassword,
} from "../db/customer.js";

import { createToken, hashPassword } from "../token/token.js";

import { sendTokenByEmail } from "../notification/email.js";

export const findCustomerOrders = async (req, res) => {
  try {
    const orders = await findAllCustomerOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching customer orders:', err);
    res.status(500).json({ error: 'Failed to fetch customer orders' });
  }
}

export const login = async (req, res, next) => {
  passport.authenticate("login", (err, customers, info) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (info !== undefined) {
      if (info.message === "bad username") {
        return res.status(401).json({ error: info.message });
      } else {
        return res.status(403).json({ error: info.message });
      }
    } else {
      req.logIn(customers, async () => {
        try {
          const token = await createToken(await findCustomerByEmail(req.body.email));
          res.status(200).json(token);
        } catch (error) {
          console.error('Error creating token:', error);
          res.status(500).json({ error: 'Failed to create token' });
        }
      });
    }
  })(req, res, next);
}


export const register = async (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    if (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (info !== undefined) {
      console.error('Registration info error:', info.message);
      return res.status(403).json({ error: info.message });
    } else {
      req.logIn(user, async () => {
        try {
          const { username, email } = req.body;
          const result = await updateCustomer(username, email);
          res.status(201).json(result);
        } catch (error) {
          console.error('Error updating customer:', error);
          res.status(500).json({ error: 'Failed to register customer' });
        }
      });
    }
  })(req, res, next);
}


export const logout = (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "The user has been logged out" });
  });
}


export const resetpassword = async (req, res, next) => {
  try {
    const customer = await findCustomerByEmail(req.body.email);
    const token = await createToken(customer);
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error in reset password:', err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
}

export const forgotpassword = async (req, res) => {
  try {
    const customer = await findCustomerByEmail(req.body.email);

    if (customer) {
      const token = await createToken(customer);
      const result = await sendTokenByEmail(token);
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Email not found" });
    }
  } catch (err) {
    console.error('Error in forgot password:', err);
    res.status(500).json({ error: "Failed to process password reset request" });
  }
}


export const passwordreset = async (req, res, next) => {
  passport.authenticate("bearer", async (err, customer, info) => {
    if (err) {
      return res.status(401).send(err);
    }
    try {
      const { customer_id, password } = customer.customer;
      const hashedPassword = await hashPassword(password);
      const customerRecord = await findCustomerById(customer_id);
      const result = await updateNewPassword(customerRecord, hashedPassword);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in password reset:', error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  })(req, res, next);
}


export const reset = (req, res, next) => {
  passport.authenticate("bearer", (err, customer, info) => {
    if (err) {
      return res.status(401).send(err);
    }
    res.status(200).json({ message: "Password reset link is valid" });
  })(req, res, next);
}

export const updatePasswordByEmail = async (req, res, next) => {
  passport.authenticate("bearer", async (err, customer, info) => {
    if (err) {
      return res.status(401).send(err);
    }
    try {
      const { password } = req.body;
      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }
      const hashedPassword = await hashPassword(password);
      const result = await updatePassword(customer, hashedPassword);
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: "Failed to update password" });
    }
  })(req, res, next);
}

