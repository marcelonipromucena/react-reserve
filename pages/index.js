import React from 'react';
import ProductList from '../components/Index/ProductList';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

function Home({ products }) {
  return <ProductList products={products} />;
}

Home.getInitialProps = async (ctx) => {
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);
  return { products: response.data };
};
export default Home;
