const CACHE_NOME = "recompensa-escolar-v5";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/calculadora.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", function (evento) {
  evento.waitUntil(
    caches.open(CACHE_NOME).then(function (cache) {
      return cache.addAll(ARQUIVOS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (evento) {
  evento.waitUntil(
    caches.keys().then(function (chaves) {
      return Promise.all(
        chaves.map(function (chave) {
          if (chave !== CACHE_NOME) {
            return caches.delete(chave);
          }
          return null;
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (evento) {
  if (evento.request.method !== "GET") {
    return;
  }

  evento.respondWith(
    caches.match(evento.request).then(function (respostaCache) {
      if (respostaCache) {
        return respostaCache;
      }

      return fetch(evento.request).then(function (respostaRede) {
        const copia = respostaRede.clone();

        caches.open(CACHE_NOME).then(function (cache) {
          cache.put(evento.request, copia);
        });

        return respostaRede;
      }).catch(function () {
        if (evento.request.mode === "navigate") {
          return caches.match("./index.html");
        }
        return undefined;
      });
    })
  );
});
