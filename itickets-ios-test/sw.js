const CACHE='itickets-ios-v5';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim();})())});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  if(u.origin===location.origin && (u.pathname.endsWith('/')||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/app.js'))){
    e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request))); return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x.ok&&u.origin===location.origin){const c=x.clone();caches.open(CACHE).then(k=>k.put(e.request,c));}return x;})));
});
