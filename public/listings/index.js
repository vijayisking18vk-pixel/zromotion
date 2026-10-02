// chennai.rent - Main Client JavaScript (Exactly like bengaluru.rent)

// 1. Supabase client setup
const { createClient } = supabase;
const SUPABASE_URL = 'https://hnnkhmfrpwdrkkjbgckv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhubmtobWZycHdkcmtramJnY2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NDk1ODgsImV4cCI6MjA5NzQyNTU4OH0.oCXDCH1J80HLb8AfQA31Fdqi-vbVN2cMdCTZm-NWngc';
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Global State Variables
let map;
let baseTileLayer;
let satelliteTileLayer;
let isSatelliteMode = false;
let pinsHidden = false;
let availableFlatsOnly = false;

let pinsData = [];
let markerLayersGroup = [];
let seekerMarkerLayersGroup = [];

let deviceId = '';
let ipHash = '';
let currentPin = null;

let isPinPlacementMode = false;
let pendingPlacementType = ''; // 'pin', 'list_whole', 'list_room', 'seek'
let pendingInterestEmail = null;
let pendingInterestPhone = null;
let pendingInterestPayload = null;

let metroLinesGroup;
let showMetro = false;

// Filter & Transaction Mode variables
let activeFilterBhk = [];
let filterRentMin = null;
let filterRentMax = null;
let filterSaleMin = null;
let filterSaleMax = null;
let filterArea = '';
let filterGated = null; // null=all, true=gated, false=standalone
let transactionMode = 'all'; // 'all', 'rent', 'sale'
let filterPropType = 'all'; // 'all', 'apartment', 'villa', 'plot'

// Currency formatter for Indian Lakhs & Crores
function formatInLakhsCrores(amount) {
    if (!amount) return '';
    const num = Number(amount);
    if (num >= 10000000) {
        return (num / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
    } else if (num >= 100000) {
        return (num / 100000).toFixed(1).replace(/\.0$/, '') + ' L';
    } else if (num >= 1000) {
        return Math.round(num / 1000) + 'k';
    }
    return '₹' + num.toLocaleString('en-IN');
}

// Local custom pins helper
function getCustomPins() {
    try {
        return JSON.parse(localStorage.getItem('chennai_custom_pins') || '[]');
    } catch {
        return [];
    }
}

function saveCustomPin(pin) {
    const pins = getCustomPins();
    pins.unshift(pin);
    localStorage.setItem('chennai_custom_pins', JSON.stringify(pins));
}

function getCustomSeekers() {
    try {
        return JSON.parse(localStorage.getItem('chennai_custom_seekers') || '[]');
    } catch {
        return [];
    }
}

function saveCustomSeeker(seek) {
    const seekers = getCustomSeekers();
    seekers.unshift(seek);
    localStorage.setItem('chennai_custom_seekers', JSON.stringify(seekers));
}

// Curated Real-world For-Sale properties in Chennai
const CHENNAI_SALE_PROPERTIES = [
    {
        id: "sale-omr-trellis",
        latitude: 12.9425,
        longitude: 80.2355,
        transaction_type: "sale",
        property_type: "apartment",
        bhk: 3,
        sale_price: 11500000,
        rent: 11500000,
        deposit: 0,
        sqft: 1450,
        furnishing: "semi",
        gated: true,
        possession: "ready",
        parking_count: 2,
        society: "Appaswamy The Trellis",
        area: "OMR",
        feedback: "Prime 3 BHK facing landscaped garden. 100% Vastu, club house, gym, 5 min from Cognizant OMR.",
        is_listing: true,
        contact_phone: "+91 98401 23456",
        contact_email: "owner.trellis@chennairents.in",
        created_at: "2026-09-20T10:00:00Z"
    },
    {
        id: "sale-annanagar-builder",
        latitude: 13.0862,
        longitude: 80.2120,
        transaction_type: "sale",
        property_type: "apartment",
        bhk: 3,
        sale_price: 24000000,
        rent: 24000000,
        deposit: 0,
        sqft: 1680,
        furnishing: "unfurnished",
        gated: false,
        possession: "ready",
        parking_count: 2,
        society: "Anna Nagar East Builder Floor",
        area: "Anna Nagar",
        feedback: "Luxury independent floor, lift, covered car parking, CMDA approved, walking distance to Metro & Tower park.",
        is_listing: true,
        contact_phone: "+91 94440 88219",
        contact_email: "annanagar.direct@chennairents.in",
        created_at: "2026-09-18T14:30:00Z"
    },
    {
        id: "sale-velachery-ceebros",
        latitude: 12.9782,
        longitude: 80.2195,
        transaction_type: "sale",
        property_type: "apartment",
        bhk: 2,
        sale_price: 7800000,
        rent: 7800000,
        deposit: 0,
        sqft: 1120,
        furnishing: "semi",
        gated: true,
        possession: "resale",
        parking_count: 1,
        society: "Ceebros Boulevard",
        area: "Velachery",
        feedback: "Spacious 2 BHK near Phoenix Marketcity. Clear title, loan available from all major banks. Zero brokerage.",
        is_listing: true,
        contact_phone: "+91 97910 44521",
        contact_email: "ceebros.owner@chennairents.in",
        created_at: "2026-09-22T08:15:00Z"
    },
    {
        id: "sale-adyar-gandhinagar",
        latitude: 13.0035,
        longitude: 80.2548,
        transaction_type: "sale",
        property_type: "apartment",
        bhk: 3,
        sale_price: 31000000,
        rent: 31000000,
        deposit: 0,
        sqft: 1850,
        furnishing: "furnished",
        gated: true,
        possession: "ready",
        parking_count: 2,
        society: "Adyar Prime Enclave",
        area: "Adyar",
        feedback: "Prestige address in Gandhi Nagar, Adyar. Italian marble, modular kitchen, generator backup, 24x7 security.",
        is_listing: true,
        contact_phone: "+91 98840 55678",
        contact_email: "adyar.home@chennairents.in",
        created_at: "2026-09-15T11:00:00Z"
    },
    {
        id: "sale-besantnagar-sea",
        latitude: 12.9995,
        longitude: 80.2678,
        transaction_type: "sale",
        property_type: "apartment",
        bhk: 4,
        sale_price: 45000000,
        rent: 45000000,
        deposit: 0,
        sqft: 2400,
        furnishing: "semi",
        gated: true,
        possession: "ready",
        parking_count: 2,
        society: "Bay View Court",
        area: "Besant Nagar",
        feedback: "Sea-breeze high-floor residence just 200m from Elliot's Beach. Expansive balconies, private foyer.",
        is_listing: true,
        contact_phone: "+91 98410 77332",
        contact_email: "besant.sea@chennairents.in",
        created_at: "2026-09-25T16:20:00Z"
    },
    {
        id: "sale-porur-dlf",
        latitude: 13.0375,
        longitude: 80.1580,
        transaction_type: "sale",
        property_type: "apartment",
        bhk: 2,
        sale_price: 5800000,
        rent: 5800000,
        deposit: 0,
        sqft: 980,
        furnishing: "unfurnished",
        gated: true,
        possession: "ready",
        parking_count: 1,
        society: "Porur Lakeview Residency",
        area: "Porur",
        feedback: "Ideal for IT professionals working at DLF / L&T. Gated complex with pool, gym, children play area.",
        is_listing: true,
        contact_phone: "+91 99620 12890",
        contact_email: "porur.direct@chennairents.in",
        created_at: "2026-09-26T09:40:00Z"
    },
    {
        id: "sale-sholinganallur-casagrand",
        latitude: 12.9025,
        longitude: 80.2285,
        transaction_type: "sale",
        property_type: "apartment",
        bhk: 3,
        sale_price: 9200000,
        rent: 9200000,
        deposit: 0,
        sqft: 1380,
        furnishing: "semi",
        gated: true,
        possession: "ready",
        parking_count: 1,
        society: "Casagrand Cloud9",
        area: "Sholinganallur",
        feedback: "Ready to move 3 BHK at Sholinganallur junction. World-class clubhouse, swimming pool, 2 mins from ELCOT SEZ.",
        is_listing: true,
        contact_phone: "+91 98845 67890",
        contact_email: "sholing.direct@chennairents.in",
        created_at: "2026-09-28T12:00:00Z"
    },
    {
        id: "sale-ecr-villa",
        latitude: 12.9110,
        longitude: 80.2520,
        transaction_type: "sale",
        property_type: "villa",
        bhk: 4,
        sale_price: 38000000,
        rent: 38000000,
        deposit: 0,
        sqft: 3200,
        furnishing: "semi",
        gated: true,
        possession: "ready",
        parking_count: 3,
        society: "Neelankarai Beachside Villa",
        area: "ECR",
        feedback: "Independent duplex beach villa with private garden, terrace gazebo, servant quarters, in gated layout.",
        is_listing: true,
        contact_phone: "+91 98408 99120",
        contact_email: "ecrvilla@chennairents.in",
        created_at: "2026-09-12T15:10:00Z"
    },
    {
        id: "sale-medavakkam-budget",
        latitude: 12.9160,
        longitude: 80.1915,
        transaction_type: "sale",
        property_type: "apartment",
        bhk: 2,
        sale_price: 4600000,
        rent: 4600000,
        deposit: 0,
        sqft: 890,
        furnishing: "unfurnished",
        gated: false,
        possession: "ready",
        parking_count: 1,
        society: "Medavakkam Green Heights",
        area: "Medavakkam",
        feedback: "Affordable 2 BHK ready to occupy. Metro station corridor, sweet groundwater, low maintenance.",
        is_listing: true,
        contact_phone: "+91 97890 33412",
        contact_email: "medavakkam.owner@chennairents.in",
        created_at: "2026-09-27T17:00:00Z"
    },
    {
        id: "sale-tambaram-house",
        latitude: 12.9255,
        longitude: 80.1275,
        transaction_type: "sale",
        property_type: "villa",
        bhk: 3,
        sale_price: 6800000,
        rent: 6800000,
        deposit: 0,
        sqft: 1500,
        furnishing: "unfurnished",
        gated: false,
        possession: "ready",
        parking_count: 1,
        society: "Tambaram East Individual House",
        area: "Tambaram",
        feedback: "Individual house with private terrace and borewell. 1.2km from Tambaram railway station.",
        is_listing: true,
        contact_phone: "+91 94441 55220",
        contact_email: "tambaram.direct@chennairents.in",
        created_at: "2026-09-29T10:45:00Z"
    },
    {
        id: "sale-tnagar-luxury",
        latitude: 13.0415,
        longitude: 80.2340,
        transaction_type: "sale",
        property_type: "apartment",
        bhk: 3,
        sale_price: 28000000,
        rent: 28000000,
        deposit: 0,
        sqft: 1750,
        furnishing: "semi",
        gated: true,
        possession: "ready",
        parking_count: 2,
        society: "Pondy Bazaar Luxury Residences",
        area: "T. Nagar",
        feedback: "Ultra prime T. Nagar location. 2 covered car parks, 100% power backup, top tier finishes.",
        is_listing: true,
        contact_phone: "+91 98414 66778",
        contact_email: "tnagar.resale@chennairents.in",
        created_at: "2026-09-24T11:20:00Z"
    }
];

// Curated Buyer Seekers in Chennai
const CHENNAI_BUYER_SEEKERS = [
    {
        id: "buyer-velachery",
        latitude: 12.9790,
        longitude: 80.2210,
        intent: "buy",
        looking_for: "whole_flat",
        max_budget: 8500000,
        min_bhk: 2,
        area: "Velachery"
    },
    {
        id: "buyer-omr",
        latitude: 12.9660,
        longitude: 80.2410,
        intent: "buy",
        looking_for: "whole_flat",
        max_budget: 11000000,
        min_bhk: 3,
        area: "Perungudi / OMR"
    },
    {
        id: "buyer-annanagar",
        latitude: 13.0845,
        longitude: 80.2095,
        intent: "buy",
        looking_for: "villa",
        max_budget: 22000000,
        min_bhk: 3,
        area: "Anna Nagar"
    }
];

// 3. Local Neighborhood Coordinates for panning
const NEIGHBOURHOOD_CENTERS = {
    "OMR": [12.9229, 80.2312],
    "Anna Nagar": [13.0850, 80.2101],
    "Adyar": [13.0012, 80.2565],
    "Velachery": [12.9796, 80.2201],
    "T. Nagar": [13.0418, 80.2341],
    "Tambaram": [12.9249, 80.1264],
    "Porur": [13.0382, 80.1565],
    "Chromepet": [12.9516, 80.1409],
    "Nungambakkam": [13.0569, 80.2425],
    "Perambur": [13.1090, 80.2440],
    "Kilpauk": [13.0805, 80.2405],
    "Mylapore": [13.0330, 80.2685],
    "Sholinganallur": [12.9010, 80.2270],
    "Perungudi": [12.9654, 80.2402],
    "Pallikaranai": [12.9463, 80.2160],
    "Ambattur": [13.1143, 80.1548],
    "Kodambakkam": [13.0475, 80.2160],
    "West Mambalam": [13.0360, 80.2200],
    "Guindy": [13.0067, 80.2206],
    "Saidapet": [13.0210, 80.2240],
    "Madipakkam": [12.9623, 80.2014],
    "Thoraipakkam": [12.9430, 80.2330],
    "Medavakkam": [12.9150, 80.1920],
    "Poonamallee": [13.0470, 80.0930],
    "Avadi": [13.1180, 80.1060],
    "ECR": [12.9100, 80.2500],
    "Besant Nagar": [13.0003, 80.2685],
    "Thiruvanmiyur": [12.9830, 80.2630],
    "Nanganallur": [12.9800, 80.1900]
};

// 3.5. Chennai Metro & MRTS Stations & Routes Coordinates
const METRO_LINES = {
    "Blue Line": {
        color: "#0072bc", // CMRL Blue
        weight: 3.5,
        opacity: 0.85,
        stations: [
            { name: "Washermanpet", coords: [13.1028, 80.2811] },
            { name: "Mannadi", coords: [13.0950, 80.2880] },
            { name: "High Court", coords: [13.0880, 80.2890] },
            { name: "Chennai Central Metro", coords: [13.0827, 80.2755] },
            { name: "Government Estate", coords: [13.0678, 80.2721] },
            { name: "LIC", coords: [13.0617, 80.2635] },
            { name: "Thousand Lights", coords: [13.0583, 80.2570] },
            { name: "AG-DMS", coords: [13.0450, 80.2486] },
            { name: "Teynampet", coords: [13.0410, 80.2443] },
            { name: "Nandanam", coords: [13.0305, 80.2435] },
            { name: "Saidapet", coords: [13.0223, 80.2294] },
            { name: "Little Mount", coords: [13.0163, 80.2227] },
            { name: "Guindy", coords: [13.0083, 80.2201] },
            { name: "Alandur", coords: [13.0038, 80.2014] },
            { name: "Nanganallur Road", coords: [12.9897, 80.1775] },
            { name: "Meenambakkam", coords: [12.9868, 80.1762] },
            { name: "Chennai Airport", coords: [12.9806, 80.1652] }
        ]
    },
    "Green Line": {
        color: "#009639", // CMRL Green
        weight: 3.5,
        opacity: 0.85,
        stations: [
            { name: "Chennai Central Metro", coords: [13.0827, 80.2755] },
            { name: "Egmore Metro", coords: [13.0782, 80.2618] },
            { name: "Nehru Park", coords: [13.0792, 80.2520] },
            { name: "Kilpauk", coords: [13.0787, 80.2413] },
            { name: "Shenoy Nagar", coords: [13.0789, 80.2272] },
            { name: "Anna Nagar East", coords: [13.0842, 80.2185] },
            { name: "Anna Nagar Tower", coords: [13.0853, 80.2104] },
            { name: "Thirumangalam", coords: [13.0851, 80.1994] },
            { name: "Koyambedu", coords: [13.0735, 80.1950] },
            { name: "Arumbakkam", coords: [13.0617, 80.2117] },
            { name: "Vadapalani", coords: [13.0504, 80.2119] },
            { name: "Ashok Nagar", coords: [13.0354, 80.2118] },
            { name: "Ekkattuthangal", coords: [13.0169, 80.2064] },
            { name: "Alandur", coords: [13.0038, 80.2014] },
            { name: "St. Thomas Mount", coords: [13.0055, 80.2001] }
        ]
    },
    "MRTS Line": {
        color: "#d97706", // MRTS Orange
        weight: 2.8,
        opacity: 0.75,
        stations: [
            { name: "Chennai Beach", coords: [13.0963, 80.2917] },
            { name: "Chennai Fort", coords: [13.0881, 80.2862] },
            { name: "Chennai Park Town", coords: [13.0822, 80.2789] },
            { name: "Chintadripet", coords: [13.0772, 80.2741] },
            { name: "Chepauk", coords: [13.0645, 80.2818] },
            { name: "Triplicane", coords: [13.0577, 80.2798] },
            { name: "Light House", coords: [13.0396, 80.2790] },
            { name: "Thirumayilai", coords: [13.0335, 80.2690] },
            { name: "Mandaveli", coords: [13.0232, 80.2635] },
            { name: "Greenways Road", coords: [13.0205, 80.2520] },
            { name: "Kotturpuram", coords: [13.0182, 80.2443] },
            { name: "Kasturiba Nagar", coords: [13.0076, 80.2528] },
            { name: "Indira Nagar", coords: [12.9978, 80.2543] },
            { name: "Thiruvanmiyur", coords: [12.9890, 80.2530] },
            { name: "Taramani", coords: [12.9785, 80.2458] },
            { name: "Perungudi", coords: [12.9691, 80.2396] },
            { name: "Velachery", coords: [12.9796, 80.2201] }
        ]
    }
};

// 4. Initialize Application
document.addEventListener("DOMContentLoaded", async () => {
    initDeviceId();
    await fetchIpAndHash();
    initMap();
    initSearch();
    await loadPins();
    await loadStats();
    loadFaqs();
    
    // Check if new user -> Show onboarding modal
    if (!localStorage.getItem('chennai_rent_onboarded')) {
        openModal('welcome-modal');
    }
});

// Device ID setup
function initDeviceId() {
    let id = localStorage.getItem('chennai_device_id');
    if (!id) {
        // Generate pseudo-UUID
        id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        localStorage.setItem('chennai_device_id', id);
    }
    deviceId = id;
}

// Fetch IP and compute SHA-256 hash client-side
async function fetchIpAndHash() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        const ip = data.ip;
        
        // Hashing via Web Crypto API
        const msgBuffer = new TextEncoder().encode(ip);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        ipHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
        console.warn("IP fetch error, defaulting to randomized string hash", e);
        ipHash = deviceId;
    }
}

