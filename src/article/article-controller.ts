import { Route, Get, Controller, OperationId, Response } from "tsoa";
import ArticleService from "./article-service";

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
}
