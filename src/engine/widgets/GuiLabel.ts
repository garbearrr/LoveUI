import { AGuiObject } from "./GuiObject";

export class GuiLabelWidget extends AGuiObject implements GuiLabel {
    protected static DefaultProperties = {
        ...AGuiObject.DefaultProperties,
    };

    public constructor(name: string) {
        super(name, "GuiLabel");
    }

    public Draw(): void {
        if (!this.Visible) return;

        love.graphics.push();
        love.graphics.translate(
            this.AbsolutePosition.X + this.AbsoluteSize.X / 2,
            this.AbsolutePosition.Y + this.AbsoluteSize.Y / 2,
        );
        love.graphics.rotate(this.AbsoluteRotation * (Math.PI / 180));
        love.graphics.translate(-this.AbsoluteSize.X / 2, -this.AbsoluteSize.Y / 2);

        const totalAlpha = 1 - Math.min(1, this.BackgroundTransparency + this.Transparency);
        const c = this.BackgroundColor3;
        love.graphics.setColor(c.R, c.G, c.B, totalAlpha);
        love.graphics.rectangle("fill", 0, 0, this.AbsoluteSize.X, this.AbsoluteSize.Y);

        if (this.BorderSizePixel > 0) {
            const bc = this.BorderColor3;
            love.graphics.setColor(bc.R, bc.G, bc.B, totalAlpha);
            love.graphics.setLineWidth(this.BorderSizePixel);
            let off = 0;
            if (this.BorderMode === "Inset") {
                off = this.BorderSizePixel;
            } else if (this.BorderMode === "Middle") {
                off = this.BorderSizePixel / 2;
            } else {
                off = 0;
            }
            love.graphics.rectangle(
                "line",
                -off / 2,
                -off / 2,
                this.AbsoluteSize.X + off,
                this.AbsoluteSize.Y + off,
            );
        }

        love.graphics.pop();
    }
}
