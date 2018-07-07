var myCache = "restaurant-reviews-cache-v1";
var urlsToCache = [
  "/",
  "js/sw-install.js",
  "js/dbhelper.js",
  "js/main.js",
  "js/restaurant_info.js",
  "data/restaurants.json",
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg",
  "css/styles.css"
];

self.addEventListener("install", function(event) {
  console.log("install");
  // Perform install steps
  event.waitUntil(
    caches
      .open(myCache)
      .then(function(cache) {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .then(function(res) {
        console.log("Urls added to cache");
      })
      .catch(function(...err) {
        console.error(err);
      })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    // Wait for cache
    caches.open(myCache).then(function(cache) {
      // Try to use the network first
      return fetch(event.request)
      .then(function(response) {
        // If the network is good, cache the response
        cache.put(event.request, response.clone());
        // then return the response
        return response;
      })
      .catch(function(err) {
        // If we're offline, try to return from the cache
        return caches.match(event.request)
      });
    })
  );
});
