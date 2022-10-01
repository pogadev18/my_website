import { InferGetStaticPropsType } from 'next';
import PageWrapper from '@/root/components/pageWrapper/PageWrapper';
import Link from 'next/link';

export interface IArticle {
  userId: string;
  id: number;
  title: string;
  body: string;
}

export async function getStaticProps() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const articles: IArticle[] = await data.json();

  return {
    props: {
      articles,
    },
  };
}

function ArticlesPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { articles } = props;

  return (
    <PageWrapper>
      <h1>Articles</h1>
      {articles.map((article) => (
        <h3 key={article.id}>
          <Link href={`articles/${article.id}`}>{article.title}</Link>
        </h3>
      ))}
    </PageWrapper>
  );
}

export default ArticlesPage;
