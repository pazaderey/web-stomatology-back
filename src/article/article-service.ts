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
        return ArticleModel.find();
    }

    /**
     *
     * @param id
     * @returns
     */
    async getArticleById(id: string) {
        return ArticleModel.findById(id);
    }

    /**
     *
     * @param article
     * @returns
     */
    async addArticle(article: Article) {
        const newArticle = new ArticleModel(article);
        return (await newArticle.save()).id as string;
    }

    /**
     *
     * @param articleId
     * @returns
     */
    async removeArticle(articleId: string) {
        return ArticleModel.deleteOne({ _id: articleId });
    }

    /**
     *
     * @param article
     * @returns
     */
    async updateArticle(article: UpdateArticle) {
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
        if (article.text) {
            exists.text = article.text;
        }
        return exists.save();
    }
}
