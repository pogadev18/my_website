import { InferGetStaticPropsType } from 'next';
import PageWrapper from '@/root/components/pageWrapper/PageWrapper';
import Link from 'next/link';

export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
}

function ProductsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { products } = props;
  return (
    <PageWrapper>
      <h1>Products</h1>
      <ul>
        {products.map((product: IProduct) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}

export default ProductsPage;

export const getStaticProps = async () => {
  console.log('Generating / regenerating productsList');
  const data = await fetch('http://localhost:4000/products');
  const products = await data.json();

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};
