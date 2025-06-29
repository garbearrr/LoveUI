local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local ____exports = {}
local EventConnection
____exports.Event = __TS__Class()
local Event = ____exports.Event
Event.name = "Event"
function Event.prototype.____constructor(self)
    self.Connections = __TS__New(Map)
end
function Event.prototype.Connect(self, callback)
    local Identifier = love.timer.getTime()
    self.Connections:set(Identifier, callback)
    return __TS__New(EventConnection, Identifier, self)
end
function Event.prototype.Destroy(self)
    self.Connections:clear()
end
function Event.prototype.Disconnect(self, connection)
    self.Connections:delete(connection)
end
function Event.prototype.Fire(self, value)
    self.Connections:forEach(function(____, fn) return fn(nil, value) end)
end
EventConnection = __TS__Class()
EventConnection.name = "EventConnection"
function EventConnection.prototype.____constructor(self, Conn, E)
    self.Connected = true
    self.Connection = Conn
    self.Event = E
end
function EventConnection.prototype.Disconnect(self)
    self.Connected = false
    self.Event:Disconnect(self.Connection)
end
function EventConnection.prototype.GetConnectionNum(self)
    return self.Connection
end
return ____exports
