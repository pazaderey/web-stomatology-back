/**
 *
 */
export interface Review {
    name: string;
    job: string;
    text: string;
}

/**
 *
 */
export interface CreateReview extends Review {
    email: string;
}
