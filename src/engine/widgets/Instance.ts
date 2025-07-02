import { Event } from "../core/Event";

export abstract class AInstance implements Instance {
    private static nextId = 0;

    private _archivable: boolean = true;
    private _name: string;
    private _parent: Instance | undefined;

    public readonly id: number;
    public readonly ClassName: string;

    protected readonly ChildByName: Map<string, Instance> = new Map();
    protected readonly ChildByID: Map<number, Instance> = new Map();
    protected readonly Tags: Set<string> = new Set<string>();

    private readonly propertySignals: Map<string, Event<void>> = new Map();
    private readonly attributeSignals: Map<string, Event<void>> = new Map();

    public readonly AncestryChanged = new Event<{ child: Instance; parent: Instance | undefined }>();
    public readonly AttributeChanged = new Event<{ attribute: string }>();
    public readonly Changed = new Event<void>();
    public readonly ChildAdded = new Event<{ child: Instance }>();
    public readonly ChildRemoved = new Event<{ child: Instance }>();
    public readonly DescendantAdded = new Event<{ descendant: Instance }>();
    public readonly Destroying = new Event<() => void>();

    protected static DefaultProperties: { [key: string]: any } = { _archivable: true };

    public constructor(name: string, className: string) {
        this.id = AInstance.nextId++;
        this._name = name;
        this.ClassName = className;
        this._parent = undefined;
    }

    // property accessors
    public get Archivable(): boolean {
        return this._archivable;
    }
    public set Archivable(v: boolean) {
        if (this._archivable !== v) {
            this._archivable = v;
            this.signalPropertyChanged("Archivable");
        }
    }

    public get Name(): string {
        return this._name;
    }
    public set Name(v: string) {
        if (this._name !== v) {
            this._name = v;
            if (this._parent) {
                (this._parent as AInstance).ChildByName.set(v, this);
            }
            this.signalPropertyChanged("Name");
        }
    }

    public get Parent(): Instance | undefined {
        return this._parent;
    }
    public set Parent(p: Instance | undefined) {
        if (this._parent === p) return;

        const oldParent = this._parent as AInstance | undefined;
        if (oldParent) {
            oldParent.ChildByName.delete(this.Name);
            oldParent.ChildByID.delete(this.id);
            oldParent.ChildRemoved.Fire({ child: this });
        }

        this._parent = p;

        if (p) {
            (p as AInstance).ChildByName.set(this.Name, this);
            (p as AInstance).ChildByID.set(this.id, this);
            (p as AInstance).ChildAdded.Fire({ child: this });

            let ancestor: Instance | undefined = p;
            while (ancestor) {
                ancestor.DescendantAdded.Fire({ descendant: this });
                ancestor = ancestor.Parent;
            }
        }

        this.AncestryChanged.Fire({ child: this, parent: p });
        this.signalPropertyChanged("Parent");
        this.onParentChanged(p, oldParent);
    }

    protected onParentChanged(newParent: Instance | undefined, oldParent: Instance | undefined): void {
        // can be overridden in subclasses
    }

    protected signalPropertyChanged(name: string): void {
        const sig = this.propertySignals.get(name);
        if (sig) sig.Fire();
        this.Changed.Fire();
    }

    // methods
    public AddTag(tag: string): void {
        this.Tags.add(tag);
    }

    public RemoveTag(tag: string): void {
        this.Tags.delete(tag);
    }

    public GetTags(): Array<string> {
        return [...this.Tags];
    }

    public HasTag(tag: string): boolean {
        return this.Tags.has(tag);
    }

    public ClearAllChildren(): void {
        for (const child of this.ChildByID.values()) {
            child.Destroy();
        }
        this.ChildByName.clear();
        this.ChildByID.clear();
    }

    public Clone<T extends Instance>(): T {
        if (!this.Archivable) return undefined as unknown as T;

        const ctor = (this.constructor as new (name: string, className: string) => T);
        const clone = new ctor(this.Name, this.ClassName);
        clone.Archivable = this.Archivable;

        for (const child of this.ChildByID.values()) {
            const childClone = child.Clone();
            if (childClone !== undefined) {
                childClone.Parent = clone;
            }
        }

        return clone;
    }

    public Destroy(): void {
        this.Destroying.Fire(() => {});
        this.ClearAllChildren();
        this.Parent = undefined;
        this.Tags.clear();

        this.AncestryChanged.Destroy();
        this.AttributeChanged.Destroy();
        this.Changed.Destroy();
        this.ChildAdded.Destroy();
        this.ChildRemoved.Destroy();
        this.DescendantAdded.Destroy();
        this.Destroying.Destroy();
        this.propertySignals.forEach(e => e.Destroy());
        this.attributeSignals.forEach(e => e.Destroy());
    }

