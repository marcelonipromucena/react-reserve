import connectDb from '../../utils/connectDb';
import Product from '../../models/Product';

connectDb();

export default async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(products);
};
