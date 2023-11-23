import { Route, Post, Get, Body, Controller, Security } from "tsoa";
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
     *
     * @param review
     */
    @Security("jwt")
    @Post()
    async addReview(@Body() review: CreateReview): Promise<void> {
        this.setStatus(201);
        await this.reviewService.addReview(review);
    }

    /**
     *
     * @returns
     */
    @Security("jwt")
    @Get()
    async getReviews(): Promise<Review[]> {
        return this.reviewService.getReviews();
    }
}
