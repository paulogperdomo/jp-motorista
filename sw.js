/* JP Motorista — service worker.
   Guarda só a "casca" do app (esta pasta) para abrir rápido e mesmo sem sinal.
   Os dados vêm sempre da API (Apps Script). Ao mudar algum arquivo daqui, subir VERSAO. */
var VERSAO = 'jp-motorista-v5';
var ARQUIVOS = ['./', './index.html', './manifest.webmanifest', './logo.webp', './icone-192.png', './icone-512.png', './favicon.png', './apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSAO).then(function (c) { return c.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSAO; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
/* Casca: rede primeiro (pega a versão nova), cache se estiver sem internet. Google (API, fontes): direto na rede. */
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    var copia = r.clone();
    caches.open(VERSAO).then(function (c) { c.put(e.request, copia); });
    return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match('./index.html'); });
  }));
});
