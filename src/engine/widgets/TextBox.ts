import { Event } from "../core/Event";
import { AGuiObject } from "./GuiObject";

export class TextBoxWidget extends AGuiObject implements TextBox {
    private _clearTextOnFocus = true;
    private _contentText = "";
    private _cursorPosition = -1;
    private _font: any = undefined;
    private _fontFace: any = undefined;
    private _fontSize: any = undefined;
    private _lineHeight = 1;
    private _maxVisibleGraphemes = -1;
    private _multiLine = false;
    private _openTypeFeatures = "";
    private _openTypeFeaturesError = "";
    private _placeholderColor3: Color3 = { R: 1, G: 1, B: 1 };
    private _placeholderText = "";
    private _richText = false;
    private _selectionStart = -1;
    private _showNativeInput = false;
    private _text = "";
    private _textBounds: Vector2 = { X: 0, Y: 0 };
    private _textColor3: Color3 = { R: 1, G: 1, B: 1 };
    private _textDirection: any = undefined;
    private _textEditable = true;
    private _textFits = false;
    private _textScaled = false;
    private _textSize = 14;
    private _textStrokeColor3: Color3 = { R: 0, G: 0, B: 0 };
    private _textStrokeTransparency = 1;
    private _textTransparency = 0;
    private _textTruncate: any = undefined;
    private _textWrap = false;
    private _textWrapped = false;
    private _textXAlignment: any = undefined;
    private _textYAlignment: any = undefined;
    private _focused = false;

    protected static DefaultProperties = {
        ...AGuiObject.DefaultProperties,
        _clearTextOnFocus: true,
        _contentText: "",
        _cursorPosition: -1,
        _font: undefined as any,
        _fontFace: undefined as any,
        _fontSize: undefined as any,
        _lineHeight: 1,
        _maxVisibleGraphemes: -1,
        _multiLine: false,
        _openTypeFeatures: "",
        _openTypeFeaturesError: "",
        _placeholderColor3: { R: 1, G: 1, B: 1 },
        _placeholderText: "",
        _richText: false,
        _selectionStart: -1,
        _showNativeInput: false,
        _text: "",
        _textBounds: { X: 0, Y: 0 },
        _textColor3: { R: 1, G: 1, B: 1 },
        _textDirection: undefined as any,
        _textEditable: true,
        _textFits: false,
        _textScaled: false,
        _textSize: 14,
        _textStrokeColor3: { R: 0, G: 0, B: 0 },
        _textStrokeTransparency: 1,
        _textTransparency: 0,
        _textTruncate: undefined as any,
        _textWrap: false,
        _textWrapped: false,
        _textXAlignment: undefined as any,
        _textYAlignment: undefined as any,
    };

    public readonly FocusLost = new Event<{ enterPressed: boolean; inputThatCausedFocusLoss: InputObject }>();
    public readonly Focused = new Event<void>();
    public readonly ReturnPressedFromOnScreenKeyboard = new Event<void>();

    public constructor(name: string) {
        super(name, "TextBox");
    }

    public get ClearTextOnFocus(): boolean {
        return this._clearTextOnFocus;
    }
    public set ClearTextOnFocus(v: boolean) {
        this._clearTextOnFocus = v;
        this.signalPropertyChanged("ClearTextOnFocus");
    }

    public get ContentText(): string {
        return this._contentText;
    }

    public get CursorPosition(): number {
        return this._cursorPosition;
    }
    public set CursorPosition(v: number) {
        this._cursorPosition = v;
        this.signalPropertyChanged("CursorPosition");
    }

    public get Font(): any { return this._font; }
    public set Font(v: any) { this._font = v; this.signalPropertyChanged("Font"); }

    public get FontFace(): any { return this._fontFace; }
    public set FontFace(v: any) { this._fontFace = v; this.signalPropertyChanged("FontFace"); }

    public get FontSize(): any { return this._fontSize; }
    public set FontSize(v: any) { this._fontSize = v; this.signalPropertyChanged("FontSize"); }

    public get LineHeight(): number { return this._lineHeight; }
    public set LineHeight(v: number) { this._lineHeight = v; this.signalPropertyChanged("LineHeight"); }

    public get MaxVisibleGraphemes(): number { return this._maxVisibleGraphemes; }
    public set MaxVisibleGraphemes(v: number) { this._maxVisibleGraphemes = v; this.signalPropertyChanged("MaxVisibleGraphemes"); }

    public get MultiLine(): boolean { return this._multiLine; }
    public set MultiLine(v: boolean) { this._multiLine = v; this.signalPropertyChanged("MultiLine"); }

