
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

interface Instances {

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
	 * Returns a string describing the Instance's ancestry. The string is a concatenation of the [Name](https://developer.roblox.com/en-us/api-reference/property/Instance/Name) of the object and its ancestors, separated by periods.
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
     * Returns true if the Instance has a tag with the given name. Tags are a way to categorize and identify Instances without affecting their hierarchy or properties. Tags can be added using [Instance:AddTag](https://developer.roblox.com/en-us/api-reference/function/Instance/AddTag) and removed using [Instance:RemoveTag](https://developer.roblox.com/en-us/api-reference/function/Instance/RemoveTag).
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
	 * This property determines a GUI's pixel and scalar size using a `UDim2`. Its value can be expressed as `UDim2.new(ScalarX, PixelX, ScalarY, PixelY)` or `({ScalarX, PixelX}, {ScalarY, PixelY})`. Position is centered around a GUI's [GuiObject.AnchorPoint](https://developer.roblox.com/en-us/api-reference/property/GuiObject/AnchorPoint).
	 * 
	 * An element's position can also be set by modifying both its scalar and pixel positions at the same time. For instance, its position can be set to `({0.25, 100}, {0.25, 100})`.
	 * 
	 * The scalar position is relative to the size of the parent GUI element. For example, if AnchorPoint is set to `0, 0` and Position is set to `{0, 0}, {0, 0}`, the element's top left corner renders at the top left corner of the parent element. Similarly, if AnchorPoint is set to `0, 0` and Position is set to `{0.5, 0}, {0.5, 0}`, the element's top left corner will render at the direct center of the parent element.
	 * 
	 * The pixel portions of the `UDim2` value are the same regardless of the parent GUI's size. The values represent the position of the object in pixels. For example, if set to `{0, 100}, {0, 150}` the element's AnchorPoint will render with on the screen 100 pixels from the left and 150 pixels from the top.
	 * 
	 * An object's actual pixel position can be read from the [GuiBase2d.AbsolutePosition](https://developer.roblox.com/en-us/api-reference/property/GuiBase2d/AbsolutePosition) property.
	 */
	Position: UDim2;
	/**
	 * This property determines the number of degrees by which a GuiObject is rotated. Rotation is relative to the **center** of its parent GUI.
	 * 
	 * A GUI's [GuiObject.AnchorPoint](https://developer.roblox.com/en-us/api-reference/property/GuiObject/AnchorPoint) does not influence it's rotation. This means that you cannot change the center of rotation since it will always be in the center of the object.
	 * 
	 * Additionally, this property is **not compatible** with [GuiObject.ClipsDescendants](https://developer.roblox.com/en-us/api-reference/property/GuiObject/ClipsDescendants). If an ancestor (parent) object has ClipsDescendants enabled and this property is nonzero, then descendant GUI elements will not be clipped.
	 */
	Rotation: number;
	/**
	 * This property determines whether a ~GuiObject|GUI\` can be selected when navigating GUIs using a gamepad.
	 * 
	 * If this property is true, a GUI can be selected. Selecting a GUI also sets the [GuiService.SelectedObject](https://developer.roblox.com/en-us/api-reference/property/GuiService/SelectedObject) property to that object.
	 * 
	 * When this is false, the GUI cannot be selected. However, setting this to false when a GUI is selected will not deselect it nor change the value of the GuiService's SelectedObject property.
	 * 
	 * Add [GuiObject.SelectionGained](https://developer.roblox.com/en-us/api-reference/event/GuiObject/SelectionGained) and [GuiObject.SelectionLost](https://developer.roblox.com/en-us/api-reference/event/GuiObject/SelectionLost) will not fire for the element.  
	 * To deselect a GuiObject, you must change [GuiService's](https://developer.roblox.com/en-us/api-reference/class/GuiService) SelectedObject property.
	 * 
	 * This property is useful if a GUI is connected to several GUIs via properties such as this [GuiObject.NextSelectionUp](https://developer.roblox.com/en-us/api-reference/property/GuiObject/NextSelectionUp), [GuiObject.NextSelectionDown](https://developer.roblox.com/en-us/api-reference/property/GuiObject/NextSelectionDown), [NextSelectionRight](https://developer.roblox.com/en-us/api-reference/class/GuiObject), or [NextSelectionLeft](https://developer.roblox.com/en-us/api-reference/class/GuiObject). Rather than change all of the properties so that the Gamepad cannot select the GUI, you can disable its Selectable property to temporarily prevent it from being selected. Then, when you want the gamepad selector to be able to select the GUI, simply re-enable its selectable property.
	 */
	Selectable: boolean;
	/**
	 * This property overrides the default selection adornment (used for gamepads). For best results, this should point to a GuiObject.
	 * 
	 * Note that the SelectionImageObject overlays the selected GUI with the GuiObject.Size of the image. For best results when using a non-default SelectionImageObject, you should size the SelectionImageObject via the scale [UDim2](https://developer.roblox.com/en-us/api-reference/datatype/UDim2) values. This helps ensure that the object scales properly over the selected element.
	 * 
	 * The default SelectionImageObject is a blue and white square outline around the selected GUI element. In the image below, the selected GUI is a white [Frame](https://developer.roblox.com/en-us/api-reference/class/Frame).
	 * 
	 * ![Default SelectionImageObject](https://developer.roblox.com/assets/bltae6b98faea42f3d1/Screen_Shot_2018-09-13_at_9.57.14_PM.png)
	 * 
	 * For instance, changing the SelectionImageObject to a [ImageLabel](https://developer.roblox.com/en-us/api-reference/class/ImageLabel) with red and white square outline [image](https://www.roblox.com/library/2347505468/SelectionImage-Red), [GuiObject.BackgroundTransparency](https://developer.roblox.com/en-us/api-reference/property/GuiObject/BackgroundTransparency) of 1, GuiObject.Size of _UDim2(1.1, 0, 1.1, 0)_, and GuiObject.Position of _UDim2(-0.05, 0, -0.05, 0)_ results in the image below:
	 * 
	 * ![Custom SelectionImageObject](https://developer.roblox.com/assets/blt5f5f0cf0d10b4e57/Screen_Shot_2018-09-13_at_9.53.54_PM.png)
	 * 
	 * Changing the SelectionImageObject for a GUI element only affects that element. To change the SelectionImageObject for all of a user's GUI elements, you can set the [PlayerGui.SelectionImageObject](https://developer.roblox.com/en-us/api-reference/property/PlayerGui/SelectionImageObject) property.
	 * 
	 * To determine or set which GUI element is selected by the user, you can use the [GuiService.SelectedObject](https://developer.roblox.com/en-us/api-reference/property/GuiService/SelectedObject) property. The user uses the gamepad to select different GUI elements, invoking the [GuiObject.NextSelectionUp](https://developer.roblox.com/en-us/api-reference/property/GuiObject/NextSelectionUp), [GuiObject.NextSelectionDown](https://developer.roblox.com/en-us/api-reference/property/GuiObject/NextSelectionDown), [GuiObject.NextSelectionLeft](https://developer.roblox.com/en-us/api-reference/property/GuiObject/NextSelectionLeft), and [GuiObject.NextSelectionRight](https://developer.roblox.com/en-us/api-reference/property/GuiObject/NextSelectionRight) events.
	 */
	SelectionImageObject: GuiObject | undefined;
	SelectionOrder: number;
	/**
	 * This property determines a GUI's scalar and pixel size using a `UDim2`. Its value can be expressed as `UDim2.new(ScalarX, PixelX, ScalarY, PixelY)` or `({ScalarX, PixelX}, {ScalarY, PixelY})`.
	 */
	Size: UDim2;
	/**
	 * This property works in conjunction with the [Size](https://developer.roblox.com/en-us/api-reference/class/GuiObject.Size) property to determine the screen size of a GUI element.
	 * 
	 * The [SizeConstraint](https://developer.roblox.com/en-us/api-reference/enum/SizeConstraint) enum will determine the axes that influence the scalar size of an object.
	 * 
	 * This property is useful for creating onscreen controls that are meant to scale with either the width or height of a parent object, but not both. This preserves the aspect ratio of the GUI element in question. For example, setting to RelativeYY with a Size of `{1, 0}, {1, 0}` will make the UI element square, with both the X and Y sizes equal to the parent element's Y size.
	 */
	SizeConstraint: Enum.SizeConstraint;
	/**
	 * This property is deprecated, and a mix of [GuiObject.BackgroundTransparency](https://developer.roblox.com/en-us/api-reference/property/GuiObject/BackgroundTransparency) and [TextLabel.TextTransparency](https://developer.roblox.com/en-us/api-reference/property/TextLabel/TextTransparency).
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
	 * The rendering of individual components of a GUI can be controlled individually through transparency properties such as [GuiObject.BackgroundTransparency](https://developer.roblox.com/en-us/api-reference/property/GuiObject/BackgroundTransparency), [TextLabel.TextTransparency](https://developer.roblox.com/en-us/api-reference/property/TextLabel/TextTransparency) and [ImageLabel.ImageTransparency](https://developer.roblox.com/en-us/api-reference/property/ImageLabel/ImageTransparency).
	 * 
	 * When this property is true, the GUI will be ignored by [UIGridStyleLayout](https://developer.roblox.com/en-us/api-reference/class/UIGridStyleLayout) objects (such as [UIGridLayout](https://developer.roblox.com/en-us/api-reference/class/UIGridLayout), [UIListLayout](https://developer.roblox.com/en-us/api-reference/class/UIListLayout) and [UITableLayout](https://developer.roblox.com/en-us/api-reference/class/UITableLayout)). In other words, the space that the element would otherwise occupy in the layout is used by other elements instead.
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
	 * *   [GuiObject.LayoutOrder](https://developer.roblox.com/en-us/api-reference/property/GuiObject/LayoutOrder), which controls the sort order of a GUI when used with a [UIGridStyleLayout](https://developer.roblox.com/en-us/api-reference/class/UIGridStyleLayout) instead of render order.
	 */
	ZIndex: number;
	/**
	 * Smoothly moves a GUI to a new [UDim2](https://developer.roblox.com/en-us/api-reference/datatype/UDim2) position in the specified time using the specified [EasingDirection](https://developer.roblox.com/en-us/api-reference/enum/EasingDirection) and [EasingStyle](https://developer.roblox.com/en-us/api-reference/enum/EasingStyle).
	 * 
	 * This function will return whether the tween will play. It will not play if another tween is acting on the GuiObject and the override parameter is false.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject:TweenSize](https://developer.roblox.com/en-us/api-reference/function/GuiObject/TweenSize), tweens a GUI's size
	 * *   [GuiObject:TweenSizeAndPosition](https://developer.roblox.com/en-us/api-reference/function/GuiObject/TweenSizeAndPosition), tweens a GUI's size and position synchronously
	 */
	TweenPosition(
		this: GuiObject,
		endPosition: UDim2,
		easingDirection?: CastsToEnum<Enum.EasingDirection>,
		easingStyle?: CastsToEnum<Enum.EasingStyle>,
		time?: number,
		override?: boolean,
		callback?: (finishedTween: Enum.TweenStatus) => void,
	): boolean;
	/**
	 * Smoothly resizes a GUI to a new [UDim2](https://developer.roblox.com/en-us/api-reference/datatype/UDim2) in the specified time using the specified [EasingDirection](https://developer.roblox.com/en-us/api-reference/enum/EasingDirection) and [EasingStyle](https://developer.roblox.com/en-us/api-reference/enum/EasingStyle).
	 * 
	 * This function will return whether the tween will play. Normally this will always return true, but it will return false if another tween is active and override is set to false.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject:TweenPosition](https://developer.roblox.com/en-us/api-reference/function/GuiObject/TweenPosition), tweens a GUI's position
	 * *   [GuiObject:TweenSizeAndPosition](https://developer.roblox.com/en-us/api-reference/function/GuiObject/TweenSizeAndPosition), tweens a GUI's size and position synchronously
	 */
	TweenSize(
		this: GuiObject,
		endSize: UDim2,
		easingDirection?: CastsToEnum<Enum.EasingDirection>,
		easingStyle?: CastsToEnum<Enum.EasingStyle>,
		time?: number,
		override?: boolean,
		callback?: (finishedTween: Enum.TweenStatus) => void,
	): boolean;
	/**
	 * Smoothly resizes and moves a GUI to a new [UDim2](https://developer.roblox.com/en-us/api-reference/datatype/UDim2) size and position in the specified time using the specified [EasingDirection](https://developer.roblox.com/en-us/api-reference/enum/EasingDirection) and [EasingStyle](https://developer.roblox.com/en-us/api-reference/enum/EasingStyle).
	 * 
	 * This function will return whether the tween will play. Normally this will always return true, but it will return false if another tween is active and override is set to false.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject:TweenSize](https://developer.roblox.com/en-us/api-reference/function/GuiObject/TweenSize), tweens a GUI's size
	 * *   [GuiObject:TweenPosition](https://developer.roblox.com/en-us/api-reference/function/GuiObject/TweenPosition), tweens a GUI's position
	 */
	TweenSizeAndPosition(
		this: GuiObject,
		endSize: UDim2,
		endPosition: UDim2,
		easingDirection?: CastsToEnum<Enum.EasingDirection>,
		easingStyle?: CastsToEnum<Enum.EasingStyle>,
		time?: number,
		override?: boolean,
		callback?: (finishedTween: Enum.TweenStatus) => void,
	): boolean;
	/**
	 * This event fires when a player begins dragging the object.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.DragStopped](https://developer.roblox.com/en-us/api-reference/event/GuiObject/DragStopped)
	 * @deprecated
	 */
	readonly DragBegin: RBXScriptSignal<(initialPosition: UDim2) => void>;
	/**
	 * This event fires when a player stops dragging the object.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.DragBegin](https://developer.roblox.com/en-us/api-reference/event/GuiObject/DragBegin)
	 * @deprecated
	 */
	readonly DragStopped: RBXScriptSignal<(x: number, y: number) => void>;
	/**
	 * This event fires when a user begins interacting with the GuiObject via a Human-Computer Interface device (Mouse button down, touch begin, keyboard button down, etc).
	 * 
	 * The [UserInputService](https://developer.roblox.com/en-us/api-reference/class/UserInputService) has a similarly named event that is not restricted to a specific UI element: [UserInputService.InputBegan](https://developer.roblox.com/en-us/api-reference/event/UserInputService/InputBegan).
	 * 
	 * This event will always fire regardless of game state.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.InputEnded](https://developer.roblox.com/en-us/api-reference/event/GuiObject/InputEnded)
	 * *   [GuiObject.InputChanged](https://developer.roblox.com/en-us/api-reference/event/GuiObject/InputChanged)
	 */
	readonly InputBegan: RBXScriptSignal<(input: InputObject) => void>;
	/**
	 * This event fires when a user changes how they're interacting via a Human-Computer Interface device (Mouse button down, touch begin, keyboard button down, etc).
	 * 
	 * The [UserInputService](https://developer.roblox.com/en-us/api-reference/class/UserInputService) has a similarly named event that is not restricted to a specific UI element: [UserInputService.InputChanged](https://developer.roblox.com/en-us/api-reference/event/UserInputService/InputChanged).
	 * 
	 * This event will always fire regardless of game state.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.InputBegan](https://developer.roblox.com/en-us/api-reference/event/GuiObject/InputBegan)
	 * *   [GuiObject.InputEnded](https://developer.roblox.com/en-us/api-reference/event/GuiObject/InputEnded)
	 */
	readonly InputChanged: RBXScriptSignal<(input: InputObject) => void>;
	/**
	 * The InputEnded event fires when a user stops interacting via a Human-Computer Interface device (Mouse button down, touch begin, keyboard button down, etc).
	 * 
	 * The [UserInputService](https://developer.roblox.com/en-us/api-reference/class/UserInputService) has a similarly named event that is not restricted to a specific UI element: [UserInputService.InputEnded](https://developer.roblox.com/en-us/api-reference/event/UserInputService/InputEnded).
	 * 
	 * This event will always fire regardless of game state.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.InputBegan](https://developer.roblox.com/en-us/api-reference/event/GuiObject/InputBegan)
	 * *   [GuiObject.InputChanged](https://developer.roblox.com/en-us/api-reference/event/GuiObject/InputChanged)
	 */
	readonly InputEnded: RBXScriptSignal<(input: InputObject) => void>;
	/**
	 * The MouseEnter event fires when a user moves their mouse into a GuiObject element.
	 * 
	 * Please do not rely on the `x` and `y` arguments passed by this event as a fool-proof way to to determine where the user's mouse is when it enters a GUI. These coordinates may vary even when the mouse enters the GUI via the same edge - particularly when the mouse enters the element quickly. This is due to the fact the coordinates indicate the position of the mouse when the event fires rather than the exact moment the mouse enters the GUI.
	 * 
	 * This event fires even when the GUI element renders beneath another element.
	 * 
	 * If you would like to track when a user's mouse leaves a GUI element, you can use the [GuiObject.MouseLeave](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseLeave) event.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.MouseLeave](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseLeave)
	 * *   [GuiObject.MouseMoved](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseMoved)
	 * *   [GuiObject.MouseWheelForward](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseWheelForward)
	 * *   [GuiObject.MouseWheelBackward](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseWheelBackward)
	 */
	readonly MouseEnter: RBXScriptSignal<(x: number, y: number) => void>;
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
	 * *   [GuiObject.MouseEnter](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseEnter)
	 * *   [GuiObject.MouseMoved](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseMoved)
	 * *   [GuiObject.MouseWheelForward](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseWheelForward)
	 * *   [GuiObject.MouseWheelBackward](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseWheelBackward)
	 */
	readonly MouseLeave: RBXScriptSignal<(x: number, y: number) => void>;
	/**
	 * Fires whenever a user moves their mouse while it is inside a GuiObject element. It is similar to [Mouse.Move](https://developer.roblox.com/en-us/api-reference/event/Mouse/Move), which fires regardless whether the user's mouse is over a GUI element.
	 * 
	 * Note, this event fires when the mouse's position is updated, therefore it will fire repeatedly whilst being moved.
	 * 
	 * The `x` and `y` arguments indicate the updated screen coordinates of the user's mouse in pixels. These can be useful to determine the mouse's location on the GUI, screen, and delta since the mouse's previous position if it is being tracked in a global variable.
	 * 
	 * The code below demonstrates how to determine the [Vector2](https://developer.roblox.com/en-us/api-reference/datatype/Vector2) offset of the user's mouse relative to a GUI element:
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
	 * *   [GuiObject.MouseEnter](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseEnter)
	 * *   [GuiObject.MouseLeave](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseLeave)
	 * *   [GuiObject.MouseWheelForward](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseWheelForward)
	 * *   [GuiObject.MouseWheelBackward](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseWheelBackward)
	 */
	readonly MouseMoved: RBXScriptSignal<(x: number, y: number) => void>;
	/**
	 * The WheelBackward event fires when a user scrolls their mouse wheel back when the mouse is over a GuiObject element. It is similar to [Mouse.WheelBackward](https://developer.roblox.com/en-us/api-reference/event/Mouse/WheelBackward), which fires regardless whether the user's mouse is over a GUI element.
	 * 
	 * This event fires merely as an indicator of the wheel's forward movement. This means that the x and y mouse coordinate arguments do not change as a result of this event. These coordinates only change when the mouse moves, which can be tracked by the [GuiObject.MouseMoved](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseMoved) event.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.MouseEnter](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseEnter)
	 * *   [GuiObject.MouseLeave](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseLeave)
	 * *   [GuiObject.MouseMoved](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseMoved)
	 * *   [GuiObject.MouseWheelForward](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseWheelForward)
	 */
	readonly MouseWheelBackward: RBXScriptSignal<(x: number, y: number) => void>;
	/**
	 * The WheelForward event fires when a user scrolls their mouse wheel forward when the mouse is over a GuiObject element. It is similar to [Mouse.WheelForward](https://developer.roblox.com/en-us/api-reference/event/Mouse/WheelForward), which fires regardless whether the user's mouse is over a GUI element.
	 * 
	 * This event fires merely as an indicator of the wheel's forward movement. This means that the x and y mouse coordinate arguments do not change as a result of this event. These coordinates only change when the mouse moves, which can be tracked by the [GuiObject.MouseMoved](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseMoved) event.
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.MouseEnter](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseEnter)
	 * *   [GuiObject.MouseLeave](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseLeave)
	 * *   [GuiObject.MouseMoved](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseMoved)
	 * *   [GuiObject.MouseWheelBackward](https://developer.roblox.com/en-us/api-reference/event/GuiObject/MouseWheelBackward)
	 */
	readonly MouseWheelForward: RBXScriptSignal<(x: number, y: number) => void>;
	/**
	 * This event fires when the Gamepad selector starts focusing on the GuiObject.
	 * 
	 * If you want to check from the Gamepad select stops focusing on the GUI element, you can use the [GuiObject.SelectionLost](https://developer.roblox.com/en-us/api-reference/event/GuiObject/SelectionLost) event.
	 * 
	 * When a GUI gains selection focus, the value of the `GuiService/SelectionObject|SelectionObject` property also changes to the that gains selection. To determine which GUI gained selection, check the value of this property.
	 */
	readonly SelectionGained: RBXScriptSignal<() => void>;
	/**
	 * This event fires when the Gamepad selector stops focusing on the GuiObject.
	 * 
	 * If you want to check from the Gamepad select starts focusing on the GUI element, you can use the [GuiObject.SelectionGained](https://developer.roblox.com/en-us/api-reference/event/GuiObject/SelectionGained) event.
	 * 
	 * When a GUI loses selection focus, the value of the `GuiService/SelectionObject|SelectionObject` property changes either to nil or to the GUI element that gains selection focus. To determine which GUI gained selection, or if no GUI is selected, check the value of this property.
	 */
	readonly SelectionLost: RBXScriptSignal<() => void>;
	/**
	 * The TouchLongPress event fires after a brief moment when the player holds their finger on the UI element using a touch-enabled device. It fires with a table of [Vector2](https://developer.roblox.com/en-us/api-reference/datatype/Vector2) that describe the relative screen positions of the fingers involved in the gesture. In addition, it fires multiple times with multiple [UserInputState](https://developer.roblox.com/en-us/api-reference/enum/UserInputState)s: Begin after a brief delay, Change if the player moves their finger during the gesture and finally with End. The delay is platform dependent; in Studio it is a little longer than one second.
	 * 
	 * Since this event only requires one finger, this event can be simulated in Studio using the emulator and a mouse.
	 * 
	 * Below is an example of TouchLongPress firing on a Frame that is [GuiObject.Active](https://developer.roblox.com/en-us/api-reference/property/GuiObject/Active). Below, the event fires after a brief delay (Begin) and then continually as as the finger is moved (Change). It fires one last time after it is released (End).
	 * 
	 * ![TouchLongPress gesture](https://developer.roblox.com/assets/blt072ee7f898e2b645/GuiObjectTouchLongPressDemo.gif)
	 * 
	 * See also
	 * --------
	 * 
	 * *   [UserInputService.TouchLongPress](https://developer.roblox.com/en-us/api-reference/event/UserInputService/TouchLongPress), an event with the same functionality but is not restricted to a specific GuiObject
	 * *   [GuiObject.TouchPan](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPan)
	 * *   [GuiObject.TouchPinch](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPinch)
	 * *   [GuiObject.TouchRotate](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchRotate)
	 * *   [GuiObject.TouchTap](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchTap)
	 * *   [GuiObject.TouchSwipe](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchSwipe)
	 */
	readonly TouchLongPress: RBXScriptSignal<(touchPositions: Array<Vector2>, state: Enum.UserInputState) => void>;
	/**
	 * This event fires when the player moves their finger on the UI element using a touch-enabled device. It fires shortly before [GuiObject.TouchSwipe](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchSwipe) would, and does not fire with [GuiObject.TouchTap](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchTap). This event is useful for allowing the player to manipulate the position of UI elements on the screen.
	 * 
	 * This event fires with a table of [Vector2](https://developer.roblox.com/en-us/api-reference/datatype/Vector2) that describe the relative screen positions of the fingers involved in the gesture. In addition, it fires several times with multiple [UserInputState](https://developer.roblox.com/en-us/api-reference/enum/UserInputState)s: Begin after a brief delay, Change when the player moves their finger during the gesture and finally once more with End.
	 * 
	 * This event cannot be simulated in Studio using the emulator and a mouse; you must have a real touch enabled device to fire this event.
	 * 
	 * Below is an animation of TouchPan firing on the black semitransparent [Frame](https://developer.roblox.com/en-us/api-reference/class/Frame) that covers the screen. The event is being used to manipulate the position of the pink inner [Frame](https://developer.roblox.com/en-us/api-reference/class/Frame). The code for this can be found in the code samples.
	 * 
	 * ![TouchPan firing on a real touch-enabled device](https://developer.roblox.com/assets/bltd08f63e0a28873f4/GuiObjectTouchPanDemo.gif)
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.TouchPinch](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPinch)
	 * *   [GuiObject.TouchRotate](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchRotate)
	 * *   [GuiObject.TouchTap](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchTap)
	 * *   [GuiObject.TouchSwipe](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchSwipe)
	 * *   [GuiObject.TouchLongPress](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchLongPress)
	 */
	readonly TouchPan: RBXScriptSignal<
		(
			touchPositions: Array<Vector2>,
			totalTranslation: Vector2,
			velocity: Vector2,
			state: Enum.UserInputState,
		) => void
	>;
	/**
	 * The TouchPinch event fires when the player uses two fingers to make a pinch or pull gesture on the UI element using a touch-enabled device. A **pinch** happens when two or more fingers move closer together, and a **pull** happens when they move apart. This event fires in conjunction with [GuiObject.TouchPan](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPan). This event is useful for allowing the player to manipulate the scale (size) of UI elements on the screen, and is most often used for zooming features.
	 * 
	 * This event fires with a table of [Vector2](https://developer.roblox.com/en-us/api-reference/datatype/Vector2) that describe the relative screen positions of the fingers involved in the gesture. In addition, it fires several times with multiple [UserInputState](https://developer.roblox.com/en-us/api-reference/enum/UserInputState)s: Begin after a brief delay, Change when the player moves a finger during the gesture and finally once more with End. It should be noted that the scale should be used **multiplicatively**.
	 * 
	 * Since this event requires at least two fingers, it is not possible to be simulated in Studio using the emulator and a mouse; you must have a real touch-enabled device (and also least two fingers, try asking a friend). Below is an animation of TouchPinch firing on the black semitransparent [Frame](https://developer.roblox.com/en-us/api-reference/class/Frame) that covers the screen (note the touch positions marked with white circles). The event is being used to manipulate the scale of the [TextLabel](https://developer.roblox.com/en-us/api-reference/class/TextLabel) that says “Hi!”. The code for this can be found in the code samples.
	 * 
	 * ![TouchPinch firing on a real touch device](https://developer.roblox.com/assets/blt0f7f12dc386d161f/GuiObjectTouchPinchDemo.gif)
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.TouchPan](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPan)
	 * *   [GuiObject.TouchRotate](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchRotate)
	 * *   [GuiObject.TouchTap](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchTap)
	 * *   [GuiObject.TouchSwipe](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchSwipe)
	 * *   [GuiObject.TouchLongPress](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchLongPress)
	 */
	readonly TouchPinch: RBXScriptSignal<
		(touchPositions: Array<Vector2>, scale: number, velocity: number, state: Enum.UserInputState) => void
	>;
	/**
	 * The TouchRotate event fires when the player uses two fingers to make a pinch or pull gesture on the UI element using a touch-enabled device. Rotation occurs when the angle of the line between two fingers changes. This event fires in conjunction with [GuiObject.TouchPan](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPan). This event is useful for allowing the player to manipulate the rotation of UI elements on the screen.
	 * 
	 * This event fires with a table of [Vector2](https://developer.roblox.com/en-us/api-reference/datatype/Vector2) that describe the relative screen positions of the fingers involved in the gesture. In addition, it fires several times with multiple [UserInputState](https://developer.roblox.com/en-us/api-reference/enum/UserInputState)s: Begin after a brief delay, Change when the player moves a finger during the gesture and finally once more with End.
	 * 
	 * Since this event requires at least two fingers, it is not possible to be simulated in Studio using the emulator and a mouse; you must have a real touch-enabled device (and also least two fingers, try asking a friend).
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.TouchPan](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPan)
	 * *   [GuiObject.TouchPinch](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPinch)
	 * *   [GuiObject.TouchTap](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchTap)
	 * *   [GuiObject.TouchSwipe](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchSwipe)
	 * *   [GuiObject.TouchLongPress](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchLongPress)
	 */
	readonly TouchRotate: RBXScriptSignal<
		(touchPositions: Array<Vector2>, rotation: number, velocity: number, state: Enum.UserInputState) => void
	>;
	/**
	 * The TouchSwipe event fires when the player performs a swipe gesture on the UI element using a touch-enabled device. It fires with the direction of the gesture (Up, Down, Left or Right) and the number of touch points involved in the gesture. Swipe gestures are often used to change tabs in mobile UIs.
	 * 
	 * Since this event only requires one finger, this event can be simulated in Studio using the emulator and a mouse. Below is an example of TouchSwipe being fired on a Frame that is [GuiObject.Active](https://developer.roblox.com/en-us/api-reference/property/GuiObject/Active). Below, the event fires when the Frame moves and changes color slightly. The code for this can be found the code samples.
	 * 
	 * ![TouchSwipe event firing on a Frame](https://developer.roblox.com/assets/blt674fae3d52e692b7/GuiObjectTouchSwipeDemo.gif)
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.TouchPan](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPan)
	 * *   [GuiObject.TouchPinch](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPinch)
	 * *   [GuiObject.TouchRotate](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchRotate)
	 * *   [GuiObject.TouchTap](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchTap)
	 * *   [GuiObject.TouchLongPress](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchLongPress)
	 */
	readonly TouchSwipe: RBXScriptSignal<(swipeDirection: Enum.SwipeDirection, numberOfTouches: number) => void>;
	/**
	 * The TouchTap event fires when the player performs a tap gesture on the UI element using a touch-enabled device. A tap is a quick single touch without any movement involved (a longer press would fire [GuiObject.TouchLongPress](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchLongPress), and moving during the touch would fire [GuiObject.TouchPan](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPan) and/or [GuiObject.TouchSwipe](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchSwipe)). It fires with a table of [Vector2](https://developer.roblox.com/en-us/api-reference/datatype/Vector2)s that describe the relative positions of the fingers involved in the gesture.
	 * 
	 * Since this event only requires one finger, this event can be simulated in Studio using the emulator and a mouse. Below is an example of TouchTap being fired on a Frame that is [GuiObject.Active](https://developer.roblox.com/en-us/api-reference/property/GuiObject/Active). Below, the event fires when the cursor briefly pauses (to simulate a tap) and the Frame toggles its [GuiObject.BackgroundTransparency](https://developer.roblox.com/en-us/api-reference/property/GuiObject/BackgroundTransparency). The code for this can be found the code samples.
	 * 
	 * ![TouchTap being fired on a Frame using Studio's emulator](https://developer.roblox.com/assets/blt248e4176c17eb486/GuiObjectTouchTapDemo.gif)
	 * 
	 * See also
	 * --------
	 * 
	 * *   [GuiObject.TouchPan](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPan)
	 * *   [GuiObject.TouchPinch](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchPinch)
	 * *   [GuiObject.TouchRotate](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchRotate)
	 * *   [GuiObject.TouchSwipe](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchSwipe)
	 * *   [GuiObject.TouchLongPress](https://developer.roblox.com/en-us/api-reference/event/GuiObject/TouchLongPress)
	 */
	readonly TouchTap: RBXScriptSignal<(touchPositions: Array<Vector2>) => void>;
}