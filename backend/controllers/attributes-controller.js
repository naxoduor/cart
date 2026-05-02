import { findAttributeById } from '../db/attributes.js'

export const findAttrById = async (req, res) => {
    try {
        const attribute = await findAttributeById(req.params.product_id);
        res.status(200).json(attribute);
    } catch (error) {
        console.error('Error fetching attribute by ID:', error);
        res.status(500).json({ error: 'Failed to fetch attribute' });
    }
}