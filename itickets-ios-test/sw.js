const CACHE='itickets-ios-v1'; const FILES=['./','./index.html','./app.js','./manifest.webmanifest','./assets/chisinau_transport_header.png','./assets/icon_bus.png','./assets/icon_trolleybus.png','./assets/icon_ticket.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(new URL(e.request.url).origin===location.origin)e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
