// Base de données simulée des véhicules
const vehiclesData = [
    {
        id: 1,
        name: "Toyota Hilux / Vigo (Pick-up)",
        category: "pickup",
        location: "Disponible partout",
        mainImage: "images/toyotapickup-hilux.jpg",
        images: ["images/toyotapickup-hilux.jpg", "images/pickup-toyota.jpg", "images/pickup.webp"],
        prices: {
            inCity: 60000,
            outCityMultiDay: 70000,
            outCityRoundTrip: 80000
        },
        description: "Pick-up robuste idéal pour le transport de marchandises et les terrains difficiles"
    },
    {
        id: 2,
        name: "Hyundai Santa Fe",
        category: "suv",
        location: "Disponible partout",
        mainImage: "images/auto.jpg",
        images: ["images/auto.jpg", "images/auto1.jpg"],
        prices: {
            inCity: 60000,
            outCity: 70000,
            wedding: 80000,
            weddingWithDeco: 110000,
            weddingWithDecoFull: 150000
        },
        description: "SUV confortable parfait pour la famille et les longs trajets"
    },
    {
        id: 3,
        name: "Toyota Fortuner 2024",
        category: "suv",
        location: "Disponible partout",
        mainImage: "images/TOYOTA-FORTUNER-1.jpg",
        images: ["images/TOYOTA-FORTUNER-1.jpg"],
        prices: {
            inCity: 100000,
            outCityMultiDay: 120000,
            outCityRoundTrip: 130000,
            wedding: 130000,
            weddingWithDeco: 200000
        },
        description: "SUV premium alliant puissance et élégance"
    },
    {
        id: 4,
        name: "Toyota RAV4 (2005)",
        category: "suv",
        location: "Disponible à Yaoundé",
        mainImage: "images/2005_Toyota_RAV4_05.jpg",
        images: ["images/2005_Toyota_RAV4_05.jpg"],
        prices: {
            inCity: 40000,
            outCity: 50000
        },
        description: "SUV compact fiable et économique"
    },
    {
        id: 5,
        name: "Toyota Auris",
        category: "suv",
        location: "Disponible à Douala",
        mainImage: "images/auto2.jpg",
        images: ["images/auto2.jpg"],
        prices: {
            inCity: 30000,
            outCity: 40000,
            wedding: 40000
        },
        description: "Berline compacte idéale pour la ville"
    },
    {
        id: 6,
        name: "Rush 2019",
        category: "suv",
        location: "Disponible à Bafoussam",
        mainImage: "images/auto3.jpg",
        images: ["images/auto3.jpg"],
        prices: {
            inCity: 75000,
            outCity: 90000,
            wedding: 90000
        },
        description: "SUV spacieux pour toute la famille"
    },
    {
        id: 7,
        name: "Land Rover",
        category: "luxe",
        location: "Disponible à Yaoundé",
        mainImage: "images/LAND ROVER.jpg",
        images: ["images/LAND ROVER.jpg", "images/range-rover.jpg"],
        prices: {
            inCity: 40000,
            outCity: 50000
        },
        description: "SUV de luxe tout-terrain"
    },
    {
        id: 8,
        name: "Jetour X70",
        category: "luxe",
        location: "Disponible partout",
        mainImage: "images/2025-jetour-x70.jpeg",
        images: ["images/2025-jetour-x70.jpeg"],
        prices: {
            inCity: 300000,
            outCity: 400000,
            wedding: 400000,
            weddingWithDeco: 500000
        },
        description: "SUV de luxe moderne avec équipements haut de gamme"
    },
    {
        id: 9,
        name: "Land Cruiser V8 2022",
        category: "luxe",
        location: "Disponible partout",
        mainImage: "images/landcruiser.jpg",
        images: ["images/landcruiser.jpg", "images/land cruiser.jpg"],
        prices: {
            inCity: 200000,
            outCityMultiDay: 250000,
            outCityRoundTrip: 300000
        },
        description: "Le roi des SUV, puissance et luxe absolu"
    }
];

// Stockage des réservations (simulé)
let reservations = JSON.parse(localStorage.getItem('autocar_reservations')) || [];

// Sauvegarder les réservations
function saveReservations() {
    localStorage.setItem('autocar_reservations', JSON.stringify(reservations));
}

// Fonction pour réserver via WhatsApp
function reserverWhatsApp(vehicle, type, prix, details = '') {
    const phoneNumber = "237690977410";
    let message = `🛑 Merci d'avoir contacté AUTO CAR 🚐\n\n`;
    message += `📍 Véhicule : ${vehicle.name}\n`;
    message += `📍 Type de location : ${type}\n`;
    message += `💰 Prix : ${prix.toLocaleString()} FRS CFA\n`;
    message += `📍 Disponibilité : ${vehicle.location}\n`;
    
    if (details) {
        message += `\n📝 Détails supplémentaires : ${details}\n`;
    }
    
    message += `\n🛑 Veuillez nous communiquer votre ville, les dates de votre besoin et la destination\n`;
    message += `🛑 Pour une réponse rapide, appelez-nous directement au ${phoneNumber}\n\n`;
    message += `🚧 CONDITIONS :\n`;
    message += `- Location avec chauffeur 👮\n`;
    message += `- Carburation à la charge du client ⛽\n`;
    message += `- Péages à la charge du client 🅿️\n`;
    message += `- Hébergement du chauffeur à la charge du client 🏠\n`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Sauvegarder la réservation simulée
    const reservation = {
        id: Date.now(),
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        type: type,
        prix: prix,
        date: new Date().toISOString()
    };
    reservations.push(reservation);
    saveReservations();
}

