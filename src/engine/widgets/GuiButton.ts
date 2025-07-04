import { Event } from "../core/Event";
import { AGuiObject } from "./GuiObject";

export class GuiButtonWidget extends AGuiObject implements GuiButton {
    private _autoButtonColor = true;
    private _modal = false;
    private _selected = false;
    private _style: any = undefined;

    protected static DefaultProperties = {
        ...AGuiObject.DefaultProperties,
        _autoButtonColor: true,
        _modal: false,
        _selected: false,
        _style: undefined as any,
    };

    public readonly Activated = new Event<(inputObject: InputObject, clickCount: number) => void>();
    public readonly MouseButton1Click = new Event<() => void>();
    public readonly MouseButton1Down = new Event<(x: number, y: number) => void>();
    public readonly MouseButton1Up = new Event<(x: number, y: number) => void>();
    public readonly MouseButton2Click = new Event<() => void>();
    public readonly MouseButton2Down = new Event<(x: number, y: number) => void>();
    public readonly MouseButton2Up = new Event<(x: number, y: number) => void>();

    public constructor(name: string) {
        super(name, "GuiButton");
    }

    public get AutoButtonColor(): boolean {
        return this._autoButtonColor;
    }
    public set AutoButtonColor(v: boolean) {
        this._autoButtonColor = v;
        this.signalPropertyChanged("AutoButtonColor");
    }

    public get Modal(): boolean {
        return this._modal;
    }
    public set Modal(v: boolean) {
        this._modal = v;
        this.signalPropertyChanged("Modal");
    }

    public get Selected(): boolean {
        return this._selected;
    }
    public set Selected(v: boolean) {
        this._selected = v;
        this.signalPropertyChanged("Selected");
    }

    public get Style(): any {
        return this._style;
    }
    public set Style(v: any) {
        this._style = v;
        this.signalPropertyChanged("Style");
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
