import { Event } from "../core/Event";
import { AGuiBase } from "./GuiBase";

export abstract class AGuiObject extends AGuiBase implements GuiObject {
    // properties
    private _anchorPoint: Vector2 = { X: 0, Y: 0 };
    private _automaticSize: AutomaticSize = "None";
    private _backgroundColor3: Color3 = { R: 1, G: 1, B: 1 };
    private _backgroundTransparency = 0;
    private _borderColor3: Color3 = { R: 0, G: 0, B: 0 };
    private _borderMode: BorderMode = "Outline";
    private _borderSizePixel = 1;
    private _clipsDescendants = false;
    private _draggable = false;
    private _layoutOrder = 0;
    private _position: UDim2 = { X: { Scale: 0, Pixel: 0 }, Y: { Scale: 0, Pixel: 0 } };
    private _rotation = 0;
    private _selectable = false;
    private _selectionImageObject: GuiObject | undefined = undefined;
    private _selectionOrder = 0;
    private _size: UDim2 = { X: { Scale: 0, Pixel: 0 }, Y: { Scale: 0, Pixel: 0 } };
    private _sizeConstraint: SizeConstraint = "RelativeXY";
    private _transparency = 0;
    private _visible = true;
    private _zIndex = 0;

    // events
    public readonly DragBegin = new Event<{ initialPosition: UDim2 }>();
    public readonly DragStopped = new Event<{ x: number; y: number }>();
    public readonly InputBegan = new Event<{ input: InputObject }>();
    public readonly InputChanged = new Event<{ input: InputObject }>();
    public readonly InputEnded = new Event<{ input: InputObject }>();
    public readonly MouseEnter = new Event<{ x: number; y: number }>();
    public readonly MouseLeave = new Event<{ x: number; y: number }>();
    public readonly MouseMoved = new Event<{ x: number; y: number }>();
    public readonly MouseWheelBackward = new Event<{ x: number; y: number }>();
    public readonly MouseWheelForward = new Event<{ x: number; y: number }>();

    protected constructor(name: string, className: string, parent?: Instance) {
        super(name, className, parent);
    }

    // property accessors
    public get AnchorPoint(): Vector2 {
        return this._anchorPoint;
    }
    public set AnchorPoint(v: Vector2) {
        this._anchorPoint = v;
        this.signalPropertyChanged("AnchorPoint");
    }

    public get AutomaticSize(): AutomaticSize {
        return this._automaticSize;
    }
    public set AutomaticSize(v: AutomaticSize) {
        this._automaticSize = v;
        this.signalPropertyChanged("AutomaticSize");
    }

    public get BackgroundColor3(): Color3 {
        return this._backgroundColor3;
    }
    public set BackgroundColor3(v: Color3) {
        this._backgroundColor3 = v;
        this.signalPropertyChanged("BackgroundColor3");
    }

    public get BackgroundTransparency(): number {
        return this._backgroundTransparency;
    }
    public set BackgroundTransparency(v: number) {
        this._backgroundTransparency = v;
        this.signalPropertyChanged("BackgroundTransparency");
    }

    public get BorderColor3(): Color3 {
        return this._borderColor3;
    }
    public set BorderColor3(v: Color3) {
        this._borderColor3 = v;
        this.signalPropertyChanged("BorderColor3");
    }

    public get BorderMode(): BorderMode {
        return this._borderMode;
    }
    public set BorderMode(v: BorderMode) {
        this._borderMode = v;
        this.signalPropertyChanged("BorderMode");
    }

    public get BorderSizePixel(): number {
        return this._borderSizePixel;
    }
    public set BorderSizePixel(v: number) {
        this._borderSizePixel = v;
        this.signalPropertyChanged("BorderSizePixel");
    }

    public get ClipsDescendants(): boolean {
        return this._clipsDescendants;
    }
    public set ClipsDescendants(v: boolean) {
        this._clipsDescendants = v;
        this.signalPropertyChanged("ClipsDescendants");
    }

    public get Draggable(): boolean {
        return this._draggable;
    }
    public set Draggable(v: boolean) {
        this._draggable = v;
        this.signalPropertyChanged("Draggable");
    }

    public get LayoutOrder(): number {
        return this._layoutOrder;
    }
    public set LayoutOrder(v: number) {
        this._layoutOrder = v;
        this.signalPropertyChanged("LayoutOrder");
    }

    public get Position(): UDim2 {
        return this._position;
    }
    public set Position(v: UDim2) {
        this._position = v;
        this.signalPropertyChanged("Position");
    }

    public get Rotation(): number {
        return this._rotation;
    }
    public set Rotation(v: number) {
        this._rotation = v;
        this.signalPropertyChanged("Rotation");
    }

    public get Selectable(): boolean {
        return this._selectable;
    }
    public set Selectable(v: boolean) {
        this._selectable = v;
        this.signalPropertyChanged("Selectable");
    }

    public get SelectionImageObject(): GuiObject | undefined {
        return this._selectionImageObject;
    }
    public set SelectionImageObject(v: GuiObject | undefined) {
        this._selectionImageObject = v;
        this.signalPropertyChanged("SelectionImageObject");
    }

    public get SelectionOrder(): number {
        return this._selectionOrder;
    }
    public set SelectionOrder(v: number) {
        this._selectionOrder = v;
        this.signalPropertyChanged("SelectionOrder");
    }

    public get Size(): UDim2 {
        return this._size;
    }
    public set Size(v: UDim2) {
        this._size = v;
        this.signalPropertyChanged("Size");
    }

    public get SizeConstraint(): SizeConstraint {
        return this._sizeConstraint;
    }
    public set SizeConstraint(v: SizeConstraint) {
        this._sizeConstraint = v;
        this.signalPropertyChanged("SizeConstraint");
    }

    public get Transparency(): number {
        return this._transparency;
    }
    public set Transparency(v: number) {
        this._transparency = v;
        this.signalPropertyChanged("Transparency");
    }

    public get Visible(): boolean {
        return this._visible;
    }
    public set Visible(v: boolean) {
        this._visible = v;
        this.signalPropertyChanged("Visible");
    }

    public get ZIndex(): number {
        return this._zIndex;
    }
    public set ZIndex(v: number) {
        this._zIndex = v;
        this.signalPropertyChanged("ZIndex");
    }

    // tween methods (simple implementation)
    public TweenPosition(
        endPosition: UDim2,
        easingDirection?: EasingDirection,
        easingStyle?: EasingStyle,
        time = 0,
        override = true,
        callback?: (finishedTween: TweenStatus) => void,
    ): boolean {
        this.Position = endPosition;
        if (callback) callback("Completed");
        return true;
    }

    public TweenSize(
        endSize: UDim2,
        easingDirection?: EasingDirection,
        easingStyle?: EasingStyle,
        time = 0,
        override = true,
        callback?: (finishedTween: TweenStatus) => void,
    ): boolean {
        this.Size = endSize;
        if (callback) callback("Completed");
        return true;
    }

    public TweenSizeAndPosition(
        endSize: UDim2,
        endPosition: UDim2,
        easingDirection?: EasingDirection,
        easingStyle?: EasingStyle,
        time = 0,
        override = true,
        callback?: (finishedTween: TweenStatus) => void,
    ): boolean {
        this.Size = endSize;
        this.Position = endPosition;
        if (callback) callback("Completed");
        return true;
    }
}
