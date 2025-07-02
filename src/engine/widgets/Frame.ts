import { AGuiObject } from "./GuiObject";


export class FrameWidget extends AGuiObject implements Frame {
    public constructor(name: string, parent?: Instance) {
        super(name, "Frame", parent);
    }
}