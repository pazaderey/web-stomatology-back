import { CreateReview, Review } from "./review";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const FILE_PATH = path.join(__dirname, "../../../src/review/__mockdata__.json");

/**
 *
 */
export default class ReviewService {
    /**
     *
     */
    private readonly reviews: Review[];

    /**
     *
     */
    constructor() {
        this.reviews = JSON.parse(
            readFileSync(FILE_PATH, { encoding: "utf-8" }),
        );
    }
    /**
     *
     * @returns
     */
    async getReviews(): Promise<Review[]> {
        return this.reviews;
    }

    /**
     *
     * @param review
     * @returns
     */
    async addReview(createReview: CreateReview): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email: _, ...review } = createReview;

        this.reviews.push(review);
        writeFileSync(FILE_PATH, JSON.stringify(this.reviews), {
            encoding: "utf-8",
        });
    }
}
