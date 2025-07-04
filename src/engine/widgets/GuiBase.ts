import { AInstance } from "./Instance";

export abstract class AGuiBase extends AInstance implements GuiBase {
    protected _absolutePosition: Vector2 = { X: 0, Y: 0 };
    protected _absoluteRotation = 0;
    protected _absoluteSize: Vector2 = { X: 0, Y: 0 };
    protected static DefaultProperties = {
        ...AInstance.DefaultProperties,
        _absolutePosition: { X: 0, Y: 0 },
        _absoluteRotation: 0,
        _absoluteSize: { X: 0, Y: 0 },
    };

    protected constructor(name: string, className: string) {
        super(name, className);
    }

    public get AbsolutePosition(): Vector2 {
        return this._absolutePosition;
    }

    public get AbsoluteRotation(): number {
        return this._absoluteRotation;
    }

    public get AbsoluteSize(): Vector2 {
        return this._absoluteSize;
    }
}
