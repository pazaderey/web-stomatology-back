import { Route, Get, Controller, OperationId, Response } from "tsoa";
import Article from "./article";
import ArticleService from "./article-service";

/**
 *
 */
@Route("articles")
export class ArticleController extends Controller {
    /**
     *
     */
    private readonly articleService = new ArticleService();

    /**
     * @summary Get all reviews from database
     * @returns Array of reviews
     */
    @Response(200, "Sent articles")
    @OperationId("getArticles")
    @Get()
    async getArticles(): Promise<Article[]> {
        return this.articleService.getArticles();
    }
}
