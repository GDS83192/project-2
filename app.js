loadMapsJSAPI();

function loadMapsJSAPI() {
    const googleMapsAPIKey = 'AIzaSyAN_3Kpv6EnNHhv1RTv7PMVcJ7rsWUVyG0';
    const googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runApp`;
}

function runApp() {
    console.log('Maps JS API loaded');
}

const script = document.createElement('script');
script.src = googleMapsAPIURI;
script.defer = true;
script.async = true;
window.runApp = runApp;

document.head.appendChild(script);
// AIzaSyAN_3Kpv6EnNHhv1RTv7PMVcJ7rsWUVyG0

function displayMap() {
    const mapOptions = {
        center: { lat: -33.860664, lng: 151.208138 },
        zoom: 14
    };
}

const mapDiv = document.getElementById('map');

const map = new google.maps.Map(mapDiv, mapOptions);
return map;

function runApp() {
    console.log('Maps JS API loaded');
    const map = displayMap();
}