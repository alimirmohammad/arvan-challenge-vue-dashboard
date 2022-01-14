export function mapArticleDtoToTableRow(article, index) {
  return {
    "#": index + 1,
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
