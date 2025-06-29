import { Inst } from "./Instance";

export abstract class GuiBase extends Inst implements GuiBase {
    protected _absolutePosition: Vector2 = { X: 0, Y: 0 };
    protected _absoluteRotation = 0;
    protected _absoluteSize: Vector2 = { X: 0, Y: 0 };

    protected constructor(name: string, className: string, parent?: Instance) {
        super(name, className, parent);
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
