import { CreateReview, Review } from "./review";
import { readFileSync } from "fs";
import path from "path";

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
            readFileSync(
                path.join(__dirname, "../../../src/review/__mockdata__.json"),
                { encoding: "utf-8" },
            ),
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
        return;
    }
}
