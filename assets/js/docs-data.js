window.BRUNX = {
  brand: {
    name: 'BrunxScript',
    tagline: 'FiveM resource documentation',
    description: 'Official documentation, API references and setup guides for BrunxScript resources.',
    logo: 'assets/img/logo.svg'
  },

  links: {
    github: '#',
    discord: '#',
    tebex: '#',
    brunxBridgeDownload: 'downloads/brunxbridge.zip'
  },

  scripts: [
    {
      slug: 'brunxbridge',
      name: 'BrunxBridge / pixel_bridge',
      badge: 'Core Bridge',
      version: '1.0.0',
      status: 'Recommended',
      short: 'A unified compatibility layer for frameworks, targets, callbacks, notifications and reusable server/client helpers.',
      icon: 'BX',
      category: 'Bridge',
      page: 'docs/brunxbridge.html',
      download: 'downloads/brunxbridge.zip',
      requirements: [
        'FiveM artifact with Lua 5.4 enabled',
        'One supported framework: Qbox, QB-Core, ESX, vRP or standalone/custom',
        'Optional target: ox_target, qb-target or drawtext fallback',
        'Optional utility layer: ox_lib for notifications/callbacks/context menus'
      ],
      overview: [
        'BrunxBridge is the base dependency for BrunxScript resources. It keeps framework-specific logic in one place so every other script can call one clean API.',
        'The bridge contains client framework adapters, server framework adapters, target adapters and shared utilities. This makes it easier to support Qbox, QB-Core, ESX, vRP and future custom frameworks without rewriting every resource.',
        'Use this page as the official API reference for BrunxBridge exports, events, framework adapters and target helpers.'
      ],
      install: [
        'Use the documented resource name consistently in your server.cfg and exports.',
        'Install the bridge inside your server resources folder.',
        'Add ensure pixel_bridge before every BrunxScript resource in server.cfg.',
        'Configure framework, target and debug settings in shared/config.lua.',
        'Restart the server and verify that the bridge starts before dependent resources.'
      ],
      config: `Config = {}

-- General
Config.Debug = false
Config.Locale = 'en'

-- Framework detection
-- Supported: auto, qbox, qb, esx, vrp, standalone, custom
Config.Framework = 'auto'

-- Target detection
-- Supported: auto, ox_target, qb-target, drawtext, none
Config.Target = 'auto'

-- Notification preference
-- Supported: ox_lib, qb, esx, custom
Config.Notify = 'ox_lib'

-- Callback preference
-- Recommended: ox_lib when available, framework fallback otherwise
Config.Callbacks = 'auto'

-- Advanced: override resource names if your server uses custom names
Config.Resources = {
  qbox = 'qbx_core',
  qb = 'qb-core',
  esx = 'es_extended',
  ox_lib = 'ox_lib',
  ox_target = 'ox_target',
  qb_target = 'qb-target'
}`,
      usage: `-- Client example
local Bridge = exports['pixel_bridge']:GetBridge()

Bridge.Notify({
  title = 'BrunxScript',
  description = 'Bridge loaded successfully.',
  type = 'success'
})

local playerData = Bridge.GetPlayerData()
local job = Bridge.GetJob()

-- Server example
local Bridge = exports['pixel_bridge']:GetBridge()

local player = Bridge.GetPlayer(source)
local identifier = Bridge.GetIdentifier(source)

if Bridge.HasJob(source, { 'police', 'ambulance', 'mechanic' }) then
  Bridge.Notify(source, {
    title = 'Access granted',
    description = 'You are allowed to use this action.',
    type = 'success'
  })
end`,
      fileStructure: [
        'pixel_bridge/',
        '├─ fxmanifest.lua',
        '├─ README.md',
        '├─ shared/',
        '│  ├─ bridge.lua        # shared bridge object / bootstrapping',
        '│  ├─ config.lua        # framework, target and debug settings',
        '│  └─ utils.lua',
        '├─ client/',
        '│  ├─ main.lua',
        '│  ├─ framework/',
        '│  │  ├─ qbox.lua',
        '│  │  ├─ qb.lua',
        '│  │  ├─ esx.lua',
        '│  │  └─ vrp.lua',
        '│  └─ target/',
        '│     ├─ _target.lua',
        '│     ├─ ox.lua',
        '│     ├─ qb.lua',
        '│     └─ drawtext.lua',
        '└─ server/',
        '   ├─ main.lua',
        '   └─ framework/',
        '      ├─ qbox.lua',
        '      ├─ qb.lua',
        '      ├─ esx.lua',
        '      └─ vrp.lua'
      ],
      exports: [
        { type: 'shared export', name: 'GetBridge()', description: 'Returns the active bridge object. This is the preferred entrypoint for new resources.' },
        { type: 'shared export', name: 'GetFramework()', description: 'Returns the detected or configured framework name.' },
        { type: 'shared export', name: 'GetTarget()', description: 'Returns the detected or configured target adapter.' },
        { type: 'client export', name: 'Notify(data)', description: 'Shows a normalized notification on the client.' },
        { type: 'server export', name: 'Notify(source, data)', description: 'Sends a normalized notification to a specific player.' },
        { type: 'server export', name: 'GetPlayer(source)', description: 'Returns the framework player object or normalized player wrapper.' },
        { type: 'server export', name: 'GetIdentifier(source)', description: 'Returns the main unique player identifier used by the active framework.' },
        { type: 'server export', name: 'HasJob(source, jobs)', description: 'Checks whether a player has one of the required jobs.' },
        { type: 'client export', name: 'AddTargetZone(id, data)', description: 'Creates an interaction zone using ox_target, qb-target or drawtext fallback.' },
        { type: 'client export', name: 'RemoveTargetZone(id)', description: 'Removes a previously registered bridge target zone.' }
      ],
      clientApi: [
        { type: 'player', name: 'Bridge.GetPlayerData()', description: 'Returns current client-side player data from the active framework.' },
        { type: 'player', name: 'Bridge.GetJob()', description: 'Returns the current player job in a normalized format.' },
        { type: 'player', name: 'Bridge.GetJobName()', description: 'Returns only the current job name, useful for simple checks.' },
        { type: 'player', name: 'Bridge.GetGrade()', description: 'Returns the current job grade/level where supported.' },
        { type: 'player', name: 'Bridge.IsOnDuty()', description: 'Returns duty state where the framework supports duty.' },
        { type: 'access', name: 'Bridge.HasJob(jobs)', description: 'Client-side helper to check a single job string or a list/table of jobs.' },
        { type: 'ui', name: 'Bridge.Notify(data)', description: 'Displays a normalized notification. Supports title, description, type and duration.' },
        { type: 'callback', name: 'Bridge.TriggerCallback(name, cb, ...)', description: 'Runs a server callback using ox_lib or the framework callback fallback.' },
        { type: 'utility', name: 'Bridge.Debug(...)', description: 'Prints debug output only when Config.Debug is enabled.' }
      ],
      serverApi: [
        { type: 'player', name: 'Bridge.GetPlayer(source)', description: 'Returns the framework player object or a safe normalized player table.' },
        { type: 'player', name: 'Bridge.GetIdentifier(source)', description: 'Returns citizenid, identifier, license or configured identifier depending on framework.' },
        { type: 'player', name: 'Bridge.GetName(source)', description: 'Returns a readable character/player name.' },
        { type: 'job', name: 'Bridge.GetJob(source)', description: 'Returns the player job as a normalized table with name, label, grade and duty where available.' },
        { type: 'job', name: 'Bridge.HasJob(source, jobs)', description: 'Checks whether a player has access based on job string/table.' },
        { type: 'players', name: 'Bridge.GetPlayers()', description: 'Returns online players in a normalized way across frameworks.' },
        { type: 'players', name: 'Bridge.GetPlayersByJob(jobs)', description: 'Returns online players matching one or more jobs.' },
        { type: 'money', name: 'Bridge.GetMoney(source, account)', description: 'Returns cash, bank or another supported account balance.' },
        { type: 'money', name: 'Bridge.AddMoney(source, account, amount, reason)', description: 'Adds money through the active framework adapter.' },
        { type: 'money', name: 'Bridge.RemoveMoney(source, account, amount, reason)', description: 'Removes money safely through the active framework adapter.' },
        { type: 'item', name: 'Bridge.AddItem(source, item, amount, metadata)', description: 'Adds an item using the active inventory/framework implementation.' },
        { type: 'item', name: 'Bridge.RemoveItem(source, item, amount, slot)', description: 'Removes an item using the active inventory/framework implementation.' },
        { type: 'item', name: 'Bridge.HasItem(source, item, amount)', description: 'Checks whether a player has the required item amount.' },
        { type: 'callback', name: 'Bridge.RegisterCallback(name, cb)', description: 'Registers a server callback using ox_lib or framework fallback.' },
        { type: 'ui', name: 'Bridge.Notify(source, data)', description: 'Sends a normalized notification to one player.' },
        { type: 'utility', name: 'Bridge.Debug(...)', description: 'Server-side debug logger controlled by Config.Debug.' }
      ],
      targetApi: [
        { type: 'target', name: 'Bridge.Target.AddBoxZone(id, data)', description: 'Adds a box zone. Adapts to ox_target, qb-target or drawtext.' },
        { type: 'target', name: 'Bridge.Target.AddSphereZone(id, data)', description: 'Adds a sphere/circle style zone when supported by the target adapter.' },
        { type: 'target', name: 'Bridge.Target.AddEntity(entity, options)', description: 'Adds entity interactions for peds, vehicles or objects.' },
        { type: 'target', name: 'Bridge.Target.RemoveZone(id)', description: 'Removes a target/drawtext zone by id.' },
        { type: 'target', name: 'Bridge.Target.RemoveEntity(entity, labels)', description: 'Removes entity interactions when supported.' },
        { type: 'fallback', name: 'Bridge.Target.DrawText(data)', description: 'Displays a keybind/drawtext prompt when no target resource is used.' }
      ],
      frameworks: [
        { name: 'Qbox', title: 'qbx_core adapter', description: 'Uses Qbox player data, groups/jobs and modern qbx_core exports where available.' },
        { name: 'QB-Core', title: 'qb-core adapter', description: 'Supports classic QB player functions, money helpers, job data and notifications.' },
        { name: 'ESX', title: 'es_extended adapter', description: 'Supports ESX player objects, accounts, jobs and notification fallback.' },
        { name: 'vRP', title: 'vRP adapter', description: 'Prepared adapter layer for vRP-style identifiers, users and permission checks.' },
        { name: 'Target', title: 'ox/qb/drawtext adapters', description: 'Centralizes interaction zones so other scripts do not care which target system is installed.' },
        { name: 'Custom', title: 'future-proof extension point', description: 'Add custom framework or inventory logic in one adapter instead of editing all scripts.' }
      ],
      notes: [
        'Keep all framework-specific code inside client/framework or server/framework adapters.',
        'Keep target-specific logic inside client/target adapters.',
        'Do not call qbx_core, qb-core, ESX or target exports directly from other BrunxScript resources. Call the bridge instead.',
        'When adding a new framework, add a new adapter file and register it in the bridge loader.',
        'Use the documented exports and events instead of direct framework calls where possible.'
      ],
      events: [
        { type: 'client', name: 'pixel_bridge:client:notify', description: 'Optional client event wrapper for bridge notifications.' },
        { type: 'server', name: 'pixel_bridge:server:notify', description: 'Optional server event wrapper for notifying a player.' },
        { type: 'shared', name: 'pixel_bridge:ready', description: 'Can be used by resources that need to wait until the bridge has finished loading.' },
        { type: 'client', name: 'QBCore:Client:OnPlayerLoaded / qbx_core:client:playerLoaded / esx:playerLoaded', description: 'Framework player-loaded events are normalized internally by the adapter layer.' },
        { type: 'client', name: 'QBCore:Client:OnJobUpdate / qbx_core:client:onJobUpdate / esx:setJob', description: 'Framework job update events are normalized internally by the adapter layer.' }
      ],
      changelog: [
        { version: '1.0.0', date: '2026-05-27', changes: ['Initial BrunxBridge documentation release.', 'Added client API, server API, target API and framework adapter reference.', 'Added installation, configuration and usage examples.'] }
      ]
    },
    {
      slug: 'integration-examples',
      name: 'Integration Guide',
      badge: 'Guide',
      version: '1.0.0',
      status: 'Docs',
      short: 'Practical integration guide for connecting custom resources to BrunxBridge.',
      icon: 'IE',
      category: 'Integration',
      page: 'docs/integration-examples.html',
      download: '#',
      requirements: ['brunxbridge'],
      overview: [
        'This guide shows how custom resources can use BrunxBridge for notifications, callbacks, job checks and framework-safe logic.',
        'Using the bridge keeps integrations compatible with Qbox, QB-Core, ESX and other supported frameworks.',
        'Use these patterns when connecting external scripts to BrunxScript resources.'
      ],
      install: ['Ensure BrunxBridge starts before the resource that uses it.', 'Call the bridge export from client or server code.', 'Use the documented events and exports instead of direct framework-specific calls.'],
      config: `-- Client notification
exports['brunxbridge']:Notify({
  title = 'BrunxScript',
  description = 'Integration loaded successfully.',
  type = 'success'
})`,
      exports: [{ type: 'client', name: 'Notify(data)', description: 'Display a unified notification.' }],
      events: [{ type: 'shared', name: 'pixel_bridge:ready', description: 'Fired when the bridge is ready for connected resources.' }],
      changelog: [{ version: '1.0.0', date: '2026-05-27', changes: ['Initial integration guide release.'] }]
    }
  ],

  faq: [
    { q: 'Can I host this on GitHub Pages?', a: 'Yes. The documentation portal is fully static and does not require Node.js, PHP, MySQL or a build step.' },
    { q: 'What does BrunxBridge do?', a: 'BrunxBridge provides one compatibility layer for frameworks, targets, notifications, callbacks, money, items and player data.' },
    { q: 'Which frameworks are supported?', a: 'The bridge is designed for Qbox, QB-Core, ESX, vRP and standalone/custom framework setups.' }
  ]
};