    public FindFirstAncestor(name: string): Instance | undefined {
        let current = this.Parent;
        while (current) {
            if (current.Name === name) return current;
            current = current.Parent;
        }
        return undefined;
    }

    public FindFirstAncestorOfClass<T extends keyof Instances>(className: T): Instances[T] | undefined {
        let current: Instance | undefined = this.Parent;
        while (current) {
            if (current.ClassName === className) return current as Instances[T];
            current = current.Parent;
        }
        return undefined;
    }

    public FindFirstAncestorWhichIsA<T extends keyof Instances>(className: T): Instances[T] | undefined {
        let current: Instance | undefined = this.Parent;
        while (current) {
            if (current.IsA(className)) return current as Instances[T];
            current = current.Parent;
        }
        return undefined;
    }

    public FindFirstChild(childName: string | number, recursive = false): Instance | undefined {
        if (typeof childName === "number") {
            const child = this.ChildByID.get(childName);
            if (child) return child;
        } else {
            const child = this.ChildByName.get(childName);
            if (child) return child;
        }

        if (recursive) {
            for (const child of this.ChildByID.values()) {
                const found = child.FindFirstChild(childName, true);
                if (found) return found;
            }
        }
        return undefined;
    }

    public FindFirstChildOfClass<T extends keyof Instances>(className: T): Instances[T] | undefined {
        for (const child of this.ChildByID.values()) {
            if (child.ClassName === className) return child as Instances[T];
        }
        return undefined;
    }

    public FindFirstChildWhichIsA<T extends keyof Instances>(className: T, recursive = false): Instances[T] | undefined {
        for (const child of this.ChildByID.values()) {
            if (child.IsA(className)) return child as Instances[T];
            if (recursive) {
                const found = child.FindFirstChildWhichIsA(className, true);
                if (found) return found as Instances[T];
            }
        }
        return undefined;
    }

    public FindFirstDescendant(name: string): Instance | undefined {
        for (const desc of this.GetDescendants()) {
            if (desc.Name === name) return desc;
        }
        return undefined;
    }

    public GetAttributeChangedSignal(attribute: string): Event<void> {
        let evt = this.attributeSignals.get(attribute);
        if (!evt) {
            evt = new Event<void>();
            this.attributeSignals.set(attribute, evt);
        }
        return evt;
    }

    public GetChildren(): Array<Instance> {
        return Array.from(this.ChildByID.values());
    }

    public GetDescendants(): Array<Instance> {
        const result: Array<Instance> = [];
        for (const child of this.ChildByID.values()) {
            result.push(child);
            result.push(...child.GetDescendants());
        }
        return result;
    }

    public GetFullName(): string {
        const names: string[] = [this.Name];
        let current = this.Parent;
        while (current) {
            names.unshift(current.Name);
            current = current.Parent;
        }
        return names.join(".");
    }

    public GetPropertyChangedSignal<T extends Instance>(this: T, propertyName: any): Event<void> {
        const self = this as unknown as AInstance;
        let evt = self.propertySignals.get(propertyName);
        if (!evt) {
            evt = new Event<void>();
            self.propertySignals.set(propertyName, evt);
        }
        return evt;
    }

    public IsA<T extends keyof Instances>(className: T): this is Instances[T] {
        return (this.ClassName as unknown) === className;
    }

    public IsAncestorOf(descendant: Instance): boolean {
        let current = descendant.Parent;
        while (current) {
            if (current === this) return true;
            current = current.Parent;
        }
        return false;
    }

    public IsDescendantOf(ancestor: Instance): boolean {
        return ancestor.IsAncestorOf(this);
    }

    public IsPropertyModified(name: keyof typeof AInstance.DefaultProperties): boolean {
        const defaults = (this.constructor as typeof AInstance).DefaultProperties;
        const defaultValue = defaults[name];
        const currentValue = (this as any)[name];
        return defaultValue !== currentValue;
    }

    public ResetPropertyToDefault(name: Extract<keyof typeof AInstance.DefaultProperties, string>): void {
        const defaults = (this.constructor as typeof AInstance).DefaultProperties;
        const defaultValue = defaults[name];
        if ((this as any)[name] !== defaultValue) {
            (this as any)[name] = defaultValue;
            this.signalPropertyChanged(name);
        }
    }
}
