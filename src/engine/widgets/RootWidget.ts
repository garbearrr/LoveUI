import { FrameWidget } from "./Frame";

export class RootWidget extends FrameWidget {
    public constructor(name: string) {
        super(name);
        this.Visible = false;
    }
}
