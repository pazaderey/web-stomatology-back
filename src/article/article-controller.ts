import {
    Route,
    Get,
    Controller,
    OperationId,
    Response,
    Security,
    Post,
    Delete,
    Patch,
    Path,
    Body,
} from "tsoa";
import ArticleService from "./article-service";
import { Article } from "./schemas";

/**
 *
 */
@Route("articles")
export class ArticleController extends Controller {
    /**
     *
     */
    private readonly articleService = ArticleService.getInstance();

    /**
     * @summary Get all articles from database
     * @returns Array of articles
     */
    @Response(200, "Sent articles")
    @OperationId("getArticles")
    @Get()
    async getArticles() {
        return this.articleService.getArticles();
    }

    /**
     * @summary Get one article by id
     * @param id Article ID
     * @returns Found Article
     */
    @Response(200, "Sent articles")
    @Response(404, "Article not found")
    @OperationId("getArticle")
    @Security("jwt", ["admin"])
    @Get("{id}")
    async getArticle(@Path("id") id: string): Promise<Article> {
        const article = await this.articleService.getArticleById(id);
        if (article === null) {
            this.setStatus(404);
            throw new Error("Article not found, id: " + id);
        }
        return {
            title: article.title,
            authors: article.authors,
            date: article.date,
            link: article.link,
        };
    }

    /**
     * Create one article
     * @param article Article schema
     * @returns New article's id
     */
    @Response(201, "Created")
    @OperationId("addArticle")
    @Security("jwt", ["admin"])
    @Post()
    async addArticle(@Body() article: Article) {
        return this.articleService.addArticle(article);
    }

    /**
     * Delete one article by id
     * @param id Article id
     * @returns Delete result
     */
    @Response(200, "Deleted")
    @OperationId("removeArticle")
    @Security("jwt", ["admin"])
    @Delete("{id}")
    async removeArticle(@Path("id") id: string) {
        return this.articleService.removeArticle(id);
    }

    /**
     * Update one article
     * @param id Article id
     * @param articleParts Article schema
     * @returns void
     */
    @Response(204, "Updated")
    @OperationId("updateArticle")
    @Security("jwt", ["admin"])
    @Patch("{id}")
    async updateArticle(
        @Path("id") id: string,
        @Body() articleParts: Partial<Article>,
    ) {
        const newArticle = { ...articleParts, id };
        await this.articleService.updateArticle(newArticle);
    }
}
