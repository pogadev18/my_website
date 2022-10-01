import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { IArticle } from '@/root/pages/articles/index';

export const getStaticProps = async (context: GetStaticPropsContext<{ articleId: string }>) => {
  const articleId = context?.params?.articleId as string;

  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${articleId}`);
  const article: IArticle = await data.json();

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const articles: IArticle[] = await data.json();

  const paths = articles.map((article: IArticle) => ({
    params: {
      articleId: `${article.id}`,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

function Article(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { article } = props;
  return <h2>Article: {article.title}</h2>;
}

export default Article;
