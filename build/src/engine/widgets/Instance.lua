local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local Set = ____lualib.Set
local __TS__Spread = ____lualib.__TS__Spread
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayPushArray = ____lualib.__TS__ArrayPushArray
local __TS__ArrayUnshift = ____lualib.__TS__ArrayUnshift
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local ____exports = {}
local ____Event = require("src.engine.core.Event")
local Event = ____Event.Event
____exports.AInstance = __TS__Class()
local AInstance = ____exports.AInstance
AInstance.name = "AInstance"
function AInstance.prototype.____constructor(self, name, className, parent)
    self._archivable = true
    self.ChildByName = __TS__New(Map)
    self.ChildByID = __TS__New(Map)
    self.Tags = __TS__New(Set)
    self.propertySignals = __TS__New(Map)
    self.attributeSignals = __TS__New(Map)
    self.AncestryChanged = __TS__New(Event)
    self.AttributeChanged = __TS__New(Event)
    self.Changed = __TS__New(Event)
    self.ChildAdded = __TS__New(Event)
    self.ChildRemoved = __TS__New(Event)
    self.DescendantAdded = __TS__New(Event)
    self.Destroying = __TS__New(Event)
    local ____exports_AInstance_0, ____nextId_1 = ____exports.AInstance, "nextId"
    local ____exports_AInstance_nextId_2 = ____exports_AInstance_0[____nextId_1]
    ____exports_AInstance_0[____nextId_1] = ____exports_AInstance_nextId_2 + 1
    self.id = ____exports_AInstance_nextId_2
    self._name = name
    self.ClassName = className
    self._parent = nil
    if parent then
        self.Parent = parent
    end
end
function AInstance.prototype.signalPropertyChanged(self, name)
    local sig = self.propertySignals:get(name)
    if sig then
        sig:Fire()
    end
    self.Changed:Fire()
end
function AInstance.prototype.AddTag(self, tag)
    self.Tags:add(tag)
end
function AInstance.prototype.RemoveTag(self, tag)
    self.Tags:delete(tag)
end
function AInstance.prototype.GetTags(self)
    return {__TS__Spread(self.Tags)}
end
function AInstance.prototype.HasTag(self, tag)
    return self.Tags:has(tag)
end
function AInstance.prototype.ClearAllChildren(self)
    for ____, child in __TS__Iterator(self.ChildByID:values()) do
        child:Destroy()
    end
    self.ChildByName:clear()
    self.ChildByID:clear()
end
function AInstance.prototype.Clone(self)
    if not self.Archivable then
        return nil
    end
    local ctor = self.constructor
    local clone = __TS__New(ctor, self.Name, self.ClassName)
    clone.Archivable = self.Archivable
    for ____, child in __TS__Iterator(self.ChildByID:values()) do
        local childClone = child:Clone()
        if childClone ~= nil then
            childClone.Parent = clone
        end
    end
    return clone
end
function AInstance.prototype.Destroy(self)
    self.Destroying:Fire(function()
    end)
    self:ClearAllChildren()
    self.Parent = nil
    self.Tags:clear()
    self.AncestryChanged:Destroy()
    self.AttributeChanged:Destroy()
    self.Changed:Destroy()
    self.ChildAdded:Destroy()
    self.ChildRemoved:Destroy()
    self.DescendantAdded:Destroy()
    self.Destroying:Destroy()
    self.propertySignals:forEach(function(____, e) return e:Destroy() end)
    self.attributeSignals:forEach(function(____, e) return e:Destroy() end)
end
function AInstance.prototype.FindFirstAncestor(self, name)
    local current = self.Parent
    while current do
        if current.Name == name then
            return current
        end
        current = current.Parent
    end
    return nil
end
function AInstance.prototype.FindFirstAncestorOfClass(self, className)
    local current = self.Parent
    while current do
        if current.ClassName == className then
            return current
        end
        current = current.Parent
    end
    return nil
end
function AInstance.prototype.FindFirstAncestorWhichIsA(self, className)
    local current = self.Parent
    while current do
        if current:IsA(className) then
            return current
        end
        current = current.Parent
    end
    return nil
