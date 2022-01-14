import client from "../utils/client";
import { API_ROUTES } from "../constants/api-routes";

export async function getAllArticles() {
  return client(API_ROUTES.ARTICLES_ROUTE);
}