    public get OpenTypeFeatures(): string { return this._openTypeFeatures; }
    public set OpenTypeFeatures(v: string) { this._openTypeFeatures = v; this.signalPropertyChanged("OpenTypeFeatures"); }

    public get OpenTypeFeaturesError(): string { return this._openTypeFeaturesError; }

    public get PlaceholderColor3(): Color3 { return this._placeholderColor3; }
    public set PlaceholderColor3(v: Color3) { this._placeholderColor3 = v; this.signalPropertyChanged("PlaceholderColor3"); }

    public get PlaceholderText(): string { return this._placeholderText; }
    public set PlaceholderText(v: string) { this._placeholderText = v; this.signalPropertyChanged("PlaceholderText"); }

    public get RichText(): boolean { return this._richText; }
    public set RichText(v: boolean) { this._richText = v; this.signalPropertyChanged("RichText"); }

    public get SelectionStart(): number { return this._selectionStart; }
    public set SelectionStart(v: number) { this._selectionStart = v; this.signalPropertyChanged("SelectionStart"); }

    public get ShowNativeInput(): boolean { return this._showNativeInput; }
    public set ShowNativeInput(v: boolean) { this._showNativeInput = v; this.signalPropertyChanged("ShowNativeInput"); }

    public get Text(): string { return this._text; }
    public set Text(v: string) { this._text = v; this.signalPropertyChanged("Text"); }

    public get TextBounds(): Vector2 { return this._textBounds; }

    public get TextColor3(): Color3 { return this._textColor3; }
    public set TextColor3(v: Color3) { this._textColor3 = v; this.signalPropertyChanged("TextColor3"); }

    public get TextDirection(): any { return this._textDirection; }
    public set TextDirection(v: any) { this._textDirection = v; this.signalPropertyChanged("TextDirection"); }

    public get TextEditable(): boolean { return this._textEditable; }
    public set TextEditable(v: boolean) { this._textEditable = v; this.signalPropertyChanged("TextEditable"); }

    public get TextFits(): boolean { return this._textFits; }

    public get TextScaled(): boolean { return this._textScaled; }
    public set TextScaled(v: boolean) { this._textScaled = v; this.signalPropertyChanged("TextScaled"); }

    public get TextSize(): number { return this._textSize; }
    public set TextSize(v: number) { this._textSize = v; this.signalPropertyChanged("TextSize"); }

    public get TextStrokeColor3(): Color3 { return this._textStrokeColor3; }
    public set TextStrokeColor3(v: Color3) { this._textStrokeColor3 = v; this.signalPropertyChanged("TextStrokeColor3"); }

    public get TextStrokeTransparency(): number { return this._textStrokeTransparency; }
    public set TextStrokeTransparency(v: number) { this._textStrokeTransparency = v; this.signalPropertyChanged("TextStrokeTransparency"); }

    public get TextTransparency(): number { return this._textTransparency; }
    public set TextTransparency(v: number) { this._textTransparency = v; this.signalPropertyChanged("TextTransparency"); }

    public get TextTruncate(): any { return this._textTruncate; }
    public set TextTruncate(v: any) { this._textTruncate = v; this.signalPropertyChanged("TextTruncate"); }

    public get TextWrap(): boolean { return this._textWrap; }
    public set TextWrap(v: boolean) { this._textWrap = v; this.signalPropertyChanged("TextWrap"); }

    public get TextWrapped(): boolean { return this._textWrapped; }
    public set TextWrapped(v: boolean) { this._textWrapped = v; this.signalPropertyChanged("TextWrapped"); }

    public get TextXAlignment(): any { return this._textXAlignment; }
    public set TextXAlignment(v: any) { this._textXAlignment = v; this.signalPropertyChanged("TextXAlignment"); }

    public get TextYAlignment(): any { return this._textYAlignment; }
    public set TextYAlignment(v: any) { this._textYAlignment = v; this.signalPropertyChanged("TextYAlignment"); }

    public CaptureFocus(): void {
        this._focused = true;
        this.Focused.Fire(undefined);
    }

    public IsFocused(): boolean {
        return this._focused;
    }

    public ReleaseFocus(submitted = false): void {
        this._focused = false;
        this.FocusLost.Fire({ enterPressed: submitted, inputThatCausedFocusLoss: {} as InputObject });
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

        love.graphics.setColor(this._textColor3.R, this._textColor3.G, this._textColor3.B, 1 - this._textTransparency);
        love.graphics.print(this._text, 2, 2);

        love.graphics.pop();
    }
}
