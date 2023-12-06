import { ArticleModel } from "./schemas";

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
}
