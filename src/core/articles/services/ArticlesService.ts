import Article from "../models/Article.ts";
import axios from "axios";
import ArticleApi from "../models/ArticleApi.ts";
import CONFIGURATION from "../../../configuration/config.ts";

export async function getArticles(): Promise<Article[]> {
  const data = await axios<ArticleApi[]>({
    url: `${CONFIGURATION.API_URL}/api/articles/`,
    method: "GET",
  });
  return data.data.map(
    (item) =>
      new Article({ id: item.id, title: item.title, content: item.content }),
  );
}

export async function createArticle(
  title: string,
  content: string,
): Promise<void> {
  await axios<void>({
    url: `${CONFIGURATION.API_URL}/api/articles/`,
    method: "POST",
    data: { title, content },
  });
}