// 5. Initialize Leaflet Map
function initMap() {
    map = L.map('map', {
        zoomControl: false,
        attributionControl: true
    }).setView([13.0827, 80.2707], 12);

    // OpenStreetMap Standard Bright Style
    baseTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Satellite Imagery Layer (Standard Esri Satellite tiles)
    satelliteTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Map Click Listener for placing pins
    map.on('click', (e) => {
        if (isPinPlacementMode) {
            handlePinPlacementClick(e.latlng.lat, e.latlng.lng);
        }
    });

    // ── PIN DETAIL: Document-level event delegation ──────────────────────────
    // Leaflet's marker click zone doesn't always cover the visually-transformed
    // .pin-marker label. Listening on document guarantees we catch the click
    // wherever the user actually taps/clicks the visible price label.
    document.addEventListener('click', (e) => {
        if (isPinPlacementMode) return;
        const pinEl = e.target.closest('[id^="pin-id-"]');
        if (!pinEl) return;
        e.stopPropagation();
        const pinId = pinEl.id.replace('pin-id-', '');
        const pin = pinsData.find(p => p.id === pinId);
        if (pin) openPinDetail(pin);
    });

    // Initialize Metro & MRTS Lines
    metroLinesGroup = L.layerGroup();
    initMetroLines();
}

// Search Inputs Handling
function initSearch() {
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        // Match with neighbourhood coordinates
        for (const [name, coords] of Object.entries(NEIGHBOURHOOD_CENTERS)) {
            if (name.toLowerCase().includes(query)) {
                map.setView(coords, 14);
                break;
            }
        }
    });
}

// 6. Pin Placement Flow
window.startPinFlow = function() {
    // User clicks Pin My Rent
    closeAllModals();
    enterPinPlacementMode('pin');
};

window.startOwnerFlow = function() {
    // Owner clicks List My Flat
    closeAllModals();
    enterPinPlacementMode('list_whole'); // Default starting whole, selector handles room
};

window.startSeekerFlow = function() {
    // Seeker clicks Find a Flat
    closeAllModals();
    enterPinPlacementMode('seek');
};

window.openFilters = function() {
    openModal('filter-modal');
};

function enterPinPlacementMode(type) {
    isPinPlacementMode = true;
    pendingPlacementType = type;

    // Show banners and overlays
    document.getElementById("pin-mode-banner").style.display = 'flex';
    document.getElementById("tap-hint").style.display = 'block';
    
    // Add crosshair cursor styling to map
    const mapEl = document.getElementById("map");
    if (mapEl) mapEl.classList.add("pin-placement-active");
    
    // Set banner action text
    let actionLabel = 'Pin My Rent';
    if (type === 'seek') {
        actionLabel = 'Find a Flat Alert';
    } else if (type === 'list_whole' || type === 'list_room') {
        actionLabel = 'List Property';
    }
    document.getElementById("pmb-action").innerText = `Tap anywhere on the map to set coordinates for ${actionLabel}`;
}

window.cancelPinMode = function() {
    isPinPlacementMode = false;
    pendingPlacementType = '';
    document.getElementById("pin-mode-banner").style.display = 'none';
    document.getElementById("tap-hint").style.display = 'none';
    
    // Remove crosshair cursor styling from map
    const mapEl = document.getElementById("map");
    if (mapEl) mapEl.classList.remove("pin-placement-active");
};

function handlePinPlacementClick(lat, lng) {
    isPinPlacementMode = false;
    document.getElementById("pin-mode-banner").style.display = 'none';
    document.getElementById("tap-hint").style.display = 'none';
    
    // Remove crosshair cursor styling from map
    const mapEl = document.getElementById("map");
    if (mapEl) mapEl.classList.remove("pin-placement-active");

    if (pendingPlacementType === 'seek') {
        document.getElementById("sa-lat").value = lat.toFixed(5);
        document.getElementById("sa-lng").value = lng.toFixed(5);
        openModal("seeker-add-modal");
    } else if (pendingPlacementType === 'list_whole' || pendingPlacementType === 'list_room' || pendingPlacementType === 'list_sell') {
        // Open L2 Type Selector
        document.getElementById("ow-lat").value = lat.toFixed(5);
        document.getElementById("ow-lng").value = lng.toFixed(5);
        document.getElementById("or-lat").value = lat.toFixed(5);
        document.getElementById("or-lng").value = lng.toFixed(5);
        const osLat = document.getElementById("os-lat");
        const osLng = document.getElementById("os-lng");
        if (osLat) osLat.value = lat.toFixed(5);
        if (osLng) osLng.value = lng.toFixed(5);
        openModal("owner-type-modal");
    } else {
        // Default Plain Anonymous pin
        document.getElementById("pa-lat").value = lat.toFixed(5);
        document.getElementById("pa-lng").value = lng.toFixed(5);
        openModal("pin-add-modal");
    }
}

