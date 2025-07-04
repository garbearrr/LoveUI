import { AGuiObject } from "./GuiObject";

export class ScrollingFrameWidget extends AGuiObject implements ScrollingFrame {
    private _automaticCanvasSize: AutomaticSize = "None";
    private _bottomImage = "";
    private _canvasPosition: Vector2 = { X: 0, Y: 0 };
    private _canvasSize: UDim2 = { X: { Scale: 0, Pixel: 0 }, Y: { Scale: 0, Pixel: 0 } };
    private _elasticBehavior: any = "WhenScrollable";
    private _horizontalScrollBarInset: any = undefined;
    private _midImage = "";
    private _scrollBarImageColor3: Color3 = { R: 1, G: 1, B: 1 };
    private _scrollBarImageTransparency = 0;
    private _scrollBarThickness = 10;
    private _scrollingDirection: any = "XY";
    private _scrollingEnabled = true;
    private _topImage = "";
    private _verticalScrollBarInset: any = undefined;
    private _verticalScrollBarPosition: any = "Right";

    private _absoluteCanvasSize: Vector2 = { X: 0, Y: 0 };
    private _absoluteWindowSize: Vector2 = { X: 0, Y: 0 };

    protected static DefaultProperties = {
        ...AGuiObject.DefaultProperties,
        _automaticCanvasSize: "None" as AutomaticSize,
        _bottomImage: "",
        _canvasPosition: { X: 0, Y: 0 },
        _canvasSize: { X: { Scale: 0, Pixel: 0 }, Y: { Scale: 0, Pixel: 0 } },
        _elasticBehavior: "WhenScrollable" as any,
        _horizontalScrollBarInset: undefined as any,
        _midImage: "",
        _scrollBarImageColor3: { R: 1, G: 1, B: 1 },
        _scrollBarImageTransparency: 0,
        _scrollBarThickness: 10,
        _scrollingDirection: "XY" as any,
        _scrollingEnabled: true,
        _topImage: "",
        _verticalScrollBarInset: undefined as any,
        _verticalScrollBarPosition: "Right" as any,
        _absoluteCanvasSize: { X: 0, Y: 0 },
        _absoluteWindowSize: { X: 0, Y: 0 },
    };

    public constructor(name: string) {
        super(name, "ScrollingFrame");
    }

    public get AbsoluteCanvasSize(): Vector2 {
        return this._absoluteCanvasSize;
    }
    public get AbsoluteWindowSize(): Vector2 {
        return this._absoluteWindowSize;
    }

    public get AutomaticCanvasSize(): AutomaticSize {
        return this._automaticCanvasSize;
    }
    public set AutomaticCanvasSize(v: AutomaticSize) {
        this._automaticCanvasSize = v;
        this.signalPropertyChanged("AutomaticCanvasSize");
    }

    public get BottomImage(): string {
        return this._bottomImage;
    }
    public set BottomImage(v: string) {
        this._bottomImage = v;
        this.signalPropertyChanged("BottomImage");
    }

    public get CanvasPosition(): Vector2 {
        return this._canvasPosition;
    }
    public set CanvasPosition(v: Vector2) {
        this._canvasPosition = v;
        this.signalPropertyChanged("CanvasPosition");
    }

    public get CanvasSize(): UDim2 {
        return this._canvasSize;
    }
    public set CanvasSize(v: UDim2) {
        this._canvasSize = v;
        this.signalPropertyChanged("CanvasSize");
    }

    public get ElasticBehavior(): any {
        return this._elasticBehavior;
    }
    public set ElasticBehavior(v: any) {
        this._elasticBehavior = v;
        this.signalPropertyChanged("ElasticBehavior");
    }

    public get HorizontalScrollBarInset(): any {
        return this._horizontalScrollBarInset;
    }
    public set HorizontalScrollBarInset(v: any) {
        this._horizontalScrollBarInset = v;
        this.signalPropertyChanged("HorizontalScrollBarInset");
    }

    public get MidImage(): string {
        return this._midImage;
    }
    public set MidImage(v: string) {
        this._midImage = v;
        this.signalPropertyChanged("MidImage");
    }

    public get ScrollBarImageColor3(): Color3 {
        return this._scrollBarImageColor3;
    }
    public set ScrollBarImageColor3(v: Color3) {
        this._scrollBarImageColor3 = v;
        this.signalPropertyChanged("ScrollBarImageColor3");
    }

    public get ScrollBarImageTransparency(): number {
        return this._scrollBarImageTransparency;
    }
    public set ScrollBarImageTransparency(v: number) {
        this._scrollBarImageTransparency = v;
        this.signalPropertyChanged("ScrollBarImageTransparency");
    }

    public get ScrollBarThickness(): number {
        return this._scrollBarThickness;
    }
    public set ScrollBarThickness(v: number) {
        this._scrollBarThickness = v;
        this.signalPropertyChanged("ScrollBarThickness");
    }

    public get ScrollingDirection(): any {
        return this._scrollingDirection;
    }
    public set ScrollingDirection(v: any) {
        this._scrollingDirection = v;
        this.signalPropertyChanged("ScrollingDirection");
    }

    public get ScrollingEnabled(): boolean {
        return this._scrollingEnabled;
    }
    public set ScrollingEnabled(v: boolean) {
        this._scrollingEnabled = v;
        this.signalPropertyChanged("ScrollingEnabled");
    }

    public get TopImage(): string {
        return this._topImage;
    }
    public set TopImage(v: string) {
        this._topImage = v;
        this.signalPropertyChanged("TopImage");
    }

    public get VerticalScrollBarInset(): any {
        return this._verticalScrollBarInset;
    }
    public set VerticalScrollBarInset(v: any) {
        this._verticalScrollBarInset = v;
        this.signalPropertyChanged("VerticalScrollBarInset");
    }

    public get VerticalScrollBarPosition(): any {
        return this._verticalScrollBarPosition;
    }
    public set VerticalScrollBarPosition(v: any) {
        this._verticalScrollBarPosition = v;
        this.signalPropertyChanged("VerticalScrollBarPosition");
    }

    public Update(dt: number): void {
        super.Update(dt);
        this._absoluteWindowSize = this.AbsoluteSize;
        // naive calculation
        this._absoluteCanvasSize = {
            X: this.AbsoluteSize.X,
            Y: this.AbsoluteSize.Y,
        };
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
