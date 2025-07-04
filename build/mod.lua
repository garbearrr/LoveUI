--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____InstanceManager = require("src.engine.InstanceManager")
local Instance = ____InstanceManager.Instance
local root
local frame
love.load = function()
    root = Instance:New("RootWidget")
    root.Size = {X = {Scale = 1, Pixel = 0}, Y = {Scale = 1, Pixel = 0}}
    root.Position = {X = {Scale = 0, Pixel = 0}, Y = {Scale = 0, Pixel = 0}}
    Instance:setRoot(root)
    frame = Instance:New("Frame")
    frame.Parent = root
    frame.Position = {X = {Scale = 0.5, Pixel = -50}, Y = {Scale = 0.5, Pixel = -25}}
    frame.Size = {X = {Scale = 0, Pixel = 100}, Y = {Scale = 0, Pixel = 50}}
    frame.BackgroundColor3 = {R = 0.2, G = 0.6, B = 1}
    frame.BorderColor3 = {R = 1, G = 1, B = 1}
    frame.BorderSizePixel = 2
    frame.Rotation = 15
    frame.Transparency = 0.1
    frame.BorderMode = "Middle"
end
love.update = function(dt)
    Instance:update(dt)
end
love.draw = function()
    Instance:draw()
end
return ____exports
