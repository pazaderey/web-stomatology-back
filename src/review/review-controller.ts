import { Route, Post } from "tsoa";

@Route("reviews")
export class ReviewController {
    @Post()
    async addView(): Promise<void> {
        return;
    }
}
