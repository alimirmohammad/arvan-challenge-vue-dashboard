import client from "../utils/client";
import { API_ROUTES } from "../constants/api-routes";

export async function getAllArticles() {
  return client(API_ROUTES.ARTICLES_ROUTE);
}

export async function getAllTags() {
  return client(API_ROUTES.TAGS_ROUTE);
}

export async function getArticleBySlug(slug) {
  return client(API_ROUTES.ARTICLE_BY_SLUG_ROUTE(slug));
}

export async function writeArticle({
  title,
  description,
  body,
  tagList,
  slug,
}) {
  const payload = {
    article: {
      title,
      description,
      body,
      tagList,
    },
  };
  return client(
    slug ? API_ROUTES.ARTICLE_BY_SLUG_ROUTE(slug) : API_ROUTES.ARTICLES_ROUTE,
    {
      method: slug ? "PUT" : "POST",
      data: payload,
    }
  );
}

export async function deleteArticle(slug) {
  return client(API_ROUTES.ARTICLE_BY_SLUG_ROUTE(slug), { method: "DELETE" });
}
