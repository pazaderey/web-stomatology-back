import { Route, Post } from "tsoa";

@Route("detection")
export class DetectionController {
    @Post()
    async detect(): Promise<void> {
        return;
    }
}
