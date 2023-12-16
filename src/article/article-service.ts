import { Article, ArticleModel, UpdateArticle } from "./schemas";

export default class ArticleService {
    /**
     *
     */
    private static instance?: ArticleService;

    /**
     *
     */
    private constructor() {}

    /**
     *
     * @returns
     */
    public static getInstance(): ArticleService {
        if (ArticleService.instance === undefined) {
            ArticleService.instance = new ArticleService();
        }

        return ArticleService.instance;
    }

    /**
     *
     * @returns
     */
    async getArticles() {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] ArticleService.getArticles",
        );
        return ArticleModel.find();
    }

    /**
     *
     * @param id
     * @returns
     */
    async getArticleById(id: string) {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] ArticleService.getArticleById with id: " +
                id,
        );
        return ArticleModel.findById(id);
    }

    /**
     *
     * @param article
     * @returns
     */
    async addArticle(article: Article) {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] ArticleService.addArticle with article: " +
                JSON.stringify(article),
        );
        const newArticle = new ArticleModel(article);
        return (await newArticle.save()).id as string;
    }

    /**
     *
     * @param articleId
     * @returns
     */
    async removeArticle(articleId: string) {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] ArticleService.removeArticle with id: " +
                articleId,
        );
        return ArticleModel.deleteOne({ _id: articleId });
    }

    /**
     *
     * @param article
     * @returns
     */
    async updateArticle(article: UpdateArticle) {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] ArticleService.updateArticle with article: " +
                JSON.stringify(article),
        );
        const exists = await ArticleModel.findById(article.id);
        if (exists === null) {
            return null;
        }
        if (article.authors) {
            exists.authors = article.authors;
        }
        if (article.title) {
            exists.title = article.title;
        }
        if (article.date) {
            exists.date = article.date;
        }
        if (article.link) {
            exists.link = article.link;
        }
        return exists.save();
    }
}