// Afficher les véhicules sur la page véhicules
function displayVehicles() {
    const container = document.getElementById('vehiclesContainer');
    if (!container) return;
    
    container.innerHTML = vehiclesData.map(vehicle => `
        <div class="vehicle-card">
            <img src="${vehicle.mainImage}" alt="${vehicle.name}" onerror="this.src='images/auto.jpg'">
            <div class="vehicle-info">
                <h3>${vehicle.name}</h3>
                <p class="vehicle-location"><i class="fas fa-map-marker-alt"></i> ${vehicle.location}</p>
                <p>${vehicle.description}</p>
                <div class="price-list">
                    <h4>Tarifs :</h4>
                    <ul>
                        ${vehicle.prices.inCity ? `<li>🏙️ Dans la ville : ${vehicle.prices.inCity.toLocaleString()} FRS CFA/jour</li>` : ''}
                        ${vehicle.prices.outCity ? `<li>🌍 Hors ville : ${vehicle.prices.outCity.toLocaleString()} FRS CFA/jour</li>` : ''}
                        ${vehicle.prices.outCityMultiDay ? `<li>🌍 Hors ville (+1 jour) : ${vehicle.prices.outCityMultiDay.toLocaleString()} FRS CFA/jour</li>` : ''}
                        ${vehicle.prices.outCityRoundTrip ? `<li>🔄 A/R Hors ville (même jour) : ${vehicle.prices.outCityRoundTrip.toLocaleString()} FRS CFA</li>` : ''}
                        ${vehicle.prices.wedding ? `<li>💒 Mariage (07h-22h) : ${vehicle.prices.wedding.toLocaleString()} FRS CFA</li>` : ''}
                        ${vehicle.prices.weddingWithDeco ? `<li>💒💕 Mariage avec décoration : ${vehicle.prices.weddingWithDeco.toLocaleString()} FRS CFA</li>` : ''}
                    </ul>
                </div>
                <button class="btn btn-reserver" onclick="openReservationModal(${vehicle.id})">
                    <i class="fab fa-whatsapp"></i> Réserver via WhatsApp
                </button>
            </div>
        </div>
    `).join('');
}

// Modal de réservation
let currentVehicle = null;

function openReservationModal(vehicleId) {
    currentVehicle = vehiclesData.find(v => v.id === vehicleId);
    const modal = document.getElementById('reservationModal');
    document.getElementById('modalVehicleName').textContent = currentVehicle.name;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('reservationModal').style.display = 'none';
}

function confirmReservation() {
    const type = document.getElementById('reservationType').value;
    let prix = 0;
    let typeText = '';
    
    switch(type) {
        case 'inCity':
            prix = currentVehicle.prices.inCity;
            typeText = 'Dans la ville';
            break;
        case 'outCity':
            prix = currentVehicle.prices.outCity || currentVehicle.prices.outCityMultiDay;
            typeText = 'Hors ville';
            break;
        case 'wedding':
            prix = currentVehicle.prices.wedding;
            typeText = 'Mariage sans décoration';
            break;
        case 'weddingWithDeco':
            prix = currentVehicle.prices.weddingWithDeco;
            typeText = 'Mariage avec décoration';
            break;
        default:
            prix = currentVehicle.prices.inCity;
            typeText = 'Standard';
    }
    
    const details = document.getElementById('reservationDetails').value;
    reserverWhatsApp(currentVehicle, typeText, prix, details);
    closeModal();
}

// Afficher la gallerie
function displayGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    
    const galleryImages = [
        'images/auto.jpg', 'images/auto1.jpg', 'images/auto2.jpg', 'images/auto3.jpg',
        'images/auto4.jpg', 'images/auto6.jpg', 'images/auto7.jpg', 'images/auto8.jpg',
        'images/auto9.jpg', 'images/auto10.jpg', 'images/auto11.jpg', 'images/auto12.webp',
        'images/hiace.jpg', 'images/landcruiser.jpg', 'images/toyotapickup-hilux.jpg',
        'images/voiture-decor1.jpg', 'images/voiture-decoration.jpg'
    ];
    
    container.innerHTML = galleryImages.map(img => `
        <div class="gallery-item">
            <img src="${img}" alt="Véhicule AUTO CAR" onerror="this.src='images/auto.jpg'">
        </div>
    `).join('');
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayVehicles();
    displayGallery();
    
    // Navigation active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Fermer modal en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById('reservationModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}