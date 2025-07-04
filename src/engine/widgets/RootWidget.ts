import { FrameWidget } from "./Frame";

export class RootWidget extends FrameWidget {
    public constructor(name: string) {
        super(name);
        this.Visible = false;
    }

    public override Destroy(): void {
        // Cannot destroy the root widget
    }

    protected override computeAbsolute(): void {
        // The root widget will always be at 0,0 and be the full size of the screen
        this._absolutePosition = { X: 0, Y: 0 };
        this._absoluteSize = {
            X: love.graphics.getWidth(),
            Y: love.graphics.getHeight(),
        };
    } 
}
