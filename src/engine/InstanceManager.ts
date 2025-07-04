import { FrameWidget } from "./widgets/Frame";
import { RootWidget } from "./widgets/RootWidget";
import { CanvasGroupWidget } from "./widgets/CanvasGroup";
import { GuiButtonWidget } from "./widgets/GuiButton";
import { GuiLabelWidget } from "./widgets/GuiLabel";
import { ScrollingFrameWidget } from "./widgets/ScrollingFrame";
import { TextBoxWidget } from "./widgets/TextBox";

const classMap: { [K in keyof Instances]: new (name: string) => Instances[K] } = {
    Frame: FrameWidget as any,
    RootWidget: RootWidget as any,
    CanvasGroup: CanvasGroupWidget as any,
    GuiButton: GuiButtonWidget as any,
    GuiLabel: GuiLabelWidget as any,
    ScrollingFrame: ScrollingFrameWidget as any,
    TextBox: TextBoxWidget as any,
};

let root: RootWidget | undefined;

function traverseUpdate(obj: Instance, dt: number): void {
    if ((obj as any).Update) {
        (obj as any).Update(dt);
    }
    for (const child of obj.GetChildren()) {
        traverseUpdate(child, dt);
    }
}

function traverseDraw(obj: Instance): void {
    if ((obj as any).Draw) {
        (obj as any).Draw();
    }
    for (const child of obj.GetChildren()) {
        traverseDraw(child);
    }
}

export namespace Instance {
    export function New<T extends keyof Instances>(className: T): Instances[T] {
        const ctor = classMap[className];
        if (!ctor) throw `Unknown class ${className}`;
        return new ctor(className) as Instances[T];
    }

    export function setRoot(r: RootWidget): void {
        root = r;
    }

    export function update(dt: number): void {
        if (root) traverseUpdate(root, dt);
    }

    export function draw(): void {
        if (root) traverseDraw(root);
    }
}
