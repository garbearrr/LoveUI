import { Instance } from "./src/engine/InstanceManager";
import { RootWidget } from "./src/engine/widgets/RootWidget";
import { FrameWidget } from "./src/engine/widgets/Frame";

let root: RootWidget;
let frame: FrameWidget;

love.load = () => {
    root = Instance.New("RootWidget") as RootWidget;
    root.Size = { X: { Scale: 1, Pixel: 0 }, Y: { Scale: 1, Pixel: 0 } };
    root.Position = { X: { Scale: 0, Pixel: 0 }, Y: { Scale: 0, Pixel: 0 } };
    Instance.setRoot(root);

    frame = Instance.New("Frame") as FrameWidget;
    frame.Parent = root;
    frame.Position = { X: { Scale: 0.5, Pixel: -50 }, Y: { Scale: 0.5, Pixel: -25 } };
    frame.Size = { X: { Scale: 0, Pixel: 100 }, Y: { Scale: 0, Pixel: 50 } };
    frame.BackgroundColor3 = { R: 0.2, G: 0.6, B: 1 };
    frame.BorderColor3 = { R: 1, G: 1, B: 1 };
    frame.BorderSizePixel = 2;
};

love.update = (dt: number) => {
    Instance.update(dt);
};

love.draw = () => {
    Instance.draw();
};
