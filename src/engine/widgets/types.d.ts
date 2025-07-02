
type AutomaticSize = "None" | "X" | "Y" | "XY";
type BorderMode = "Inset" | "Outline" | "Middle";
type SizeConstraint = "RelativeYY" | "RelativeXX" | "RelativeXY" | "RelativeYYAndXX" | "RelativeXYAndYY" | "RelativeXXAndXY";

type Callback = (...args: Array<any>) => any;
type ExcludeKeys<T, U> = { [K in keyof T]: T[K] extends U ? never : K }[keyof T];

type InstancePropertyNames<T extends Instance> = Exclude<
	ExcludeKeys<T, IEvent<T> | Callback | symbol>,
	"Changed"
>

interface Color3 {
    readonly R: number;
    readonly G: number;
    readonly B: number;
}

interface UDim2 {
    readonly X: { Scale: number; Pixel: number };
    readonly Y: { Scale: number; Pixel: number };
}

interface Vector2 {
    readonly X: number;
    readonly Y: number;
}

// Basic input and animation enums used by GuiObject
type EasingDirection = "In" | "Out" | "InOut";
type EasingStyle =
    | "Linear"
    | "Sine"
    | "Back"
    | "Bounce"
    | "Elastic"
    | "Quad"
    | "Quart"
    | "Quint"
    | "Exponential"
    | "Circular"
    | "Cubic";
type TweenStatus = "Canceled" | "Completed";
type SwipeDirection = "Left" | "Right" | "Up" | "Down";
type UserInputState = "Begin" | "Change" | "End" | "Cancel";

interface InputObject {}

interface Instances {
	Frame: Frame;
}

