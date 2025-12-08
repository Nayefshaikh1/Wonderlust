// public/js/map.js

// This function will initialize a map for a listing
function initListingMap(lat, lng, MAPTILER_KEY, listingTitle, listingLocation) {
    // Fallback if coordinates are missing
    const center = (lat && lng) ? [lat, lng] : [20.5937, 78.9629]; // India
    const zoom = (lat && lng) ? 13 : 5;

    // Initialize map
    const map = L.map('map').setView(center, zoom);

    // Add MapTiler tiles
    L.tileLayer(
        `https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
        {
            attribution: '<a href="https://www.maptiler.com">© MapTiler</a> © OpenStreetMap contributors',
            tileSize: 256,
            detectRetina: true,
        }
    ).addTo(map);

    // Marker
    if (lat && lng) {
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(
            `<strong>${listingTitle}</strong><br>${listingLocation}`
        );
    }
}

// Make function available globally for EJS
window.initListingMap = initListingMap;