end
function AInstance.prototype.FindFirstChild(self, childName, recursive)
    if recursive == nil then
        recursive = false
    end
    if type(childName) == "number" then
        local child = self.ChildByID:get(childName)
        if child then
            return child
        end
    else
        local child = self.ChildByName:get(childName)
        if child then
            return child
        end
    end
    if recursive then
        for ____, child in __TS__Iterator(self.ChildByID:values()) do
            local found = child:FindFirstChild(childName, true)
            if found then
                return found
            end
        end
    end
    return nil
end
function AInstance.prototype.FindFirstChildOfClass(self, className)
    for ____, child in __TS__Iterator(self.ChildByID:values()) do
        if child.ClassName == className then
            return child
        end
    end
    return nil
end
function AInstance.prototype.FindFirstChildWhichIsA(self, className, recursive)
    if recursive == nil then
        recursive = false
    end
    for ____, child in __TS__Iterator(self.ChildByID:values()) do
        if child:IsA(className) then
            return child
        end
        if recursive then
            local found = child:FindFirstChildWhichIsA(className, true)
            if found then
                return found
            end
        end
    end
    return nil
end
function AInstance.prototype.FindFirstDescendant(self, name)
    for ____, desc in ipairs(self:GetDescendants()) do
        if desc.Name == name then
            return desc
        end
    end
    return nil
end
function AInstance.prototype.GetAttributeChangedSignal(self, attribute)
    local evt = self.attributeSignals:get(attribute)
    if not evt then
        evt = __TS__New(Event)
        self.attributeSignals:set(attribute, evt)
    end
    return evt
end
function AInstance.prototype.GetChildren(self)
    return __TS__ArrayFrom(self.ChildByID:values())
end
function AInstance.prototype.GetDescendants(self)
    local result = {}
    for ____, child in __TS__Iterator(self.ChildByID:values()) do
        result[#result + 1] = child
        __TS__ArrayPushArray(
            result,
            child:GetDescendants()
        )
    end
    return result
end
function AInstance.prototype.GetFullName(self)
    local names = {self.Name}
    local current = self.Parent
    while current do
        __TS__ArrayUnshift(names, current.Name)
        current = current.Parent
    end
    return table.concat(names, ".")
end
function AInstance.prototype.GetPropertyChangedSignal(self, propertyName)
    local ____self = self
    local evt = ____self.propertySignals:get(propertyName)
    if not evt then
        evt = __TS__New(Event)
        ____self.propertySignals:set(propertyName, evt)
    end
    return evt
end
function AInstance.prototype.IsA(self, className)
    return self.ClassName == className
end
function AInstance.prototype.IsAncestorOf(self, descendant)
    local current = descendant.Parent
    while current do
        if current == self then
            return true
        end
        current = current.Parent
    end
    return false
end
function AInstance.prototype.IsDescendantOf(self, ancestor)
    return ancestor:IsAncestorOf(self)
end
AInstance.nextId = 0
__TS__SetDescriptor(
    AInstance.prototype,
    "Archivable",
    {
        get = function(self)
            return self._archivable
        end,
        set = function(self, v)
            if self._archivable ~= v then
                self._archivable = v
                self:signalPropertyChanged("Archivable")
            end
        end
    },
    true
)
__TS__SetDescriptor(
    AInstance.prototype,
    "Name",
    {
        get = function(self)
            return self._name
        end,
        set = function(self, v)
            if self._name ~= v then
                self._name = v
                if self._parent then
                    self._parent.ChildByName:set(v, self)
                end
                self:signalPropertyChanged("Name")
            end
        end
    },
    true
)
__TS__SetDescriptor(
    AInstance.prototype,
    "Parent",
    {
        get = function(self)
            return self._parent
        end,
        set = function(self, p)
            if self._parent == p then
                return
            end
            local oldParent = self._parent
            if oldParent then
                oldParent.ChildByName:delete(self.Name)
                oldParent.ChildByID:delete(self.id)
                oldParent.ChildRemoved:Fire({child = self})
            end
            self._parent = p
            if p then
                p.ChildByName:set(self.Name, self)
                p.ChildByID:set(self.id, self)
                p.ChildAdded:Fire({child = self})
                local ancestor = p
                while ancestor do
                    ancestor.DescendantAdded:Fire({descendant = self})
                    ancestor = ancestor.Parent
                end
            end
            self.AncestryChanged:Fire({child = self, parent = p})
            self:signalPropertyChanged("Parent")
        end
    },
    true
)
return ____exports