interface Instance {
	/**
	 * Calling Clone directly on an object will return undefined if the cloned object is not archivable.
	 * 
	 * const Obj = Instance.new("Frame");
	 * Obj.Clone(); --&gt; Frame
	 * Obj.Archivable = false;
	 * Obj.Clone(); --&gt; undefined
	 */
	Archivable: boolean;
	/**
	 * A read-only string representing the class this Instance belongs to.
	 */
	readonly ClassName: string;
	/**
	 * A non-unique identifier of the Instance.
	 */
	Name: string;
	/**
	 * The Parent property determines the hierarchical parent of the Instance.
     * 
     * Instances will not be drawn without a parent.
     * 
     * All UI objects created in the editor will have a parent.
	 */
	Parent: Instance | undefined;
    /**
     * Adds a tag to the Instance.
     */
	AddTag(this: Instance, tag: string): void;
	/**
	 * Destroys all of an Instances's children.
	 */
	ClearAllChildren(this: Instance): void;
	/**
	 * Creates a copy of an object and all of its descendants, ignoring all objects that are not Archivable. The copy of the root object is returned by this function and its Parent is set to undefined.
	 */
	Clone<T extends Instance>(this: T): T;
	/**
	 * Sets the Instance.Parent property to undefined, locks the Instance.Parent property, disconnects all connections, and calls Destroy on all children. This function is the correct way to dispose of objects that are no longer required.
	 */
	Destroy(this: Instance): void;
	/**
	 * Returns the first ancestor of the Instance whose Instance.Name is equal to the given name.
	 * 
	 * If no matching ancestor is found, it returns undefined.
	 */
	FindFirstAncestor(this: Instance, name: string): Instance | undefined;
	/**
	 * Returns the first ancestor of the Instance whose Instance.ClassName is equal to the given className.
	 * 
	 * If no matching ancestor is found, it returns undefined.
	 */
	FindFirstAncestorOfClass<T extends keyof Instances>(this: Instance, className: T): Instances[T] | undefined;
	/**
	 * Returns the first ancestor of the Instance for whom Instance.IsA returns true for the given className.
	 * 
	 * If no matching ancestor is found, it returns undefined.
	 */
	FindFirstAncestorWhichIsA<T extends keyof Instances>(this: Instance, className: T): Instances[T] | undefined;
	/**
	 * Returns the first child of the Instance found with the given name. If no child exists with the given name, this function returns undefined. If the optional recursive argument is true, this function searches all descendants rather than only the immediate children of the Instance. Use this function if your code cannot guarantee the existence of an object with a given name.
	 */
	FindFirstChild(this: Instance, childName: string | number, recursive?: boolean): Instance | undefined;
	/**
	 * Returns the first child of the Instance whose ClassName is equal to the given className.
	 * 
	 * If no matching child is found, this function returns undefined.
	 */
	FindFirstChildOfClass<T extends keyof Instances>(this: Instance, className: T): Instances[T] | undefined;
	/**
	 * Returns the first child of the Instance for whom Instance.IsA returns true for the given className.
	 * 
	 * If no matching child is found, this function returns undefined. If the optional recursive argument is true, this function searches all descendants rather than only the immediate children of the Instance.
	 */
	FindFirstChildWhichIsA<T extends keyof Instances>(
		this: Instance,
		className: T,
		recursive?: boolean,
	): Instances[T] | undefined;
	/**
	 * Returns the first descendant found with the given Instance.Name.
	 */
	FindFirstDescendant(this: Instance, name: string): Instance | undefined;
	/**
	 * This function returns an event that behaves exactly like the `Changed` event, except that the event only fires when the given attribute changes. It's generally a good idea to use this method instead of a connection to Changed with a function that checks the attribute name. Subsequent calls to this method on the same object with the same attribute name return the same event.
	 */
	GetAttributeChangedSignal(this: Instance, attribute: string): IEvent<void>;
	/**
	 * Returns an array (a numerically indexed table) containing all of the Instance's direct children, or every Instance whose Parent is equal to the object.
	 */
	GetChildren(this: Instance): Array<Instance>;
	/**
	 * The **GetDescendants** function of an object returns an array that contains all of the descendants of that object. Unlike Instance.GetChildren, which only returns the immediate children of an object, GetDescendants will find every child of the object, every child of those children, and so on.
	 */
	GetDescendants(this: Instance): Array<Instance>;
	/**
	 */
	GetFullName(this: Instance): string;
	/**
	 * This method returns an event that behaves exactly like the `Changed` event, except that the event only fires when the given property changes. It's generally a good idea to use this method instead of a connection to `Changed` with a function that checks the property name. Subsequent calls to this method on the same object with the same property name return the same event.
	 */
	GetPropertyChangedSignal<T extends Instance>(
		this: T,
		propertyName: InstancePropertyNames<T>,
	): IEvent<void>;
    /**
     * Returns an array of all tags that have been added to the Instance. Tags are a way to categorize and identify Instances without affecting their hierarchy or properties.
     */
	GetTags(this: Instance): Array<string>;
    /**
     */
	HasTag(this: Instance, tag: string): boolean;
	/**
	 * IsA returns true if the Instance's class is **equivalent to** or a **subclass** of a given class.
	 */
	IsA<T extends keyof Instances>(this: Instance, className: T): this is Instances[T];
	/**
	 * Returns true if an Instance is an ancestor of the given descendant.
	 */
	IsAncestorOf(this: Instance, descendant: Instance): boolean;
	/**
	 * Returns true if an Instance is a descendant of the given ancestor.
	 */
	IsDescendantOf(this: Instance, ancestor: Instance): boolean;
    /**
     * Returns true if the property with the given name has been modified from its default value. This is useful for determining if a property has been changed from its initial state.
     */
	IsPropertyModified(this: Instance, name: string): boolean;
    /**
     * Removes a tag from the Instance. If the tag does not exist, this function does nothing. Tags are a way to categorize and identify Instances without affecting their hierarchy or properties.
     */
	RemoveTag(this: Instance, tag: string): void;
    /**
     * Resets the property with the given name to its default value. If the property does not exist, this function does nothing. This is useful for restoring properties to their initial state. 
     */
	ResetPropertyToDefault(this: Instance, name: string): void;
	/**
	 * Fires when the Instance.Parent property of the object or one of its ancestors is changed.
	 * 
	 * This event includes two parameters, _child_ and _parent_. _Child_ refers to the Instance whose Instance.Parent was actually changed. _Parent_ refers to this Instance's new Instance.Parent.
	 */
	readonly AncestryChanged: IEvent<{child: Instance, parent: Instance | undefined}>;
	/**
	 * This event fires whenever an attribute is changed on the instance. This includes when an attribute is set to undefined. The name of the attribute that has been changed is passed to the connected function.
	 */
	readonly AttributeChanged: IEvent<{attribute: string}>;
	/**
	 * The Changed event fires right after most properties change on objects.
	 */
	readonly Changed: IEvent<void>;
	/**
	 * Fires after an object is parented to this Instance.
	 */
	readonly ChildAdded: IEvent<{child: Instance}>;
	/**
	 * Fires after a child is removed from this Instance.
	 */
	readonly ChildRemoved: IEvent<{child: Instance}>;
	/**
	 * The DescendantAdded event fires after a descendant is added to the Instance.
	 */
	readonly DescendantAdded: IEvent<{descendant: Instance}>
	/**
	 * The Destroying event fires immediately before the Instance or one of its ancestors is destroyed.
	 */
	readonly Destroying: IEvent<() => void>;
}