// 7. Supabase Database Fetches & Renders
async function loadPins() {
    try {
        // Clear existing markers
        markerLayersGroup.forEach(marker => map.removeLayer(marker));
        markerLayersGroup = [];
        seekerMarkerLayersGroup.forEach(marker => map.removeLayer(marker));
        seekerMarkerLayersGroup = [];

        // Fetch non-flagged pins from Supabase view
        let remotePins = [];
        try {
            const { data: pins, error } = await db
                .from('pins_public')
                .select('*');
            if (!error && pins) remotePins = pins;
        } catch (dbErr) {
            console.warn("Supabase fetch notice, using fallback datasets:", dbErr);
        }

        // Parse any for-sale pins encoded in database feedback
        remotePins.forEach(p => {
            if (p.feedback && p.feedback.includes('[FOR_SALE')) {
                const match = p.feedback.match(/\[FOR_SALE:(\d+):?([a-zA-Z]*)\]/);
                if (match) {
                    p.transaction_type = 'sale';
                    p.sale_price = parseFloat(match[1]);
                    if (match[2]) p.property_type = match[2];
                }
            }
        });

        // Combine Curated Chennai Sale properties + Supabase pins + Locally saved user pins
        const customPins = getCustomPins();
        const combinedPinsMap = new Map();
        [...CHENNAI_SALE_PROPERTIES, ...remotePins, ...customPins].forEach(item => {
            combinedPinsMap.set(item.id, item);
        });
        const allPins = Array.from(combinedPinsMap.values());
        pinsData = allPins;

        // Render markers if not hidden
        if (!pinsHidden) {
            allPins.forEach(pin => {
                // Apply filters on client-side rendering
                if (!matchesFilters(pin)) return;

                const isSale = pin.transaction_type === 'sale' || (pin.feedback && pin.feedback.includes('[FOR_SALE'));
                let labelText = '';
                let gatedClass = '';

                if (isSale) {
                    const saleAmt = pin.sale_price || pin.rent;
                    labelText = '🏷️ ' + formatInLakhsCrores(saleAmt);
                    gatedClass = 'for-sale';
                } else {
                    const rentK = Math.round(pin.rent / 1000) + 'k';
                    gatedClass = pin.is_listing ? 'listing' : (pin.gated ? 'gated' : 'not-gated');
                    const labelIcon = pin.is_listing ? '🏠 ' : '';
                    labelText = `${labelIcon}${rentK}`;
                }

                const marker = L.marker([pin.latitude, pin.longitude], {
                    icon: L.divIcon({
                        className: 'custom-pin-marker-wrapper',
                        html: `<div class="pin-marker" id="pin-id-${pin.id}" onclick="_pinClick('${pin.id}')">
                                 <div class="pin-label ${gatedClass}">
                                    ${labelText}
                                 </div>
                                 <div class="pin-caret ${gatedClass}"></div>
                               </div>`,
                        iconSize: [46, 30],
                        iconAnchor: [23, 30]
                    })
                });

                // Attach direct click event listener as a backup
                marker.on('click', () => {
                    if (isPinPlacementMode) return;
                    openPinDetail(pin);
                });
                marker.addTo(map);
                markerLayersGroup.push(marker);
            });
        }
        
        // Fetch and Render active seeker & buyer pins
        let remoteSeekers = [];
        try {
            const { data: seekers, error: seekerError } = await db
                .from('seeker_pins_public')
                .select('*');
            if (!seekerError && seekers) remoteSeekers = seekers;
        } catch (sErr) {
            console.warn("Seeker fetch notice:", sErr);
        }

        const customSeekers = getCustomSeekers();
        const allSeekers = [...CHENNAI_BUYER_SEEKERS, ...remoteSeekers, ...customSeekers];

        allSeekers.forEach(seek => {
            const isBuyer = seek.intent === 'buy' || seek.max_budget > 1000000;
            
            // Respect transaction mode filter on seeker pins
            if (transactionMode === 'rent' && isBuyer) return;
            if (transactionMode === 'sale' && !isBuyer) return;

            const seekerLabel = isBuyer ? `🔍 Buy ${formatInLakhsCrores(seek.max_budget)}` : `🔍 Rent ${Math.round(seek.max_budget / 1000)}k`;
            const seekerClass = isBuyer ? 'buyer' : 'seeker';

            const marker = L.marker([seek.latitude, seek.longitude], {
                icon: L.divIcon({
                    className: 'custom-pin-marker-wrapper',
                    html: `<div class="pin-marker seeker-pin">
                             <div class="pin-label ${seekerClass}">
                                ${seekerLabel}
                             </div>
                             <div class="pin-caret ${seekerClass}"></div>
                           </div>`,
                    iconSize: [46, 30],
                    iconAnchor: [23, 30]
                })
            });
            marker.addTo(map);
            seekerMarkerLayersGroup.push(marker);
        });

    } catch (e) {
        console.error("Error loading map pins:", e);
    }
}

// Client side filtering checks
function matchesFilters(pin) {
    const isSale = pin.transaction_type === 'sale' || (pin.feedback && pin.feedback.includes('[FOR_SALE'));

    // Transaction Mode ('all', 'rent', 'sale')
    if (transactionMode === 'rent' && isSale) return false;
    if (transactionMode === 'sale' && !isSale) return false;

    // Property Type
    if (filterPropType !== 'all') {
        const pType = (pin.property_type || 'apartment').toLowerCase();
        if (filterPropType === 'apartment' && !pType.includes('apartment') && !pType.includes('flat')) return false;
        if (filterPropType === 'villa' && !pType.includes('villa') && !pType.includes('house')) return false;
        if (filterPropType === 'plot' && !pType.includes('plot') && !pType.includes('land')) return false;
    }

    // BHK checks
    if (activeFilterBhk.length > 0) {
        if (!pin.bhk || !activeFilterBhk.includes(pin.bhk)) return false;
    }
    
    // Rent limits
    if (!isSale) {
        if (filterRentMin && pin.rent < filterRentMin) return false;
        if (filterRentMax && pin.rent > filterRentMax) return false;
    }

    // Sale limits (in Lakhs * 100000)
    if (isSale) {
        const saleAmt = pin.sale_price || pin.rent;
        if (filterSaleMin && saleAmt < filterSaleMin * 100000) return false;
        if (filterSaleMax && saleAmt > filterSaleMax * 100000) return false;
    }
    
    // Locality area
    if (filterArea && pin.area && pin.area.toLowerCase() !== filterArea.toLowerCase()) return false;
    
    // Gated status
    if (filterGated !== null && pin.gated !== filterGated) return false;

    // Available Listings only
    if (availableFlatsOnly && !pin.is_listing) return false;

    return true;
}

// Load and render stats views
async function loadStats() {
    try {
        const { data: cityStats, error } = await db
            .from('city_stats')
            .select('*')
            .order('bhk', { ascending: true });

        if (error) throw error;

        const container = document.getElementById("stats-list-container");
        container.innerHTML = '';

        cityStats.forEach(row => {
            const div = document.createElement("div");
            div.className = "stats-row";
            div.innerHTML = `
                <span class="stats-row-label">${row.bhk} BHK City Average</span>
                <span class="stats-row-value">₹${Math.round(row.avg_rent).toLocaleString('en-IN')} / month</span>
            `;
            container.appendChild(div);
        });

    } catch (e) {
        console.error("Error loading stats views:", e);
    }
}

// 8. Pin Details, Ratings & Comments Actions
// Global pin-click handler: called from inline onclick on .pin-marker divs
// This bypasses the Leaflet hit-zone limitation (CSS transform moves visual outside wrapper)
window._pinClick = function(pinId) {
    if (isPinPlacementMode) return; // don't open detail during placement
    const pin = pinsData.find(p => p.id === pinId);
    if (pin) openPinDetail(pin);
};

async function openPinDetail(pin) {
    // Guard: open modal immediately so user sees something, then populate
    try {
        currentPin = pin;
        const isSale = pin.transaction_type === 'sale' || (pin.feedback && pin.feedback.includes('[FOR_SALE'));
        const saleAmt = pin.sale_price || pin.rent;

        if (isSale) {
            document.getElementById("detail-area-label").innerText = `FOR SALE • ${pin.area ? pin.area.toUpperCase() : 'CHENNAI'}`;
            document.getElementById("detail-rent-label").innerText = `₹${Number(saleAmt).toLocaleString('en-IN')} (${formatInLakhsCrores(saleAmt)})`;
        } else {
            document.getElementById("detail-area-label").innerText = `FOR RENT • ${pin.area ? pin.area.toUpperCase() : 'CHENNAI'}`;
            document.getElementById("detail-rent-label").innerText = `₹${Number(pin.rent).toLocaleString('en-IN')} /mo`;
        }

        // Society row
        if (pin.society) {
            document.getElementById("detail-society-row").style.display = 'block';
            document.getElementById("detail-society").innerText = pin.society;
        } else {
            document.getElementById("detail-society-row").style.display = 'none';
        }

        // Security deposit / Booking token
        const depositLabel = document.getElementById("detail-deposit-label");
        const maintenanceLabel = document.getElementById("detail-maintenance-label");
        const occupantLabel = document.getElementById("detail-occupant-label");

        if (isSale) {
            if (depositLabel) depositLabel.innerText = "💰 Token Advance:";
            if (maintenanceLabel) maintenanceLabel.innerText = "🔑 Possession Status:";
            if (occupantLabel) occupantLabel.innerText = "🏢 Property Type:";
            document.getElementById("detail-deposit").innerText = `₹${Math.round(saleAmt * 0.1).toLocaleString('en-IN')} (10%)`;
        } else {
            if (depositLabel) depositLabel.innerText = "💰 Security Deposit:";
            if (maintenanceLabel) maintenanceLabel.innerText = "🔧 Maintenance:";
            if (occupantLabel) occupantLabel.innerText = "👥 Tenant Category:";
            document.getElementById("detail-deposit").innerText = pin.deposit && Number(pin.deposit) > 0 ? `₹${Number(pin.deposit).toLocaleString('en-IN')}` : 'Not Specified';
        }

        // Maintenance / Possession status
        if (isSale) {
            document.getElementById("detail-maintenance").innerText = pin.possession ? pin.possession.replace('_', ' ').toUpperCase() : 'READY TO MOVE';
        } else {
            document.getElementById("detail-maintenance").innerText = pin.maintenance_included ? 'Included in Rent' : 'Not Included / Additional';
        }

        // Parking count
        document.getElementById("detail-parking").innerText = pin.parking_count > 0 ? `${pin.parking_count} car spot(s)` : 'No Parking';

        // Sqft row & rate per sqft
        if (pin.sqft) {
            document.getElementById("detail-sqft-row").style.display = 'block';
            if (isSale) {
                const ratePerSqft = Math.round(saleAmt / pin.sqft);
                document.getElementById("detail-sqft").innerText = `${pin.sqft} sq.ft (₹${ratePerSqft.toLocaleString('en-IN')}/sq.ft)`;
            } else {
                document.getElementById("detail-sqft").innerText = `${pin.sqft} sq.ft`;
            }
        } else {
            document.getElementById("detail-sqft-row").style.display = 'none';
        }

        // Pets row
        if (pin.pets_allowed && !isSale) {
            document.getElementById("detail-pets-row").style.display = 'block';
            let petsText = '--';
            if (pin.pets_allowed === 'yes') petsText = 'Allowed 🐕';
            else if (pin.pets_allowed === 'no') petsText = 'Not Allowed 🚫';
            else if (pin.pets_allowed === 'not_sure') petsText = 'Not Sure 🤷';
            document.getElementById("detail-pets").innerText = petsText;
        } else {
            document.getElementById("detail-pets-row").style.display = 'none';
        }

        document.getElementById("detail-occupant").innerText = isSale ? (pin.property_type || 'Apartment').toUpperCase() : (pin.occupant_type ? pin.occupant_type.charAt(0).toUpperCase() + pin.occupant_type.slice(1) : 'Not Specified');
        document.getElementById("detail-feedback").innerText = pin.feedback || 'No description provided.';

        // Populate Badges
        const badgesContainer = document.getElementById("detail-badges-container");
        badgesContainer.innerHTML = '';

        if (isSale) {
            const saleBadge = document.createElement("span");
            saleBadge.className = "badge sale";
            saleBadge.innerText = "🏷️ FOR SALE";
            badgesContainer.appendChild(saleBadge);

            const propBadge = document.createElement("span");
            propBadge.className = "badge violet";
            propBadge.innerText = (pin.property_type || 'Apartment').toUpperCase();
            badgesContainer.appendChild(propBadge);

            if (pin.bhk) {
                const bhkBadge = document.createElement("span");
                bhkBadge.className = "badge amber";
                bhkBadge.innerText = `${pin.bhk} BHK`;
                badgesContainer.appendChild(bhkBadge);
            }

            const gatedBadge = document.createElement("span");
            gatedBadge.className = "badge green";
            gatedBadge.innerText = pin.gated ? 'GATED' : 'STANDALONE';
            badgesContainer.appendChild(gatedBadge);
        } else {
            const furnishingBadge = document.createElement("span");
            furnishingBadge.className = "badge green";
            furnishingBadge.innerText = pin.furnishing ? pin.furnishing.toUpperCase() : 'NOT SPECIFIED';
            badgesContainer.appendChild(furnishingBadge);

            const gatedBadge = document.createElement("span");
            gatedBadge.className = "badge violet";
            gatedBadge.innerText = pin.gated ? 'GATED' : 'STANDALONE';
            badgesContainer.appendChild(gatedBadge);

            if (pin.is_listing) {
                const listingBadge = document.createElement("span");
                listingBadge.className = "badge amber";
                listingBadge.innerText = pin.looking_for_flatmate ? 'ROOM AVLB' : 'WHOLE FLAT';
                badgesContainer.appendChild(listingBadge);
            }
        }

        // Show direct contact actions for listings (both Sale & Rent)
        if (pin.is_listing || isSale) {
            document.getElementById("detail-express-interest-container").style.display = 'block';

            // Seed non-sale pins might show as booked
            const isSeed = !isSale && ((pin.device_id && pin.device_id.startsWith('00000000-0000-0000-0000-0000000000')) || pin.ip_hash === 'seed');
            if (isSeed) {
                document.getElementById("detail-booked-banner").style.display = 'flex';
                document.getElementById("detail-interest-form-wrap").style.display = 'none';
            } else {
                document.getElementById("detail-booked-banner").style.display = 'none';
                document.getElementById("detail-interest-form-wrap").style.display = 'block';

                // Update section heading and button text
                const headingEl = document.querySelector("#detail-interest-form-wrap .section-heading");
                if (headingEl) {
                    headingEl.innerText = isSale ? "Express Interest to Buy / Contact Seller" : "Express Interest in this Flat";
                }
                const submitBtn = document.querySelector("#express-interest-form button[type='submit']");
                if (submitBtn) {
                    submitBtn.innerText = isSale ? "Send Buyer Inquiry (0% Brokerage)" : "Express Interest (Free)";
                    submitBtn.style.background = isSale ? "#8B263E" : "";
                }

                // Call / WhatsApp button if contact phone available
                const contactPhone = pin.contact_phone || pin.phone;
                let phoneBtn = document.getElementById("direct-contact-action-btn");
                if (!phoneBtn) {
                    phoneBtn = document.createElement("a");
                    phoneBtn.id = "direct-contact-action-btn";
                    phoneBtn.style.cssText = "display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-bottom: 12px; background: #2F7D4F; color: white; text-decoration: none; font-weight: 700; padding: 12px; border-radius: 10px; font-family: var(--font-heading);";
                    document.getElementById("detail-interest-form-wrap").prepend(phoneBtn);
                }
                if (contactPhone) {
                    phoneBtn.href = `tel:${contactPhone.replace(/\s+/g, '')}`;
                    phoneBtn.innerHTML = `📞 Call / WhatsApp Direct: ${contactPhone}`;
                    phoneBtn.style.display = 'flex';
                } else {
                    phoneBtn.style.display = 'none';
                }

                // Populate Form Fields
                document.getElementById("ei-lat").value = pin.latitude;
                document.getElementById("ei-lng").value = pin.longitude;
                document.getElementById("ei-bhk").value = pin.bhk || 2;
                document.getElementById("ei-type").value = isSale ? 'sale' : (pin.looking_for_flatmate ? 'room' : 'whole_flat');
                document.getElementById("ei-budget").value = saleAmt;

                resetFormChips('ei-move', 'flexible');
                selectFormChip('ei-move', 'flexible');
                resetFormChips('ei-gender', null);
                resetFormChips('ei-parking', 'yes');
                selectFormChip('ei-parking', 'yes');
            }
        } else {
            document.getElementById("detail-express-interest-container").style.display = 'none';
        }

        // Toggle Owner Delete row
        const deleteRow = document.getElementById("detail-owner-actions");
        if (pin.device_id === deviceId) {
            deleteRow.style.display = 'block';
        } else {
            deleteRow.style.display = 'none';
        }

        // Open modal immediately so user sees it while ratings load
        openModal("pin-detail-modal");

        // Highlight pin on map
        const activeMarkerDom = document.getElementById(`pin-id-${pin.id}`);
        if (activeMarkerDom) {
            activeMarkerDom.classList.add("highlighted");
        }

        // Load ratings & comments async (modal is already open)
        await loadPinRatingsAndComments(pin.id);

    } catch (err) {
        console.error("openPinDetail error:", err);
        // Still try to open the modal even if something went wrong
        openModal("pin-detail-modal");
    }
}

