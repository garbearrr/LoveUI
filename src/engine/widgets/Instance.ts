// TODO: Look into performance.
// TODO: Look into how parenting works. (Private api .addParent?)
// TODO: Look into cloning.
// TODO: In destroy, clear all connections.

export abstract class Inst implements Instance {
    public Archivable               : boolean = true;
    public Name                     : string;
    public Parent                   : Instance | undefined;

    public readonly ClassName       : string;

    protected readonly ChildByName  : Map<string, Instance> = new Map();
    protected readonly ChildByID    : Map<number, Instance> = new Map();
    protected readonly Tags         : Set<string> = new Set<string>();

    public constructor(name: string, className: string, parent?: Instance) {
        this.Name = name;
        this.ClassName = className;
        this.Parent = parent;
    }

    public AddTag(tag: string): void {
        this.Tags.add(tag);
    }

    public ClearAllChildren(): void {
        for(const Child of this.ChildByID.values()) {
            Child.Destroy();
        }

        this.ChildByName.clear();
        this.ChildByID.clear();
    }

    public Clone<T extends Instance>(): T {
        return {} as unknown as T;
    }

    public Destroy(): void {
        this.ClearAllChildren();
        this.Parent = undefined;
        this.Tags.clear();
    }
}