interface GuiBase extends Instance {
    /**
	 * AbsolutePosition is a read-only property that provides the screen position of a UI element in pixels. 
	 */
	readonly AbsolutePosition: Vector2;
	/**
	 * AbsoluteRotation is a read-only property that describes the actual screen rotation of a UI element, in degrees.
	 */
	readonly AbsoluteRotation: number;
	/**
	 * AbsoluteSize is a read-only property that provides the screen size of a UI element in pixels.
	 */
	readonly AbsoluteSize: Vector2;
}

interface GuiObject extends GuiBase {
	/**
	 * This property determines a GuiObject, which is relative to its absolute size. The origin point determines from where the element is positioned (through GuiObject.Position) and from which the rendered GuiObject.Size expands.
	 */
	AnchorPoint: Vector2;
	/**
	 * This property is used to automatically size parent UI objects based on the size of its descendants. 
	 */
	AutomaticSize: AutomaticSize;
	/**
	 * This property determines the color of a UI background (the fill color).
	 */
	BackgroundColor3: Color3;
	/**
	 * This property determines the transparency of the GUI's background and border.
	 */
	BackgroundTransparency: number;
	/**
	 * BorderColor3 determines the color of a UI element's rectangular border (also known as the stroke color).
	 */
	BorderColor3: Color3;
	/**
	 * **BorderMode** determines in what manner a GuiObject's border is laid out relative to its dimensions.
	 */
	BorderMode: BorderMode;
	/**
	 * This property determines how wide a GUI's border should render, in pixels.
	 * 
	 * The border width extends outward the perimeter of the rectangle. For instance, a GUI with a width of 100 pixels and BorderSizePixel set to 2 will actually render 102 pixels wide.
	 * 
	 * Setting this to 0 will disable the border altogether.
	 */
	BorderSizePixel: number;
	/**
	 * This property determines if a GuiObject will _clip_ (or make invisible) any portion of descendant GUI elements that would otherwise render outside the bounds of the rectangle. Further descendant GUI elements can also use ClipsDescendants.
	 */
	ClipsDescendants: boolean;
	/**
	 * This indicates whether a GuiObject (and its descendants) can be dragged around the screen.
	 */
	Draggable: boolean;
	LayoutOrder: number;
	/**
	 * 
	 * An element's position can also be set by modifying both its scalar and pixel positions at the same time. For instance, its position can be set to `({0.25, 100}, {0.25, 100})`.
	 * 
	 * The scalar position is relative to the size of the parent GUI element. For example, if AnchorPoint is set to `0, 0` and Position is set to `{0, 0}, {0, 0}`, the element's top left corner renders at the top left corner of the parent element. Similarly, if AnchorPoint is set to `0, 0` and Position is set to `{0.5, 0}, {0.5, 0}`, the element's top left corner will render at the direct center of the parent element.
	 * 
	 * The pixel portions of the `UDim2` value are the same regardless of the parent GUI's size. The values represent the position of the object in pixels. For example, if set to `{0, 100}, {0, 150}` the element's AnchorPoint will render with on the screen 100 pixels from the left and 150 pixels from the top.
	 * 
	 */
	Position: UDim2;
	/**
	 * This property determines the number of degrees by which a GuiObject is rotated. Rotation is relative to the **center** of its parent GUI.
	 * 
	 * 
	 */
	Rotation: number;
	/**
	 * This property determines whether a ~GuiObject|GUI\` can be selected when navigating GUIs using a gamepad.
	 * 
	 * 
	 * When this is false, the GUI cannot be selected. However, setting this to false when a GUI is selected will not deselect it nor change the value of the GuiService's SelectedObject property.
	 * 
	 * 
	 */
	Selectable: boolean;
	/**
	 * This property overrides the default selection adornment (used for gamepads). For best results, this should point to a GuiObject.
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	SelectionImageObject: GuiObject | undefined;
	SelectionOrder: number;
	/**
	 * This property determines a GUI's scalar and pixel size using a `UDim2`. Its value can be expressed as `UDim2.new(ScalarX, PixelX, ScalarY, PixelY)` or `({ScalarX, PixelX}, {ScalarY, PixelY})`.
	 */
	Size: UDim2;
	/**
	 * 
	 * 
	 * This property is useful for creating onscreen controls that are meant to scale with either the width or height of a parent object, but not both. This preserves the aspect ratio of the GUI element in question. For example, setting to RelativeYY with a Size of `{1, 0}, {1, 0}` will make the UI element square, with both the X and Y sizes equal to the parent element's Y size.
	 */
        SizeConstraint: SizeConstraint;
	/**
	 * 
	 * When indexing, this will return the BackgroundTranparency.
	 * 
	 * When setting, this will change the BackgroundTransparency **and** TextTransparency of a GuiObject element.
	 * 
	 * Tags: Hidden, NotReplicated
	 */
	Transparency: number;
	/**
	 * This property determines whether a GuiObject will render shapes, images and/or text on screen. If set to false, the GUI and all of its descedants (children) will not render.
	 * 
	 * 
	 */
	Visible: boolean;
	/**
	 * This property determines the order in which a GuiObject renders to the screen relative to other GUIs.
	 * 
	 * By default, GUIs render in ascending priority order where lower values are rendered first. As a result, GUIs with lower ZIndex values appear under higher values. You can change the render order by changing the value of `ScreenGui.ZIndexBehavior`.
	 * 
	 * The range of valid values is -MAX\_INT to MAX\_INT, inclusive (2,147,483,647 or (2^31 - 1)). If you are unsure if you will need to layer an element between two already-existing elements in the future, it can be a good idea to use multiples of 100, i.e. 0, 100, 200. This ensures a large gap of ZIndex values you can use for elements rendered in-between other elements.
	 * 
	 * See also
	 * --------
	 * 
	 */
	ZIndex: number;
	/**
	 * 
	 * This function will return whether the tween will play. It will not play if another tween is acting on the GuiObject and the override parameter is false.
	 * 
	 * See also
	 * --------
	 * 
	 */
	TweenPosition(
		this: GuiObject,
		endPosition: UDim2,
                easingDirection?: EasingDirection,
                easingStyle?: EasingStyle,
		time?: number,
		override?: boolean,
                callback?: (finishedTween: TweenStatus) => void,
	): boolean;
	/**
	 * 
	 * This function will return whether the tween will play. Normally this will always return true, but it will return false if another tween is active and override is set to false.
	 * 
	 * See also
	 * --------
	 * 
	 */
	TweenSize(
		this: GuiObject,
		endSize: UDim2,
                easingDirection?: EasingDirection,
                easingStyle?: EasingStyle,
		time?: number,
		override?: boolean,
                callback?: (finishedTween: TweenStatus) => void,
	): boolean;
	/**
	 * 
	 * This function will return whether the tween will play. Normally this will always return true, but it will return false if another tween is active and override is set to false.
	 * 
	 * See also
	 * --------
	 * 
	 */
	TweenSizeAndPosition(
		this: GuiObject,
		endSize: UDim2,
		endPosition: UDim2,
                easingDirection?: EasingDirection,
                easingStyle?: EasingStyle,
		time?: number,
		override?: boolean,
                callback?: (finishedTween: TweenStatus) => void,
	): boolean;
	/**
	 * This event fires when a player begins dragging the object.
	 * 
	 * See also
	 * --------
	 * 
	 * @deprecated
	 */
        readonly DragBegin: IEvent<{ initialPosition: UDim2 }>;
	/**
	 * This event fires when a player stops dragging the object.
	 * 
	 * See also
	 * --------
	 * 
	 * @deprecated
	 */
        readonly DragStopped: IEvent<{ x: number; y: number }>;
	/**
	 * This event fires when a user begins interacting with the GuiObject via a Human-Computer Interface device (Mouse button down, touch begin, keyboard button down, etc).
	 * 
	 * 
	 * This event will always fire regardless of game state.
	 * 
	 * See also
	 * --------
	 * 
	 */
        readonly InputBegan: IEvent<{ input: InputObject }>;
	/**
	 * This event fires when a user changes how they're interacting via a Human-Computer Interface device (Mouse button down, touch begin, keyboard button down, etc).
	 * 
	 * 
	 * This event will always fire regardless of game state.
	 * 
	 * See also
	 * --------
	 * 
	 */
        readonly InputChanged: IEvent<{ input: InputObject }>;
	/**
	 * The InputEnded event fires when a user stops interacting via a Human-Computer Interface device (Mouse button down, touch begin, keyboard button down, etc).
	 * 
	 * 
	 * This event will always fire regardless of game state.
	 * 
	 * See also
	 * --------
	 * 
	 */
        readonly InputEnded: IEvent<{ input: InputObject }>;
	/**
	 * The MouseEnter event fires when a user moves their mouse into a GuiObject element.
	 * 
	 * Please do not rely on the `x` and `y` arguments passed by this event as a fool-proof way to to determine where the user's mouse is when it enters a GUI. These coordinates may vary even when the mouse enters the GUI via the same edge - particularly when the mouse enters the element quickly. This is due to the fact the coordinates indicate the position of the mouse when the event fires rather than the exact moment the mouse enters the GUI.
	 * 
	 * This event fires even when the GUI element renders beneath another element.
	 * 
	 * 
	 * See also
	 * --------
	 * 
	 */
        readonly MouseEnter: IEvent<{ x: number; y: number }>;
	/**
	 * The MouseLeave event fires when a user moves their mouse out of a GuiObject element.
	 * 
	 * Please do not rely on the `x` and `y` arguments passed by this event as a fool-proof way to to determine where the user's mouse is when it leaves a GUI. These coordinates may vary even when the mouse leaves the GUI via the same edge - particularly when the mouse leaves the element quickly. This is due to the fact the coordinates indicate the position of the mouse when the event fires rather than the exact moment the mouse leaves the GUI.
	 * 
	 * This event fires even when the GUI element renders beneath another element.
	 * 
	 * See also
	 * --------
	 * 
	 */
        readonly MouseLeave: IEvent<{ x: number; y: number }>;
	/**
	 * 
	 * Note, this event fires when the mouse's position is updated, therefore it will fire repeatedly whilst being moved.
	 * 
	 * The `x` and `y` arguments indicate the updated screen coordinates of the user's mouse in pixels. These can be useful to determine the mouse's location on the GUI, screen, and delta since the mouse's previous position if it is being tracked in a global variable.
	 * 
	 * 
	 * local CustomScrollingFrame = script.Parent
	 * local SubFrame = CustomScrollingFrame:FindFirstChild("SubFrame")
	 * 
	 * local mouse = game.Players.LocalPlayer:GetMouse()
	 * function getPosition(X, Y)
	 * 	local gui\_X = CustomScrollingFrame.AbsolutePosition.X
	 * 	local gui\_Y = CustomScrollingFrame.AbsolutePosition.Y
	 * 	
	 * 	
	 * 	local pos = Vector2.new(math.abs(X - gui\_X), math.abs(Y - gui\_Y - 36))
	 * 	print(pos)
	 * end
	 * 
	 * CustomScrollingFrame.MouseMoved:Connect(getPosition)
	 * 
	 * Note that this event may not fire exactly when the user's mouse enters or exits a GUI element. Therefore, the `x` and `y` arguments may not match up perfectly to the coordinates of the GUI's edges.
	 * 
	 * See also
	 * --------
	 * 
	 */
        readonly MouseMoved: IEvent<{ x: number; y: number }>;
	/**
	 * 
	 * 
	 * See also
	 * --------
	 * 
	 */
        readonly MouseWheelBackward: IEvent<{ x: number; y: number }>;
	/**
	 * 
	 * 
	 * See also
	 * --------
	 * 
	 */
        readonly MouseWheelForward: IEvent<{ x: number; y: number }>;
}


interface Frame extends GuiObject {}