async function loadPinRatingsAndComments(pinId) {
    try {
        // Load Averages Ratings
        const { data: ratingData, error: ratingError } = await db
            .from('ratings')
            .select('locality_rating, quality_rating')
            .eq('pin_id', pinId);

        if (!ratingError && ratingData && ratingData.length > 0) {
            const avgLocality = ratingData.reduce((acc, curr) => acc + curr.locality_rating, 0) / ratingData.length;
            const avgQuality = ratingData.reduce((acc, curr) => acc + curr.quality_rating, 0) / ratingData.length;

            document.getElementById("label-locality-rating").innerText = `${avgLocality.toFixed(1)} / 5 ★ (${ratingData.length} ratings)`;
            document.getElementById("label-quality-rating").innerText = `${avgQuality.toFixed(1)} / 5 ★ (${ratingData.length} ratings)`;
        } else {
            document.getElementById("label-locality-rating").innerText = 'No Ratings';
            document.getElementById("label-quality-rating").innerText = 'No Ratings';
        }

        // Highlight stars if already rated by this IP hash
        resetRatingStars();
        const { data: myRating, error: myRatingError } = await db
            .from('ratings')
            .select('locality_rating, quality_rating')
            .eq('pin_id', pinId)
            .eq('ip_hash', ipHash)
            .maybeSingle();

        if (!myRatingError && myRating) {
            highlightRatingStars(myRating.locality_rating); // Highlight based on local rating
        }

        // Load Comments
        const { data: comments, error: commentError } = await db
            .from('comments')
            .select('*')
            .eq('pin_id', pinId)
            .order('created_at', { ascending: true });

        const commentsContainer = document.getElementById("detail-comments-container");
        commentsContainer.innerHTML = '';

        if (!commentError && comments && comments.length > 0) {
            comments.forEach(c => {
                const div = document.createElement("div");
                div.className = "comment-bubble";
                div.innerHTML = `
                    <p class="comment-text">${escapeHtml(c.content)}</p>
                    <p class="comment-time">${new Date(c.created_at).toLocaleString()}</p>
                `;
                commentsContainer.appendChild(div);
            });
        } else {
            commentsContainer.innerHTML = `<p style="font-size:13px; color:var(--c-ink-muted); text-align:center; padding:14px 0; font-style:italic;">No comments posted yet.</p>`;
        }

    } catch (e) {
        console.error("Error loading pin details:", e);
    }
}

// Submit comment
document.getElementById("comment-add-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentPin) return;

    const input = document.getElementById("comment-content");
    const content = input.value.trim();
    if (!content) return;

    try {
        const { error } = await db
            .from('comments')
            .insert({
                pin_id: currentPin.id,
                content: content,
                ip_hash: ipHash
            });

        if (error) throw error;

        input.value = '';
        await loadPinRatingsAndComments(currentPin.id);
    } catch (err) {
        alert("Error posting comment: " + err.message);
    }
});

// Interactive ratings
window.ratePin = async function(stars) {
    if (!currentPin) return;

    try {
        const { data, error } = await db.rpc('submit_rating', {
            p_pin_id: currentPin.id,
            p_locality_rating: stars,
            p_quality_rating: stars, // Simplicity: rate both same for quick click
            p_ip_hash: ipHash
        });

        if (error) throw error;

        highlightRatingStars(stars);
        await loadPinRatingsAndComments(currentPin.id);
    } catch (err) {
        console.error(err);
    }
};

function highlightRatingStars(stars) {
    resetRatingStars();
    const starSpans = document.querySelectorAll("#rating-stars-container .rating-star");
    for (let i = 0; i < stars; i++) {
        starSpans[i].classList.add("active");
    }
}

function resetRatingStars() {
    const starSpans = document.querySelectorAll("#rating-stars-container .rating-star");
    starSpans.forEach(s => s.classList.remove("active"));
}

// Report flag
window.reportCurrentPin = async function() {
    if (!currentPin) return;

    if (confirm("Are you sure you want to report this pin as incorrect or outlier?")) {
        try {
            const { data, error } = await db.rpc('handle_report', {
                p_pin_id: currentPin.id,
                p_ip_hash: ipHash
            });

            if (error) throw error;

            alert("Pin reported. Statistical outliers are auto-flagged and hidden after 3 flags.");
            closeModal("pin-detail-modal");
            await loadPins();
        } catch (err) {
            alert(err.message);
        }
    }
};

// Delete pin
window.deleteCurrentPin = async function() {
    if (!currentPin) return;

    if (confirm("Are you sure you want to permanently delete your pin?")) {
        try {
            const { data, error } = await db.rpc('delete_pin', {
                p_pin_id: currentPin.id,
                p_device_id: deviceId
            });

            if (error) throw error;

            if (data.success) {
                alert("Pin deleted successfully.");
                closeModal("pin-detail-modal");
                await loadPins();
                await loadStats();
            } else {
                alert("You do not have permission to delete this pin.");
            }
        } catch (err) {
            alert(err.message);
        }
    }
};

// Form selectors helpers
let selectedChips = {};
window.selectFormChip = function(group, val) {
    // If clicking already selected chip for optional fields, toggle it off
    const isOptional = ['pa-occupant', 'pa-pets'].includes(group);
    if (isOptional && selectedChips[group] === val) {
        selectedChips[group] = null;
        const container = document.getElementById(`${group}-chips`);
        if (container) {
            const chips = container.querySelectorAll(".option-chip");
            chips.forEach(chip => chip.classList.remove("active"));
        }
        return;
    }

    selectedChips[group] = val;
    
    // Toggle active state in UI
    const container = document.getElementById(`${group}-chips`);
    if (container) {
        const chips = container.querySelectorAll(".option-chip");
        chips.forEach(chip => {
            const onclickAttr = chip.getAttribute("onclick");
            if (onclickAttr && onclickAttr.includes(`'${val}'`)) {
                chip.classList.add("active");
            } else {
                chip.classList.remove("active");
            }
        });
    }
};

window.toggleFormSwitch = function(id) {
    const input = document.getElementById(id);
    const toggleEl = document.getElementById(`${id}-switch`);
    if (input && toggleEl) {
        const turnOn = input.value !== 'true';
        input.value = turnOn ? 'true' : 'false';
        if (turnOn) {
            toggleEl.classList.add('on');
        } else {
            toggleEl.classList.remove('on');
        }
    }
};

window.switchFromPinToListing = function() {
    const lat = document.getElementById("pa-lat").value;
    const lng = document.getElementById("pa-lng").value;
    document.getElementById("ow-lat").value = lat;
    document.getElementById("ow-lng").value = lng;
    document.getElementById("or-lat").value = lat;
    document.getElementById("or-lng").value = lng;
    const osLat = document.getElementById("os-lat");
    const osLng = document.getElementById("os-lng");
    if (osLat) osLat.value = lat;
    if (osLng) osLng.value = lng;
    closeModal("pin-add-modal");
    openModal("owner-type-modal");
};

