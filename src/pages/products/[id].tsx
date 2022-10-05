import { useRouter } from 'next/router';

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

function Product(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { product } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        {product.id} | {product.title} | {product.price}
      </h2>
      <p>{product.description}</p>
    </div>
  );
}

export default Product;

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const response = await fetch(`http://localhost:4000/products/${params?.id}`);
  const product = await response.json();
  console.log(`Generating page for /products/${params?.id}`);

  return {
    props: {
      product,
    },
    // revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: true,
  };
}
