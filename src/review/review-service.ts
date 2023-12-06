import { CreateReview, ReviewModel } from "./schemas";

/**
 *
 */
export default class ReviewService {
    /**
     *
     */
    private static instance?: ReviewService;

    /**
     *
     */
    private constructor() {}

    /**
     *
     * @returns
     */
    public static getInstance() {
        if (ReviewService.instance === undefined) {
            ReviewService.instance = new ReviewService();
        }

        return ReviewService.instance;
    }

    /**
     *
     * @returns
     */
    async getReviews() {
        return ReviewModel.find();
    }

    /**
     *
     * @param review
     * @returns
     */
    async addReview(createReview: CreateReview) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email: _, ...review } = createReview;

        const newReview = new ReviewModel(review);
        return newReview.save();
    }
}