window.switchFromPinToSeeker = function() {
    const lat = document.getElementById("pa-lat").value;
    const lng = document.getElementById("pa-lng").value;
    document.getElementById("sa-lat").value = lat;
    document.getElementById("sa-lng").value = lng;
    closeModal("pin-add-modal");
    openModal("seeker-add-modal");
};

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Pin Add Form (Plain anonymous contribution - Rent or Sale)
document.getElementById("pin-add-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("pa-email").value.trim();
    if (!email) {
        alert("Email is compulsory to drop a pin.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const paModeInput = document.getElementById("pa-mode");
    const isSale = paModeInput && paModeInput.value === 'sale';
    const rent = parseFloat(document.getElementById("pa-rent").value);
    const bhk = parseInt(selectedChips['pa-bhk'] || '1');

    if (isSale) {
        if (!rent || rent < 500000 || rent > 500000000) {
            alert("Please enter a realistic property sale price between ₹5 Lakhs and ₹50 Crores.");
            return;
        }

        const salePin = {
            id: 'pin-sale-' + Date.now(),
            latitude: parseFloat(document.getElementById("pa-lat").value),
            longitude: parseFloat(document.getElementById("pa-lng").value),
            bhk: bhk,
            rent: rent,
            sale_price: rent,
            transaction_type: 'sale',
            property_type: 'apartment',
            society: null,
            gated: (selectedChips['pa-gated'] || 'true') === 'true',
            sqft: parseInt(document.getElementById("pa-sqft").value) || null,
            parking_count: parseInt(document.getElementById("pa-parking").value) || 0,
            feedback: `[FOR_SALE:${rent}:apartment] ` + (document.getElementById("pa-feedback").value || `Tenant/Buyer reported sale valuation for ${bhk} BHK`),
            email: email,
            created_at: new Date().toISOString()
        };
        saveCustomPin(salePin);

        try {
            await db.rpc('create_pin', {
                p_lat: salePin.latitude,
                p_lng: salePin.longitude,
                p_bhk: bhk,
                p_rent: rent,
                p_deposit: 0,
                p_furnishing: selectedChips['pa-furnishing'] || 'unfurnished',
                p_gated: salePin.gated,
                p_occupant_type: 'apartment',
                p_society: null,
                p_feedback: salePin.feedback,
                p_maintenance_included: false,
                p_pets_allowed: null,
                p_sqft: salePin.sqft,
                p_email: email,
                p_parking_count: salePin.parking_count,
                p_device_id: deviceId,
                p_ip_hash: ipHash
            });
        } catch (err) {
            console.warn("Supabase sale pin sync notice:", err);
        }

        alert("Sale price pin dropped anonymously! Thank you for contributing to Chennai real estate transparency.");
        closeModal("pin-add-modal");
        document.getElementById("pin-add-form").reset();
        await loadPins();
        return;
    }

    // Bounds check limit triggers for Rent
    if (bhk === 1 && (rent < 5000 || rent > 80000)) {
        alert("Rent for 1BHK must be between ₹5,000 and ₹80,000"); return;
    } else if (bhk === 2 && (rent < 8000 || rent > 150000)) {
        alert("Rent for 2BHK must be between ₹8,000 and ₹1,50,000"); return;
    } else if (bhk === 3 && (rent < 15000 || rent > 300000)) {
        alert("Rent for 3BHK must be between ₹15,000 and ₹3,00,000"); return;
    }

    // Rate Limit Checks
    const { data: isLimitHit, error: limitErr } = await db.rpc('check_pin_limit', { p_ip_hash: ipHash });
    if (!limitErr && isLimitHit) {
        alert("Submission limit reached. Max 3 pins per 24 hours.");
        return;
    }

    const payload = {
        p_lat: parseFloat(document.getElementById("pa-lat").value),
        p_lng: parseFloat(document.getElementById("pa-lng").value),
        p_bhk: bhk,
        p_rent: rent,
        p_deposit: parseFloat(document.getElementById("pa-deposit").value) || 0,
        p_furnishing: selectedChips['pa-furnishing'] || 'unfurnished',
        p_gated: (selectedChips['pa-gated'] || 'true') === 'true',
        p_occupant_type: selectedChips['pa-occupant'] || null,
        p_society: null,
        p_feedback: document.getElementById("pa-feedback").value || null,
        p_maintenance_included: document.getElementById("pa-maintenance").value === 'true',
        p_pets_allowed: selectedChips['pa-pets'] || null,
        p_sqft: parseInt(document.getElementById("pa-sqft").value) || null,
        p_email: document.getElementById("pa-email").value || null,
        p_parking_count: parseInt(document.getElementById("pa-parking").value) || 0,
        p_device_id: deviceId,
        p_ip_hash: ipHash
    };

    try {
        const { data, error } = await db.rpc('create_pin', payload);
        if (error) throw error;

        alert("Pin submitted anonymously. Thank you for contributing transparency!");
        closeModal("pin-add-modal");
        
        // Reset form and state
        document.getElementById("pin-add-form").reset();
        document.getElementById("pa-maintenance").value = "false";
        const maintenanceSwitch = document.getElementById("pa-maintenance-switch");
        if (maintenanceSwitch) maintenanceSwitch.classList.remove("on");
        
        selectedChips['pa-occupant'] = null;
        selectedChips['pa-pets'] = null;
        
        await loadPins();
        await loadStats();
    } catch (err) {
        alert("Insert Error: " + err.message);
    }
});

// Listing Forms Selection Modes
window.openOwnerWholeForm = function() {
    closeModal("owner-type-modal");
    openModal("owner-whole-modal");
};

window.openOwnerRoomForm = function() {
    closeModal("owner-type-modal");
    openModal("owner-room-modal");
};

window.openOwnerSellForm = function() {
    closeModal("owner-type-modal");
    openModal("owner-sell-modal");
};

// Owner Sell Property Form Submit
const ownerSellForm = document.getElementById("owner-sell-form");
if (ownerSellForm) {
    ownerSellForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("os-email").value.trim();
        const phone = document.getElementById("os-phone").value.trim();
        if (!email) {
            alert("Email is compulsory to list your property for sale.");
            return;
        }
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!phone) {
            alert("Contact phone is compulsory so serious buyers can reach you.");
            return;
        }

        const price = parseFloat(document.getElementById("os-price").value);
        if (!price || price < 500000) {
            alert("Please enter a realistic property sale price (min ₹5 Lakhs).");
            return;
        }

        const latVal = parseFloat(document.getElementById("os-lat").value) || 13.0827;
        const lngVal = parseFloat(document.getElementById("os-lng").value) || 80.2707;
        const propType = selectedChips['os-type'] || 'apartment';
        const bhk = parseInt(selectedChips['os-bhk'] || '2');
        const sqft = parseInt(document.getElementById("os-sqft").value) || 1000;
        const possession = selectedChips['os-possession'] || 'ready';
        const gated = (selectedChips['os-gated'] || 'true') === 'true';
        const parking = parseInt(document.getElementById("os-parking").value) || 1;
        const remarks = document.getElementById("os-remarks") ? document.getElementById("os-remarks").value.trim() : '';

        // Rate Limit Check
        try {
            const { data: isLimitHit, error: limitErr } = await db.rpc('check_pin_limit', { p_ip_hash: ipHash });
            if (!limitErr && isLimitHit) {
                alert("Submission limit reached. Max 3 listings per 24 hours.");
                return;
            }
        } catch (limE) {
            console.warn("Limit check notice:", limE);
        }

        const newSalePin = {
            id: 'sale-user-' + Date.now(),
            latitude: latVal,
            longitude: lngVal,
            bhk: bhk,
            rent: price,
            sale_price: price,
            transaction_type: 'sale',
            property_type: propType,
            possession: possession,
            society: remarks ? remarks.slice(0, 45) : `${bhk} BHK ${propType.toUpperCase()}`,
            gated: gated,
            sqft: sqft,
            parking_count: parking,
            phone: phone,
            contact_phone: phone,
            email: email,
            feedback: `[FOR_SALE:${price}:${propType}] ` + (remarks || `Direct owner sale. ${bhk} BHK ${propType} in Chennai. Contact: ${phone}`),
            is_listing: true,
            created_at: new Date().toISOString()
        };

        // Persist locally
        saveCustomPin(newSalePin);

        // Sync to Supabase
        try {
            const payloadPin = {
                p_lat: latVal,
                p_lng: lngVal,
                p_bhk: bhk,
                p_rent: price,
                p_deposit: Math.round(price * 0.1),
                p_furnishing: 'semi',
                p_gated: gated,
                p_occupant_type: propType,
                p_society: remarks ? remarks.slice(0, 45) : null,
                p_feedback: newSalePin.feedback,
                p_sqft: sqft,
                p_email: email,
                p_parking_count: parking,
                p_device_id: deviceId,
                p_ip_hash: ipHash
            };

            const { data: pinResult, error: pinErr } = await db.rpc('create_pin', payloadPin);
            if (!pinErr && pinResult) {
                await db.rpc('mark_pin_as_listing', {
                    p_pin_id: pinResult.id,
                    p_available_from: 'asap',
                    p_parking_count: parking,
                    p_looking_for_flatmate: false,
                    p_rent: price,
                    p_flatmate_gender: null,
                    p_smoke_pref: null,
                    p_food_pref: null
                });
                await db.rpc('set_pin_owner_contact', {
                    p_pin_id: pinResult.id,
                    p_email: email,
                    p_phone: phone
                });
            }
        } catch (dbErr) {
            console.warn("Supabase sale sync error:", dbErr);
        }

        // Email notification attempt
        fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: email,
                subject: `[Chennai Rents & Buy] Your Property Sale Listing is Live!`,
                html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FDFBF7; color: #1E1B18; border: 1.5px solid #E8DFC8; border-radius: 12px;">
                        <h2 style="color: #8B263E; margin-top: 0;">Chennai Real Estate — For Sale Listing Published</h2>
                        <p>Your ${bhk} BHK ${propType} (₹${formatInLakhsCrores(price)}) has been pinned on the Chennai map with 0% brokerage.</p>
                        <p style="font-size: 14px; color: #4A433B;">Interested buyers will contact you directly via phone or WhatsApp at ${phone}.</p>
                    </div>
                `,
                type: 'owner_sale'
            })
        }).catch(e => console.warn('Email dispatch notice:', e));

        alert("Property listed for Sale successfully! Your pin is now live on the Chennai Map with 0% brokerage.");
        closeModal("owner-sell-modal");
        ownerSellForm.reset();
        await loadPins();
    });
}

// Owner Whole Form Submit
document.getElementById("owner-whole-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("ow-email").value.trim();
    const phone = document.getElementById("ow-phone").value.trim();
    if (!email) {
        alert("Email is compulsory to list your flat.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!phone) {
        alert("Contact phone is compulsory to list your flat.");
        return;
    }

    const rent = parseFloat(document.getElementById("ow-rent").value);
    const bhk = parseInt(selectedChips['ow-bhk'] || '1');

    // Rate Limit Check
    const { data: isLimitHit, error: limitErr } = await db.rpc('check_pin_limit', { p_ip_hash: ipHash });
    if (!limitErr && isLimitHit) {
        alert("Submission limit reached. Max 3 listings per 24 hours.");
        return;
    }

    const payloadPin = {
        p_lat: parseFloat(document.getElementById("ow-lat").value),
        p_lng: parseFloat(document.getElementById("ow-lng").value),
        p_bhk: bhk,
        p_rent: rent,
        p_deposit: parseFloat(document.getElementById("ow-deposit").value),
        p_furnishing: selectedChips['ow-furnishing'] || 'semi',
        p_gated: (selectedChips['ow-gated'] || 'true') === 'true',
        p_occupant_type: 'family',
        p_society: null,
        p_feedback: 'Direct Owner Whole Flat Listing',
        p_device_id: deviceId,
        p_ip_hash: ipHash
    };

    try {
        // 1. Create Pin
        const { data: pinResult, error: pinErr } = await db.rpc('create_pin', payloadPin);
        if (pinErr) throw pinErr;

        // 2. Mark as Listing and save contact info
        await db.rpc('mark_pin_as_listing', {
            p_pin_id: pinResult.id,
            p_available_from: selectedChips['ow-avail'] || 'asap',
            p_parking_count: parseInt(document.getElementById("ow-parking").value) || 0,
            p_looking_for_flatmate: false,
            p_rent: null,
            p_flatmate_gender: null,
            p_smoke_pref: null,
            p_food_pref: null
        });

        await db.rpc('set_pin_owner_contact', {
            p_pin_id: pinResult.id,
            p_email: document.getElementById("ow-email").value,
            p_phone: document.getElementById("ow-phone").value
        });
        const ownerEmail = document.getElementById("ow-email").value;
        if (ownerEmail) {
            fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: ownerEmail,
                    subject: `[Chennai Rents] Your ${payloadPin.p_bhk} BHK Flat Listing is Live!`,
                    html: `
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FDFBF7; color: #1E1B18; border: 1.5px solid #E8DFC8; border-radius: 12px;">
                            <h2 style="color: #2F7D4F; margin-top: 0;">Chennai Rents — Property Listed</h2>
                            <p>Your ${payloadPin.p_bhk} BHK flat (₹${Number(payloadPin.p_rent).toLocaleString('en-IN')}/mo) has been pinned on the Chennai Rents map with 0% brokerage.</p>
                            <p style="font-size: 14px; color: #4A433B;">Seekers matching within 2.5km will receive alerts and contact you directly via phone or WhatsApp.</p>
                        </div>
                    `,
                    type: 'owner_listing'
                })
            }).catch(e => console.warn('Email dispatch notice:', e));
        }

        alert("Whole Flat listed successfully! Seekers matching within 2.5km will receive alerts.");
        closeModal("owner-whole-modal");
        document.getElementById("owner-whole-form").reset();
        await loadPins();
    } catch (err) {
        alert(err.message);
    }
});

// Owner Room Form Submit
document.getElementById("owner-room-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("or-email").value.trim();
    const phone = document.getElementById("or-phone").value.trim();
    if (!email) {
        alert("Email is compulsory to list your room.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!phone) {
        alert("Contact phone is compulsory to list your room.");
        return;
    }

    const rent = parseFloat(document.getElementById("or-rent").value);

    // Rate Limit Check
    const { data: isLimitHit, error: limitErr } = await db.rpc('check_pin_limit', { p_ip_hash: ipHash });
    if (!limitErr && isLimitHit) {
        alert("Submission limit reached. Max 3 listings per 24 hours.");
        return;
    }

    const payloadPin = {
        p_lat: parseFloat(document.getElementById("or-lat").value),
        p_lng: parseFloat(document.getElementById("or-lng").value),
        p_bhk: 2, // Default BHK context
        p_rent: rent,
        p_deposit: rent * 3, // approximate deposit
        p_furnishing: 'semi',
        p_gated: (selectedChips['or-gated'] || 'true') === 'true',
        p_occupant_type: 'bachelor',
        p_society: null,
        p_feedback: 'Room Flatmate Listing',
        p_device_id: deviceId,
        p_ip_hash: ipHash
    };

    try {
        const { data: pinResult, error: pinErr } = await db.rpc('create_pin', payloadPin);
        if (pinErr) throw pinErr;

        await db.rpc('mark_pin_as_listing', {
            p_pin_id: pinResult.id,
            p_available_from: selectedChips['or-avail'] || 'asap',
            p_parking_count: 1,
            p_looking_for_flatmate: true,
            p_rent: rent,
            p_flatmate_gender: selectedChips['or-gender'] || 'any',
            p_flatmate_smoke: selectedChips['or-smoke'] || 'any',
            p_flatmate_food: selectedChips['or-food'] || 'any'
        });

        await db.rpc('set_pin_owner_contact', {
            p_pin_id: pinResult.id,
            p_email: document.getElementById("or-email").value,
            p_phone: document.getElementById("or-phone").value
        });

        const roomOwnerEmail = document.getElementById("or-email").value;
        if (roomOwnerEmail) {
            fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: roomOwnerEmail,
                    subject: `[Chennai Rents] Your Room/Flatmate Listing is Live!`,
                    html: `
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FDFBF7; color: #1E1B18; border: 1.5px solid #E8DFC8; border-radius: 12px;">
                            <h2 style="color: #2F7D4F; margin-top: 0;">Chennai Rents — Room Listed</h2>
                            <p>Your room/flatmate listing (₹${Number(rent).toLocaleString('en-IN')}/mo) is now published on the Chennai Rents map with 0% brokerage.</p>
                            <p style="font-size: 14px; color: #4A433B;">Flat-seekers will reach out directly via phone or WhatsApp.</p>
                        </div>
                    `,
                    type: 'owner_room'
                })
            }).catch(e => console.warn('Email dispatch notice:', e));
        }

        alert("Room listed successfully! Seekers matching within 2.5km will receive alerts.");
        closeModal("owner-room-modal");
        document.getElementById("owner-room-form").reset();
        await loadPins();
    } catch (err) {
        alert(err.message);
    }
});

// Seeker Add Alerts Form
document.getElementById("seeker-add-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("sa-email").value.trim();
    const phone = document.getElementById("sa-phone").value.trim();

    if (!email) {
        alert("Email is compulsory to activate alerts.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!phone) {
        alert("Phone number is compulsory to activate alerts.");
        return;
    }

    // Check Seeker limits
    const { data: isLimitHit, error: limitErr } = await db.rpc('check_seeker_limit', { p_ip_hash: ipHash });
    if (!limitErr && isLimitHit) {
        alert("Alert limits reached. Max 3 alert locations per 24 hours.");
        return;
    }

    // Check existing seekers dup alerts
    const { data: existingCount, error: countErr } = await db.rpc('check_existing_seeker_pins', {
        p_email: email,
        p_phone: phone
    });

    if (!countErr && existingCount > 0) {
        // Open duplicate validation modal
        openModal("seeker-dup-modal");
        return;
    }

    await submitSeekerPin(email, phone);
});

window.confirmReplaceSeeker = async function() {
    const email = pendingInterestEmail || document.getElementById("sa-email").value;
    const phone = pendingInterestPhone || document.getElementById("sa-phone").value;

    try {
        await db.rpc('archive_seeker_pins', { p_email: email, p_phone: phone });
        closeModal("seeker-dup-modal");
        if (pendingInterestPayload) {
            await submitInterestPin(email, phone, pendingInterestPayload);
            pendingInterestEmail = null;
            pendingInterestPhone = null;
            pendingInterestPayload = null;
        } else {
            await submitSeekerPin(email, phone);
        }
    } catch (err) {
        console.error(err);
    }
};

async function submitSeekerPin(email, phone) {
    const saIntentInput = document.getElementById("sa-intent");
    const isBuyer = saIntentInput && saIntentInput.value === 'buy';
    const lat = parseFloat(document.getElementById("sa-lat").value);
    const lng = parseFloat(document.getElementById("sa-lng").value);
    const budget = parseFloat(document.getElementById("sa-budget").value);
    const bhk = parseInt(selectedChips['sa-bhk'] || '2');

    if (isBuyer) {
        if (!budget || budget < 500000) {
            alert("Please enter a realistic purchase budget (min ₹5 Lakhs).");
            return;
        }

        const buyerPin = {
            id: 'buyer-user-' + Date.now(),
            latitude: lat,
            longitude: lng,
            budget: budget,
            seeker_type: 'buyer',
            intent: 'buy',
            min_bhk: bhk,
            looking_for: 'property_for_sale',
            email: email,
            phone: phone,
            note: `Looking to buy ${bhk} BHK property in this area. Budget: ₹${formatInLakhsCrores(budget)}.`
        };
        saveCustomSeeker(buyerPin);

        try {
            await db.rpc('create_seeker_pin', {
                p_lat: lat,
                p_lng: lng,
                p_budget: budget,
                p_min_bhk: bhk,
                p_looking_for: 'property_buy',
                p_email: email,
                p_phone: phone,
                p_move_in: 'immediate',
                p_seeker_gender: 'other',
                p_flatmate_gender: 'any',
                p_flatmate_smoke: 'any',
                p_flatmate_food: 'any',
                p_note: buyerPin.note,
                p_ip_hash: ipHash
            });
        } catch (err) {
            console.warn("Supabase buyer seeker notice:", err);
        }

        if (email) {
            fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: email,
                    subject: `[Chennai Rents & Buy] Your Home Buyer Alert is Active!`,
                    html: `
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FDFBF7; color: #1E1B18; border: 1.5px solid #E8DFC8; border-radius: 12px;">
                            <h2 style="color: #8B263E; margin-top: 0;">Chennai Real Estate — Buyer Alert Activated</h2>
                            <p>Your search alert to buy property in Chennai has been registered on the interactive map.</p>
                            <div style="background: #FFFFFF; border: 1px solid #E8DFC8; border-radius: 8px; padding: 16px; margin: 16px 0;">
                                <p style="margin: 4px 0;"><strong>Purchase Budget:</strong> ₹${formatInLakhsCrores(budget)}</p>
                                <p style="margin: 4px 0;"><strong>Preferred Size:</strong> ${bhk} BHK</p>
                            </div>
                            <p style="font-size: 14px; color: #4A433B;">You will receive instant alerts when direct property owners post matching listings nearby with 0% brokerage.</p>
                        </div>
                    `,
                    type: 'buyer_alert'
                })
            }).catch(e => console.warn('Email dispatch notice:', e));
        }

        alert("Buyer Alert activated successfully! We'll alert you as soon as matching properties are listed in this area.");
        closeModal("seeker-add-modal");
        document.getElementById("seeker-add-form").reset();
        await loadPins();
        return;
    }

    const payload = {
        p_lat: lat,
        p_lng: lng,
        p_budget: budget,
        p_min_bhk: bhk,
        p_looking_for: selectedChips['sa-type'] || 'whole_flat',
        p_email: email,
        p_phone: phone,
        p_move_in: selectedChips['sa-move'] || 'flexible',
        p_seeker_gender: 'other',
        p_flatmate_gender: 'any',
        p_flatmate_smoke: 'any',
        p_flatmate_food: 'any',
        p_note: 'Chennai flat hunter alert',
        p_ip_hash: ipHash
    };

    try {
        const { data, error } = await db.rpc('create_seeker_pin', payload);
        if (error) throw error;

        // Dispatch confirmation email to seeker via Resend (/api/send-email)
        if (email) {
            fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: email,
                    subject: `[Chennai Rents] Your Rental Alert is Active!`,
                    html: `
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FDFBF7; color: #1E1B18; border: 1.5px solid #E8DFC8; border-radius: 12px;">
                            <h2 style="color: #B23A2E; margin-top: 0;">Chennai Rents — Alert Activated</h2>
                            <p>Your search alert for a rental home in Chennai has been registered successfully on the crowdsourced map.</p>
                            <div style="background: #FFFFFF; border: 1px solid #E8DFC8; border-radius: 8px; padding: 16px; margin: 16px 0;">
                                <p style="margin: 4px 0;"><strong>Maximum Budget:</strong> ₹${Number(payload.p_budget).toLocaleString('en-IN')}/mo</p>
                                <p style="margin: 4px 0;"><strong>Minimum BHK:</strong> ${payload.p_min_bhk} BHK</p>
                                <p style="margin: 4px 0;"><strong>Type:</strong> ${payload.p_looking_for.replace('_', ' ').toUpperCase()}</p>
                            </div>
                            <p style="font-size: 14px; color: #4A433B;">We will notify you immediately by email when a direct owner posts a matching flat within 2.5km.</p>
                        </div>
                    `,
                    type: 'seeker_alert'
                })
            }).catch(e => console.warn('Email dispatch notice:', e));
        }

        alert("Rent Alert activated successfully! Check your email daily for direct matching owners.");
        closeModal("seeker-add-modal");
        document.getElementById("seeker-add-form").reset();
        await loadPins();
    } catch (err) {
        alert("Alert setting error: " + err.message);
    }
}

// 10. Filter Setters & Mode Controllers
window.setTransactionMode = function(mode) {
    transactionMode = mode;
    ['all', 'rent', 'sale'].forEach(m => {
        const el = document.getElementById(`chicklet-mode-${m}`);
        if (el) {
            if (m === mode) el.classList.add("active");
            else el.classList.remove("active");
        }
    });

    ['all', 'rent', 'sale'].forEach(m => {
        const chip = document.getElementById(`f-type-${m}`);
        if (chip) {
            if (m === mode) chip.classList.add("active");
            else chip.classList.remove("active");
        }
    });

    const rentSec = document.getElementById("filter-rent-section");
    const saleSec = document.getElementById("filter-sale-section");
    if (rentSec) rentSec.style.display = (mode === 'sale') ? 'none' : 'block';
    if (saleSec) saleSec.style.display = (mode === 'rent') ? 'none' : 'block';

    updateFilterBadgeCount();
};

window.setFilterType = function(type) {
    window.setTransactionMode(type);
};

window.setFilterPropType = function(type) {
    filterPropType = type;
    ['all', 'apt', 'villa', 'plot'].forEach(t => {
        const chip = document.getElementById(`f-prop-${t}`);
        if (chip) {
            const mappedVal = t === 'apt' ? 'apartment' : t;
            if (mappedVal === type) chip.classList.add("active");
            else chip.classList.remove("active");
        }
    });
    updateFilterBadgeCount();
};

window.setFilterSalePrice = function() {
    filterSaleMin = parseFloat(document.getElementById("f-sale-min").value) || null;
    filterSaleMax = parseFloat(document.getElementById("f-sale-max").value) || null;
    updateFilterBadgeCount();
};

window.selectPinMode = function(mode) {
    const input = document.getElementById("pa-mode");
    if (input) input.value = mode;
    const btnRent = document.getElementById("pa-mode-rent");
    const btnSale = document.getElementById("pa-mode-sale");
    const label = document.getElementById("pa-price-label");
    const rentInput = document.getElementById("pa-rent");

    if (mode === 'sale') {
        if (btnRent) btnRent.classList.remove("active");
        if (btnSale) btnSale.classList.add("active");
        if (label) label.innerHTML = 'Sale / Purchase Price (₹ Total)<span>*</span>';
        if (rentInput) rentInput.placeholder = 'e.g. 7500000 (75 Lakhs)';
    } else {
        if (btnRent) btnRent.classList.add("active");
        if (btnSale) btnSale.classList.remove("active");
        if (label) label.innerHTML = 'Monthly Rent (₹)<span>*</span>';
        if (rentInput) rentInput.placeholder = 'e.g. 24000';
    }
};

window.selectSeekerIntent = function(intent) {
    const input = document.getElementById("sa-intent");
    if (input) input.value = intent;
    const btnRent = document.getElementById("sa-intent-rent");
    const btnBuy = document.getElementById("sa-intent-buy");
    const label = document.getElementById("sa-budget-label");
    const budgetInput = document.getElementById("sa-budget");

    if (intent === 'buy') {
        if (btnRent) btnRent.classList.remove("active");
        if (btnBuy) btnBuy.classList.add("active");
        if (label) label.innerHTML = 'Max Purchase Budget (₹ Total)<span>*</span>';
        if (budgetInput) budgetInput.placeholder = 'e.g. 8000000 (80 Lakhs)';
    } else {
        if (btnRent) btnRent.classList.add("active");
        if (btnBuy) btnBuy.classList.remove("active");
        if (label) label.innerHTML = 'Max Monthly Budget (₹)<span>*</span>';
        if (budgetInput) budgetInput.placeholder = 'e.g. 25000';
    }
};

window.toggleFilterBhk = function(bhk) {
    const idx = activeFilterBhk.indexOf(bhk);
    const btn = document.getElementById(`f-bhk-${bhk}`);
    if (idx === -1) {
        activeFilterBhk.push(bhk);
        btn.classList.add("active");
    } else {
        activeFilterBhk.splice(idx, 1);
        btn.classList.remove("active");
    }
    updateFilterBadgeCount();
};

window.setFilterRent = function() {
    filterRentMin = parseFloat(document.getElementById("f-rent-min").value) || null;
    filterRentMax = parseFloat(document.getElementById("f-rent-max").value) || null;
    updateFilterBadgeCount();
};

window.setFilterArea = function(val) {
    filterArea = val;
    updateFilterBadgeCount();
};

window.toggleFilterGated = function(val) {
    const yesBtn = document.getElementById("f-gated-yes");
    const noBtn = document.getElementById("f-gated-no");

    if (filterGated === val) {
        filterGated = null;
        yesBtn.classList.remove("active");
        noBtn.classList.remove("active");
    } else {
        filterGated = val;
        if (val) {
            yesBtn.classList.add("active");
            noBtn.classList.remove("active");
        } else {
            yesBtn.classList.remove("active");
            noBtn.classList.add("active");
        }
    }
    updateFilterBadgeCount();
};

window.toggleFilterAvailOnly = function() {
    availableFlatsOnly = !availableFlatsOnly;
    const btn = document.getElementById("filter-avail-only");
    if (availableFlatsOnly) {
        btn.classList.add("active");
        document.getElementById("available-flats-banner").style.display = 'flex';
        document.getElementById("chicklet-avlb").classList.add("active");
    } else {
        btn.classList.remove("active");
        document.getElementById("available-flats-banner").style.display = 'none';
        document.getElementById("chicklet-avlb").classList.remove("active");
    }
    updateFilterBadgeCount();
};

window.toggleAvailableOnly = function() {
    toggleFilterAvailOnly();
    loadPins();
};

window.exitAvailableOnlyMode = function() {
    availableFlatsOnly = false;
    document.getElementById("filter-avail-only").classList.remove("active");
    document.getElementById("available-flats-banner").style.display = 'none';
    document.getElementById("chicklet-avlb").classList.remove("active");
    updateFilterBadgeCount();
    loadPins();
};

window.clearFilters = function() {
    activeFilterBhk = [];
    filterRentMin = null;
    filterRentMax = null;
    filterSaleMin = null;
    filterSaleMax = null;
    filterArea = '';
    filterGated = null;
    availableFlatsOnly = false;
    transactionMode = 'all';
    filterPropType = 'all';

    // Reset UI chips classes
    const chips = document.querySelectorAll(".option-chip");
    chips.forEach(c => c.classList.remove("active"));
    const defAllType = document.getElementById("f-type-all");
    if (defAllType) defAllType.classList.add("active");
    const defAllProp = document.getElementById("f-prop-all");
    if (defAllProp) defAllProp.classList.add("active");

    ['all', 'rent', 'sale'].forEach(m => {
        const el = document.getElementById(`chicklet-mode-${m}`);
        if (el) {
            if (m === 'all') el.classList.add("active");
            else el.classList.remove("active");
        }
    });

    const rentMin = document.getElementById("f-rent-min");
    const rentMax = document.getElementById("f-rent-max");
    const saleMin = document.getElementById("f-sale-min");
    const saleMax = document.getElementById("f-sale-max");
    const areaInput = document.getElementById("f-area");
    if (rentMin) rentMin.value = '';
    if (rentMax) rentMax.value = '';
    if (saleMin) saleMin.value = '';
    if (saleMax) saleMax.value = '';
    if (areaInput) areaInput.value = '';

    const rentSec = document.getElementById("filter-rent-section");
    const saleSec = document.getElementById("filter-sale-section");
    if (rentSec) rentSec.style.display = 'block';
    if (saleSec) saleSec.style.display = 'block';

    document.getElementById("available-flats-banner").style.display = 'none';
    document.getElementById("chicklet-avlb").classList.remove("active");

    updateFilterBadgeCount();
    loadPins();
};

function updateFilterBadgeCount() {
    let count = 0;
    if (activeFilterBhk.length > 0) count++;
    if (filterRentMin || filterRentMax) count++;
    if (filterSaleMin || filterSaleMax) count++;
    if (filterArea) count++;
    if (filterGated !== null) count++;
    if (availableFlatsOnly) count++;
    if (transactionMode !== 'all') count++;
    if (filterPropType !== 'all') count++;

    const badge = document.getElementById("filter-count-badge");
    const filterBtn = document.getElementById("filter-btn");
    if (badge) badge.innerText = count;

    if (filterBtn) {
        if (count > 0) {
            if (badge) badge.style.display = 'flex';
            filterBtn.classList.add("has-filters");
        } else {
            if (badge) badge.style.display = 'none';
            filterBtn.classList.remove("has-filters");
        }
    }

    loadPins();
}

// 11. Modal toggles
window.openModal = function(id) {
    document.getElementById(id).classList.add("open");
};

window.closeModal = function(id) {
    document.getElementById(id).classList.remove("open");
    // Remove pin highlighting
    if (id === 'pin-detail-modal') {
        const highlighted = document.querySelectorAll(".pin-marker.highlighted");
        highlighted.forEach(h => h.classList.remove("highlighted"));
        currentPin = null;
        // Reset the express interest form if it exists
        const interestForm = document.getElementById("express-interest-form");
        if (interestForm) interestForm.reset();
    }
};

window.closeWelcomeModal = function() {
    localStorage.setItem('chennai_rent_onboarded', 'true');
    closeModal('welcome-modal');
};

window.closeAllModals = function() {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach(b => b.classList.remove("open"));
};

// 12. Stacking Right buttons controllers
window.toggleMapType = function() {
    isSatelliteMode = !isSatelliteMode;
    const btn = document.getElementById("sat-btn");
    if (isSatelliteMode) {
        map.removeLayer(baseTileLayer);
        satelliteTileLayer.addTo(map);
        btn.classList.add("active");
    } else {
        map.removeLayer(satelliteTileLayer);
        baseTileLayer.addTo(map);
        btn.classList.remove("active");
    }
};

window.togglePinsHidden = function() {
    pinsHidden = !pinsHidden;
    const btn = document.getElementById("hide-pins-btn");
    if (pinsHidden) {
        btn.classList.add("active");
    } else {
        btn.classList.remove("active");
    }
    loadPins();
};

window.locateUser = function() {
    const btn = document.getElementById("locate-btn");
    btn.classList.add("locating");

    map.locate({ setView: true, maxZoom: 15 });
    
    map.on('locationfound', () => {
        btn.classList.remove("locating");
        btn.classList.add("located");
        setTimeout(() => btn.classList.remove("located"), 2000);
    });

    map.on('locationerror', (e) => {
        btn.classList.remove("locating");
        alert("Position Access Denied: " + e.message);
    });
};

// 13. FAQ Accordion & Local Listings
const faqs = [
    { q: "How does chennairents.in work?", a: "Tap anywhere on the map and drop your rent anonymously. Other renters see real prices in their area. If you're flat-hunting, drop a seeker pin with your budget — we email you when matching listings appear within 2.5km." },
    { q: "Is chennairents.in free? Do I need to sign up?", a: "Yes, free for everyone. No signup, no login, no app required. We don't charge tenants or owners and have no plans to. Rents are crowdsourced for local transparency." },
    { q: "How is chennairents.in different from broker sites?", a: "Standard sites show broker-quoted listings, which are often inflated. chennairents.in shows real rents shared by actual current and past tenants, letting you see historical averages to guide negotiation." },
    { q: "Is my data anonymous? Will my landlord know?", a: "Yes, anonymous. Your IP address is never displayed. The pin shows only the rent amount, BHK, and approximate location (rounded to ~100m for privacy). Your landlord cannot trace it back to you." },
    { q: "How do you prevent fake or inflated rents?", a: "We validate that rent falls within a plausible range for the BHK, auto-flag statistical outliers (3x above/below area median), and auto-hide pins that accumulate 3 community reports." }
];

function loadFaqs() {
    const container = document.getElementById("faq-list-container");
    container.innerHTML = '';
    const mainEntity = [];

    faqs.forEach((faq, idx) => {
        const item = document.createElement("div");
        item.className = "faq-item";
        item.innerHTML = `
            <div class="faq-question" onclick="toggleFaqAccordion(${idx})">
                <span>${faq.q}</span>
                <span>+</span>
            </div>
            <div class="faq-answer" id="faq-ans-${idx}">${faq.a}</div>
        `;
        container.appendChild(item);

        mainEntity.push({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        });
    });

    // Populate JSON-LD schema
    const schemaTag = document.getElementById("faq-schema");
    if (schemaTag) {
        const currentSchema = JSON.parse(schemaTag.innerHTML);
        currentSchema.mainEntity = mainEntity;
        schemaTag.innerHTML = JSON.stringify(currentSchema, null, 2);
    }
}

window.toggleFaqAccordion = function(index) {
    const items = document.querySelectorAll("#faq-list-container .faq-item");
    items.forEach((item, idx) => {
        if (idx === index) {
            item.classList.toggle("active");
            const indicator = item.querySelector(".faq-question span:last-child");
            indicator.innerText = item.classList.contains("active") ? "−" : "+";
        } else {
            item.classList.remove("active");
            item.querySelector(".faq-question span:last-child").innerText = "+";
        }
    });
};

window.openTutorial = function() {
    openModal('tutorial-modal');
};

window.openLiveStats = function() {
    openModal('stats-modal');
};

window.openFaq = function() {
    openModal('faq-modal');
};

window.openContentPortal = function() {
    openModal('content-portal-modal');
};

window.switchPortalTab = function(tabId) {
    const contents = document.querySelectorAll('#content-portal-modal .portal-tab-content');
    contents.forEach(c => c.classList.remove('active'));

    const tabs = document.querySelectorAll('#content-portal-modal .portal-tab');
    tabs.forEach(t => t.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    const btn = document.getElementById('btn-' + tabId);
    if (btn) btn.classList.add('active');
};

// HTML escaping helper
function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// 14. Chennai Metro & Transit Mapping Engine
function initMetroLines() {
    if (!metroLinesGroup) return;
    metroLinesGroup.clearLayers();
    
    for (const [lineName, lineInfo] of Object.entries(METRO_LINES)) {
        const latlngs = lineInfo.stations.map(st => st.coords);
        
        // Draw transit route lines
        const polyline = L.polyline(latlngs, {
            color: lineInfo.color,
            weight: lineInfo.weight,
            opacity: lineInfo.opacity,
            lineJoin: 'round'
        });
        polyline.addTo(metroLinesGroup);
        
        // Draw transit station indicators
        lineInfo.stations.forEach(station => {
            const circle = L.circleMarker(station.coords, {
                radius: 4.5,
                fillColor: "#ffffff",
                color: lineInfo.color,
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            });
            
            // Tooltip on hover
            circle.bindTooltip(`${station.name} (${lineName})`, {
                direction: 'top',
                offset: [0, -5],
                className: 'custom-metro-tooltip'
            });
            
            // Dynamic Rent calculation on click
            circle.on('click', (e) => {
                L.DomEvent.stopPropagation(e);
                map.setView(station.coords, 14);
                calculateAvgRentNearCoords(station.coords, station.name);
            });
            
            circle.addTo(metroLinesGroup);
        });
    }
    
    if (showMetro) {
        metroLinesGroup.addTo(map);
    }
}

window.toggleMetroLines = function() {
    showMetro = !showMetro;
    const btn = document.getElementById("metro-btn");
    if (showMetro) {
        metroLinesGroup.addTo(map);
        if (btn) btn.classList.add("active");
    } else {
        map.removeLayer(metroLinesGroup);
        if (btn) btn.classList.remove("active");
    }
};

function calculateAvgRentNearCoords(coords, name) {
    const radiusMeters = 1000;
    const center = L.latLng(coords[0], coords[1]);
    
    const nearbyPins = pinsData.filter(pin => {
        const pinLoc = L.latLng(pin.latitude, pin.longitude);
        return center.distanceTo(pinLoc) <= radiusMeters;
    });
    
    if (nearbyPins.length === 0) {
        const popup = L.popup()
            .setLatLng(coords)
            .setContent(`<div style="font-family:var(--font-body); color:var(--c-ink); padding:8px; font-size:12.5px; line-height:1.4; text-align:left;">
                <strong style="font-family:var(--font-heading); font-size:14px; color:var(--c-ink);">${name} Metro Station</strong><br>
                <span style="color:var(--c-ink-muted); display:block; margin-top:4px;">No crowdsourced rent pins found within 1km yet. Be the first to pin here!</span>
            </div>`)
            .openOn(map);
        return;
    }
    
    const totalRent = nearbyPins.reduce((acc, pin) => acc + Number(pin.rent), 0);
    const avgRent = Math.round(totalRent / nearbyPins.length);
    
    const countByBhk = {};
    nearbyPins.forEach(pin => {
        countByBhk[pin.bhk] = countByBhk[pin.bhk] || { total: 0, count: 0 };
        countByBhk[pin.bhk].total += Number(pin.rent);
        countByBhk[pin.bhk].count++;
    });
    
    let statsHtml = `<div style="font-family:var(--font-body); color:var(--c-ink); padding:6px; min-width:210px; text-align:left;">`;
    statsHtml += `<p style="font-size:11.5px; margin:0 0 4px 0; color:var(--c-ink-muted); font-weight:600; text-transform:uppercase; letter-spacing:0.04em;">Crowdsourced rents within 1km</p>`;
    statsHtml += `<p style="font-family:var(--font-heading); font-size:15px; margin:0 0 10px 0; font-weight:800; color:var(--c-ink); border-bottom:1.5px solid var(--c-border); padding-bottom:6px;">${name} Station</p>`;
    statsHtml += `<div style="font-family:var(--font-heading); font-size:14px; font-weight:800; margin-bottom:10px; color:var(--c-ripon-red);">Average Rent: ₹${avgRent.toLocaleString('en-IN')}/mo</div>`;
    
    // Sort BHK keys
    const bhkKeys = Object.keys(countByBhk).sort();
    bhkKeys.forEach(bhk => {
        const data = countByBhk[bhk];
        const avg = Math.round(data.total / data.count);
        statsHtml += `<div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:5px; color:var(--c-ink-muted);">
            <span>${bhk} BHK (${data.count} pin${data.count > 1 ? 's' : ''}):</span>
            <strong style="color:var(--c-ink); font-weight:700;">₹${avg.toLocaleString('en-IN')}/mo</strong>
        </div>`;
    });
    statsHtml += `</div>`;
    
    const popup = L.popup()
        .setLatLng(coords)
        .setContent(statsHtml)
        .openOn(map);
}

// 14. WhatsApp & Instagram Sharing & Express Interest Flow
window.shareWhatsApp = function() {
    if (!currentPin) return;
    const rentFormatted = Number(currentPin.rent).toLocaleString('en-IN');
    const flatType = currentPin.is_listing ? (currentPin.looking_for_flatmate ? 'Room in shared flat' : 'Whole flat') : 'rent pin';
    const msg = `Check out this rental on chennairents.in: ${currentPin.bhk} BHK ${flatType} in ${currentPin.area || 'Chennai'} for ₹${rentFormatted}/month. See full details on map: https://www.chennairents.in/neighbourhood/${(currentPin.area || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
};

