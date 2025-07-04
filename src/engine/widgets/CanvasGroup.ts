import { AGuiObject } from "./GuiObject";

export class CanvasGroupWidget extends AGuiObject implements CanvasGroup {
    private _groupColor3: Color3 = { R: 1, G: 1, B: 1 };
    private _groupTransparency = 0;

    protected static DefaultProperties = {
        ...AGuiObject.DefaultProperties,
        _groupColor3: { R: 1, G: 1, B: 1 },
        _groupTransparency: 0,
    };

    public constructor(name: string) {
        super(name, "CanvasGroup");
    }

    public get GroupColor3(): Color3 {
        return this._groupColor3;
    }
    public set GroupColor3(v: Color3) {
        this._groupColor3 = v;
        this.signalPropertyChanged("GroupColor3");
    }

    public get GroupTransparency(): number {
        return this._groupTransparency;
    }
    public set GroupTransparency(v: number) {
        this._groupTransparency = v;
        this.signalPropertyChanged("GroupTransparency");
    }

    public Draw(): void {
        // CanvasGroup does not render anything by itself
    }
}
