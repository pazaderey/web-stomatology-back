import { Route, Post, Get, Body, Controller, OperationId } from "tsoa";
import { CreateReview, Review } from "./review";
import ReviewService from "./review-service";

/**
 *
 */
@Route("reviews")
export class ReviewController extends Controller {
    /**
     *
     */
    private readonly reviewService = new ReviewService();

    /**
     * @summary Send review on moderation to post it
     * @param review Review to post
     */
    @OperationId("addReview")
    @Post()
    async addReview(@Body() review: CreateReview): Promise<void> {
        this.setStatus(201);
        await this.reviewService.addReview(review);
    }

    /**
     * @summary Get all reviews from database
     * @returns Array of reviews
     */
    @OperationId("getReviews")
    @Get()
    async getReviews(): Promise<Review[]> {
        return this.reviewService.getReviews();
    }
}