window.shareInstagramStory = function() {
    if (!currentPin) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");

    // Draw elegant broadsheet newspaper card
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, 1080, 1920);

    // Double thin border in neon-copper
    ctx.strokeStyle = "#ff3e00";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1020, 1860);
    ctx.lineWidth = 1;
    ctx.strokeRect(42, 42, 996, 1836);

    // Header "chennairents.in"
    ctx.fillStyle = "#ff3e00";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 72px 'Georgia', serif";
    ctx.fillText("chennairents.in", 540, 200);

    // Tagline
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "600 24px 'Inter', sans-serif";
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = "6px";
    ctx.fillText("CROWDSOURCED RENTAL INDEX", 540, 280);
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = "0px";

    // Divider line
    ctx.strokeStyle = "rgba(255, 62, 0, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 340);
    ctx.lineTo(930, 340);
    ctx.stroke();

    // Pin Drawing
    const pinX = 540;
    const pinY = 650;
    ctx.beginPath();
    ctx.arc(pinX, pinY - 80, 100, 0, Math.PI, true);
    ctx.lineTo(pinX, pinY + 80);
    ctx.closePath();
    ctx.fillStyle = "#ff3e00";
    ctx.fill();
    // Inner circle
    ctx.beginPath();
    ctx.arc(pinX, pinY - 80, 35, 0, Math.PI * 2);
    ctx.fillStyle = "#0d0d0d";
    ctx.fill();

    // Details
    const flatType = currentPin.is_listing ? (currentPin.looking_for_flatmate ? 'Room in Shared Flat' : 'Whole Flat') : 'Rent Report';
    ctx.fillStyle = "#9ca3af";
    ctx.font = "700 36px 'Inter', sans-serif";
    ctx.fillText(`${currentPin.bhk} BHK • ${flatType.toUpperCase()}`, 540, 950);

    const rentFormatted = Number(currentPin.rent).toLocaleString('en-IN');
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 110px 'Inter', sans-serif";
    ctx.fillText(`₹${rentFormatted}`, 540, 1080);
    
    ctx.fillStyle = "#ff3e00";
    ctx.font = "700 36px 'Inter', sans-serif";
    ctx.fillText("/ month", 540, 1170);

    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 700 56px 'Georgia', serif";
    ctx.fillText(`at ${currentPin.area || 'Chennai'}`, 540, 1300);

    if (currentPin.society) {
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "500 36px 'Inter', sans-serif";
        ctx.fillText(currentPin.society, 540, 1380);
    }

    // Bottom divider
    ctx.strokeStyle = "rgba(255, 62, 0, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 1500);
    ctx.lineTo(930, 1500);
    ctx.stroke();

    // CTA
    ctx.fillStyle = "#9ca3af";
    ctx.font = "500 28px 'Inter', sans-serif";
    ctx.fillText("Spot broker inflation. Share what you pay.", 540, 1590);
    ctx.fillText("Help map Chennai's rents anonymously.", 540, 1640);

    ctx.fillStyle = "#ff3e00";
    ctx.font = "bold 48px 'Inter', sans-serif";
    ctx.fillText("www.chennairents.in", 540, 1770);

    const link = document.createElement("a");
    link.download = `chennai_rent_${currentPin.bhk}bhk_${(currentPin.area || 'locality').replace(/\s+/g, '_').toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
};

window.openExpressInterest = function() {
    if (!currentPin) return;
    if (currentPin.ip_hash === 'seed') {
        alert("This seed property has already been booked by another seeker.");
        return;
    }
    
    closeModal("pin-detail-modal");

    document.getElementById("ei-lat").value = currentPin.latitude;
    document.getElementById("ei-lng").value = currentPin.longitude;
    document.getElementById("ei-bhk").value = currentPin.bhk;
    document.getElementById("ei-type").value = currentPin.looking_for_flatmate ? 'room' : 'whole_flat';
    
    const rentFormatted = Number(currentPin.rent).toLocaleString('en-IN');
    const flatType = currentPin.looking_for_flatmate ? 'room in shared flat' : 'whole flat';
    const locationName = currentPin.society || currentPin.area || 'this location';
    
    document.getElementById("ei-sub-text").innerHTML = `You're expressing interest in a <strong>${currentPin.bhk}BHK ${flatType}</strong> at <strong>${locationName}</strong> · <strong>₹${rentFormatted}/month</strong>. Just tell us how to reach you and a few preferences — we've pre-filled the rest.`;
    
    document.getElementById("ei-budget").value = currentPin.rent;

    resetFormChips('ei-move', 'flexible');
    selectFormChip('ei-move', 'flexible');
    
    resetFormChips('ei-gender', null);
    
    resetFormChips('ei-parking', 'yes');
    selectFormChip('ei-parking', 'yes');

    openModal("express-interest-modal");
};

function resetFormChips(group, defaultVal = null) {
    selectedChips[group] = defaultVal;
    const container = document.getElementById(`${group}-chips`);
    if (container) {
        const chips = container.querySelectorAll(".option-chip");
        chips.forEach(chip => {
            const onclickAttr = chip.getAttribute("onclick");
            if (defaultVal && onclickAttr && onclickAttr.includes(`'${defaultVal}'`)) {
                chip.classList.add("active");
            } else {
                chip.classList.remove("active");
            }
        });
    }
}

document.getElementById("express-interest-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("ei-email").value.trim();
    const phone = document.getElementById("ei-phone").value.trim();

    if (!email) {
        alert("Email is compulsory to express interest.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!phone) {
        alert("Phone number is compulsory to express interest.");
        return;
    }

    const budget = parseFloat(document.getElementById("ei-budget").value);
    const lat = parseFloat(document.getElementById("ei-lat").value);
    const lng = parseFloat(document.getElementById("ei-lng").value);
    const bhk = parseInt(document.getElementById("ei-bhk").value);
    const lookingFor = document.getElementById("ei-type").value;
    
    const moveIn = selectedChips['ei-move'] || 'flexible';
    const gender = selectedChips['ei-gender'] || 'other';
    const parkingReq = selectedChips['ei-parking'] || 'no';

    // Check Seeker limits
    const { data: isLimitHit, error: limitErr } = await db.rpc('check_seeker_limit', { p_ip_hash: ipHash });
    if (!limitErr && isLimitHit) {
        alert("Alert limits reached. Max 3 alert locations per 24 hours.");
        return;
    }

    // Check existing seekers dup alerts
    const { data: existingCount, error: countErr } = await db.rpc('check_existing_seeker_pins', {
        p_email: email,
        p_phone: phone
    });

    if (!countErr && existingCount > 0) {
        pendingInterestEmail = email;
        pendingInterestPhone = phone;
        pendingInterestPayload = {
            p_lat: lat,
            p_lng: lng,
            p_budget: budget,
            p_min_bhk: bhk,
            p_looking_for: lookingFor,
            p_email: email,
            p_phone: phone,
            p_move_in: moveIn,
            p_seeker_gender: gender,
            p_flatmate_gender: 'any',
            p_flatmate_smoke: 'any',
            p_flatmate_food: 'any',
            p_note: `Interested in flat pin. Parking required: ${parkingReq === 'yes' ? 'Yes' : 'No'}.`,
            p_ip_hash: ipHash
        };
        openModal("seeker-dup-modal");
        return;
    }

    await submitInterestPin(email, phone, {
        p_lat: lat,
        p_lng: lng,
        p_budget: budget,
        p_min_bhk: bhk,
        p_looking_for: lookingFor,
        p_email: email,
        p_phone: phone,
        p_move_in: moveIn,
        p_seeker_gender: gender,
        p_flatmate_gender: 'any',
        p_flatmate_smoke: 'any',
        p_flatmate_food: 'any',
        p_note: `Interested in flat pin. Parking required: ${parkingReq === 'yes' ? 'Yes' : 'No'}.`,
        p_ip_hash: ipHash
    });
});

async function submitInterestPin(email, phone, payload) {
    try {
        const { data, error } = await db.rpc('create_seeker_pin', payload);
        if (error) throw error;

        alert("Interest recorded and Seeker Pin dropped successfully! We will alert you of any matches.");
        closeModal("pin-detail-modal");
        await loadPins();
    } catch (err) {
        alert("Submission error: " + err.message);
    }
}
