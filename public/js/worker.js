self.addEventListener("push",e=>{
        const data = e.data.json();
        self.registration.showNotification(data.title,{
            body:"Notified by Kathmandu Media",
            icon:"https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg",
            vibrate:[500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]

        })
})


var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/courses/all', 
  '/courses/view',
  '/courses/add',
  '/users/register',
  'https://www.toni-develops.com/external-files/examples/service-workers/delayed-response.php',
  'https://code.jquery.com/jquery-3.3.1.min.js'
];
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('fetch', event => {
  console.log('intercepted the request to the server')  
  console.log("(9)served from service worker: ",event.request.url);
  if(event.request.method === "GET"){
    event.respondWith(fromCache(event.request));
    // update cache
    event.waitUntil(  
      update(event.request)
    );
  }
  // serve as soon as possible from cache
  
 
});
/**
 * 
 * Helper methods
 */
function fromCache(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(request);
  });
}
function update(request) {
  caches.open(CACHE_NAME).then( cache => {
    fetch(request).then( response => {
      cache.put(request, response)
    });
  });
}
