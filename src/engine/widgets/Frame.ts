import { AGuiObject } from "./GuiObject";

export class FrameWidget extends AGuiObject implements Frame {
    protected static DefaultProperties = {
        ...AGuiObject.DefaultProperties,
    };

    public constructor(name: string) {
        super(name, "Frame");
    }

    public Draw(): void {
        if (!this.Visible) return;
        const c = this.BackgroundColor3;
        love.graphics.setColor(c.R, c.G, c.B, 1 - this.BackgroundTransparency);
        love.graphics.rectangle(
            "fill",
            this.AbsolutePosition.X,
            this.AbsolutePosition.Y,
            this.AbsoluteSize.X,
            this.AbsoluteSize.Y,
        );
    }
}