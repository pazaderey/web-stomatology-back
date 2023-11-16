import { Route, Post, Get } from "tsoa";
import { Review } from "./review";

@Route("reviews")
export class ReviewController {
    @Post()
    async addReview(): Promise<void> {
        return;
    }

    @Get()
    async getReviews(): Promise<Review[]> {
        return [];
    }
}
