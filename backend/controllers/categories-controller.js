import {findAllCategories,findAllCategoriesByDepartmentId,findTotalProductsByCategoryId,findProductsByCategoryId} from "../db/categories.js";


export const findAllCats = async (req, res) => {
    try {
      const categories = await findAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching all categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
}

export const findAllCategoriesByDepId = async (req, res) => {
    try {
      const categories = await findAllCategoriesByDepartmentId(req.params.department_id);
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories by department ID:', error);
      res.status(500).json({ error: 'Failed to fetch categories by department' });
    }
}

export const findTotalProductsByCatId = async (req, res) => {
    try {
      const totalProducts = await findTotalProductsByCategoryId(req.params.category_id);
      res.status(200).json({ totalProducts });
    } catch (error) {
      console.error('Error fetching total products by category ID:', error);
      res.status(500).json({ error: 'Failed to fetch total products' });
    }
}

export const findProdsByCatId = async (req, res) => {
    const { category_id, productsPerPage, startItem } = req.body.params;
    try {
      const products = await findProductsByCategoryId(category_id, productsPerPage, startItem);
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products by category ID:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
}



