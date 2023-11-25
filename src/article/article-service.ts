import Article from "./article";
import { readFileSync } from "fs";
import path from "path";

const FILE_PATH = path.join(
    __dirname,
    "../../../src/article/__mockdata__.json",
);

export default class ArticleService {
    private readonly articles: Article[];
    /**
     *
     */
    constructor() {
        this.articles = JSON.parse(
            readFileSync(FILE_PATH, { encoding: "utf-8" }),
        );
    }
    /**
     *
     * @returns
     */
    async getArticles(): Promise<Article[]> {
        return this.articles;
    }
}
