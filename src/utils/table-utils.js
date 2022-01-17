export function mapArticleDtoToTableRow(article, i, page, perPage) {
  return {
    index: i + 1 + (page - 1) * perPage,
    slug: article.slug,
    Title: article.title,
    Author: `@${article.author.username}`,
    Tags: article.tagList.join(", "),
    Excerpt: article.body.slice(0, 20),
    Created: new Intl.DateTimeFormat("US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(article.createdAt)),
  };
}

export const tableFields = [
  { key: "index", label: "#" },
  "Title",
  "Author",
  "Tags",
  "Excerpt",
  "Created",
  { key: "actions", label: "" },
];
