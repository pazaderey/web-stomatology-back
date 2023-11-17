import { CreateReview, Review } from "./review";
import { open } from "fs/promises";
import path from "path";

/**
 *
 */
export default class ReviewService {
    /**
     *
     * @returns
     */
    async getReviews(): Promise<Review[]> {
        const file = await open(
            path.join(__dirname, "../../../src/review/__mockdata__.json"),
        );
        const buffer = await file.readFile("utf-8");

        await file.close();
        return JSON.parse(buffer);
    }

    /**
     *
     * @param review
     * @returns
     */
    async addReview(review: CreateReview): Promise<void> {
        console.log(review);
        return;
    }
}
