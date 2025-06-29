
type Callback = (...args: Array<any>) => any;
type ExcludeKeys<T, U> = { [K in keyof T]: T[K] extends U ? never : K }[keyof T];

type InstancePropertyNames<T extends Instance> = Exclude<
	ExcludeKeys<T, IEvent<T> | Callback | symbol>,
	"Changed"
>

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