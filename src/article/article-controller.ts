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
     *
     * @param id
     * @returns
     */
    @Response(200, "Sent articles")
    @OperationId("getArticle")
    @Security("jwt", ["admin"])
    @Get("{id}")
    async getArticle(@Path("id") id: string): Promise<Article> {
        const article = await this.articleService.getArticleById(id);
        if (article === null) {
            throw new Error("Article not found, id: " + id);
        }
        return {
            title: article.title,
            authors: article.authors,
            date: article.date,
            text: article.text,
        };
    }

    /**
     *
     * @param article
     * @returns
     */
    @Response(201, "Created")
    @OperationId("addArticle")
    @Security("jwt", ["admin"])
    @Post()
    async addArticle(article: Article) {
        return this.articleService.addArticle(article);
    }

    /**
     *
     * @param id
     * @returns
     */
    @Response(200, "Deleted")
    @OperationId("removeArticle")
    @Security("jwt", ["admin"])
    @Delete("{id}")
    async removeArticle(@Path("id") id: string) {
        return this.articleService.removeArticle(id);
    }

    /**
     *
     * @param id
     * @param articleParts
     */
    @Response(204, "Updated")
    @OperationId("updateArticle")
    @Security("jwt", ["admin"])
    @Patch("{id}")
    async updateArticle(
        @Path("id") id: string,
        articleParts: Partial<Article>,
    ) {
        const newArticle = { ...articleParts, id };
        await this.articleService.updateArticle(newArticle);
    }
}
