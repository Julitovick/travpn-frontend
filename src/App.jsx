import React, { useState, useEffect } from 'react';
import { Search, Plane, MapPin, Globe, Info, X, Hotel, Ship, Shield, CheckCircle, ExternalLink, AlertTriangle, EyeOff, CreditCard, ChevronRight, Lock, Zap, Languages, Calendar } from 'lucide-react';

// URL DE TU BACKEND
const API_URL_BASE = 'https://travpn-backend-x82z.onrender.com/api'; 

// --- 💰 ZONA DE DINERO (TUS ENLACES DE AFILIADO) ---
const AFFILIATE_LINKS = {
  surfshark: 'https://surfshark.club/friend', 
  nordvpn: 'https://nordvpn.com/special',     
  cyberghost: 'https://www.cyberghostvpn.com',
  expressvpn: 'https://www.expressvpn.com',   
  skyscanner_base: 'https://www.skyscanner.es',
  booking_base: 'https://www.booking.com',
};

const EXCHANGE_RATES = {
  'EUR': 1.0, 'USD': 0.92, 'BRL': 0.18, 'ARS': 0.0011,
  'INR': 0.011, 'TRY': 0.029, 'JPY': 0.0062, 'MXN': 0.054
};

const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2092&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2066&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512453979798-5ea904ac6666?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
  'https://images.unsplash.com/photo-15422596594c2-9ee65977f36e?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?q=80&w=2020&auto=format&fit=crop',
];

// --- 🌍 DICCIONARIO DE TRADUCCIONES ---
const TRANSLATIONS = {
  ES: {
    currency: "Moneda",
    lang_name: "Español",
    hero_badge: "Ahora buscando en 50+ países 🌍",
    hero_title_1: "Ubicación virtual.",
    hero_title_2: "Ahorro real.",
    hero_subtitle: "Las aerolíneas cambian los precios según tu ubicación. Nosotros te decimos desde dónde conectarte para pagar menos.",
    tab_flights: "Vuelos",
    tab_hotels: "Hoteles",
    tab_cruises: "Cruceros",
    origin: "Origen",
    destination: "Destino",
    date: "Fecha",
    search_btn: "Buscar Ahorro",
    affiliate_title: "Top Herramientas para viajar barato (Ofertas exclusivas)",
    offer_discount: "Dto",
    offer_free_months: "Meses Gratis",
    offer_speed: "Alta Velocidad",
    results_found: "Precios encontrados en",
    results_countries: "países",
    best_price: "Mejor Precio Detectado",
    ip_needed: "IP Necesaria",
    via: "Vía",
    trick_btn: "Truco",
    landing_title: "¿Cómo funciona la magia?",
    landing_subtitle: "Es simple: las webs de viajes te cobran más si detectan que tienes dinero. Nosotros te enseñamos a parecer un local.",
    step_1_title: "Escaneo Global",
    step_1_desc: "Nuestro algoritmo rastrea precios en tiempo real en más de",
    step_1_desc_bold: "50 países",
    step_2_title: "Selección de IP",
    step_2_desc: "Detectamos dónde está más barata la moneda o dónde hay menos impuestos y te decimos",
    step_2_desc_bold: "qué país elegir",
    step_3_title: "Ahorro Directo",
    step_3_desc: "Activas tu VPN, entras en modo incógnito y compras el billete al",
    step_3_desc_bold: "precio local",
    legal_title: "¿Por qué es legal esto?",
    legal_1_title: "Discriminación de precios",
    legal_1_desc: "Las empresas te cobran más solo por vivir en un país rico. Usar una VPN solo nivela el terreno de juego.",
    legal_2_title: "Mercato libre global",
    legal_2_desc: "Estás comprando un producto digital. Tienes derecho a buscar la mejor oferta disponible en internet.",
    footer: "Comparador de precios global.",
    modal_detected: "Ahorro detectado",
    modal_mission: "Misión",
    modal_steps: "Sigue estos 3 pasos para desbloquear el precio.",
    modal_step_1: "Activa el \"Camuflaje\"",
    modal_step_1_desc: "Conéctate a",
    modal_no_vpn: "¿No tienes VPN?",
    modal_flash_offer: "Oferta Flash: 82% DTO + 2 meses gratis",
    modal_get_offer: "Conseguir Oferta",
    modal_step_2: "Modo Fantasma",
    modal_step_2_desc: "Es vital para limpiar cookies.",
    modal_step_3: "Paga en local",
    modal_warning_title: "Truco final",
    modal_warning_desc: "Paga siempre en",
    modal_warning_desc_2: "No dejes que la web convierta a",
    modal_btn_go: "Ir a la web de compra",
    // Nuevas traducciones
    trip_round: "Ida y vuelta",
    trip_oneway: "Solo ida",
    date_dept: "Ida",
    date_ret: "Vuelta",
    date_in: "Entrada",
    date_out: "Salida"
  },
  EN: {
    currency: "Currency",
    lang_name: "English",
    hero_badge: "Now searching in 50+ countries 🌍",
    hero_title_1: "Virtual location.",
    hero_title_2: "Real savings.",
    hero_subtitle: "Airlines change prices based on your location. We tell you where to connect from to pay less.",
    tab_flights: "Flights",
    tab_hotels: "Hotels",
    tab_cruises: "Cruises",
    origin: "Origin",
    destination: "Destination",
    date: "Date",
    search_btn: "Find Savings",
    affiliate_title: "Top Tools for Cheap Travel (Exclusive Offers)",
    offer_discount: "Off",
    offer_free_months: "Months Free",
    offer_speed: "High Speed",
    results_found: "Prices found in",
    results_countries: "countries",
    best_price: "Best Price Detected",
    ip_needed: "IP Required",
    via: "Via",
    trick_btn: "Trick",
    landing_title: "How does the magic work?",
    landing_subtitle: "It's simple: travel sites charge you more if they detect you have money. We teach you to look like a local.",
    step_1_title: "Global Scan",
    step_1_desc: "Our algorithm tracks prices in real-time in over",
    step_1_desc_bold: "50 countries",
    step_2_title: "IP Selection",
    step_2_desc: "We detect where the currency is cheaper or taxes are lower and tell you",
    step_2_desc_bold: "which country to choose",
    step_3_title: "Direct Savings",
    step_3_desc: "You activate your VPN, enter incognito mode, and buy the ticket at the",
    step_3_desc_bold: "local price",
    legal_title: "Why is this legal?",
    legal_1_title: "Price Discrimination",
    legal_1_desc: "Companies charge you more just for living in a rich country. Using a VPN simply levels the playing field.",
    legal_2_title: "Global Free Market",
    legal_2_desc: "You are buying a digital product. You have the right to search for the best offer available on the internet.",
    footer: "Global price comparator.",
    modal_detected: "Savings detected",
    modal_mission: "Mission",
    modal_steps: "Follow these 3 steps to unlock the price.",
    modal_step_1: "Activate \"Camouflage\"",
    modal_step_1_desc: "Connect to",
    modal_no_vpn: "No VPN?",
    modal_flash_offer: "Flash Offer: 82% OFF + 2 months free",
    modal_get_offer: "Get Offer",
    modal_step_2: "Ghost Mode",
    modal_step_2_desc: "Vital for clearing cookies.",
    modal_step_3: "Pay Local",
    modal_warning_title: "Final Trick",
    modal_warning_desc: "Always pay in",
    modal_warning_desc_2: "Don't let the site convert to",
    modal_btn_go: "Go to booking site",
    trip_round: "Round Trip",
    trip_oneway: "One Way",
    date_dept: "Depart",
    date_ret: "Return",
    date_in: "Check-in",
    date_out: "Check-out"
  },
  DE: {
    currency: "Währung",
    lang_name: "Deutsch",
    hero_badge: "Suchen jetzt in 50+ Ländern 🌍",
    hero_title_1: "Virtueller Ort.",
    hero_title_2: "Echte Ersparnis.",
    hero_subtitle: "Fluggesellschaften ändern Preise je nach Ihrem Standort. Wir sagen Ihnen, von wo Sie sich verbinden sollten, um weniger zu zahlen.",
    tab_flights: "Flüge",
    tab_hotels: "Hotels",
    tab_cruises: "Kreuzfahrten",
    origin: "Herkunft",
    destination: "Ziel",
    date: "Datum",
    search_btn: "Sparen finden",
    affiliate_title: "Top-Tools für günstiges Reisen (Exklusive Angebote)",
    offer_discount: "Rabatt",
    offer_free_months: "Monate Gratis",
    offer_speed: "Hohe Geschwindigkeit",
    results_found: "Preise gefunden in",
    results_countries: "Ländern",
    best_price: "Bester Preis entdeckt",
    ip_needed: "IP Erforderlich",
    via: "Über",
    trick_btn: "Trick",
    landing_title: "Wie funktioniert die Magie?",
    landing_subtitle: "Ganz einfach: Reiseseiten verlangen mehr, wenn sie Geld riechen. Wir zeigen Ihnen, wie Sie wie ein Einheimischer wirken.",
    step_1_title: "Globaler Scan",
    step_1_desc: "Unser Algorithmus verfolgt Preise in Echtzeit in über",
    step_1_desc_bold: "50 Ländern",
    step_2_title: "IP-Auswahl",
    step_2_desc: "Wir erkennen, wo die Währung günstiger oder die Steuern niedriger sind, und sagen Ihnen,",
    step_2_desc_bold: "welches Land Sie wählen sollen",
    step_3_title: "Direkte Ersparnis",
    step_3_desc: "Sie aktivieren Ihr VPN, gehen in den Inkognito-Modus und kaufen das Ticket zum",
    step_3_desc_bold: "lokalen Preis",
    legal_title: "Warum ist das legal?",
    legal_1_title: "Preisdiskriminierung",
    legal_1_desc: "Unternehmen verlangen mehr, nur weil Sie in einem reichen Land leben. Ein VPN schafft Chancengleichheit.",
    legal_2_title: "Globaler freier Markt",
    legal_2_desc: "Sie kaufen ein digitales Produkt. Sie haben das Recht, nach dem besten Angebot im Internet zu suchen.",
    footer: "Globaler Preisvergleich.",
    modal_detected: "Ersparnis erkannt",
    modal_mission: "Mission",
    modal_steps: "Folgen Sie diesen 3 Schritten, um den Preis freizuschalten.",
    modal_step_1: "\"Tarnung\" aktivieren",
    modal_step_1_desc: "Verbinden mit",
    modal_no_vpn: "Kein VPN?",
    modal_flash_offer: "Blitzangebot: 82% Rabatt + 2 Monate gratis",
    modal_get_offer: "Angebot sichern",
    modal_step_2: "Geistermodus",
    modal_step_2_desc: "Wichtig zum Löschen von Cookies.",
    modal_step_3: "Lokal bezahlen",
    modal_warning_title: "Letzter Trick",
    modal_warning_desc: "Zahlen Sie immer in",
    modal_warning_desc_2: "Lassen Sie die Seite nicht in",
    modal_btn_go: "Zur Buchungsseite",
    trip_round: "Hin & Rück",
    trip_oneway: "Nur Hin",
    date_dept: "Hin",
    date_ret: "Zurück",
    date_in: "Anreise",
    date_out: "Abreise"
  },
  FR: {
    currency: "Devise",
    lang_name: "Français",
    hero_badge: "Recherche dans 50+ pays 🌍",
    hero_title_1: "Lieu virtuel.",
    hero_title_2: "Économies réelles.",
    hero_subtitle: "Les compagnies aériennes modifient les prix selon votre emplacement. Nous vous disons d'où vous connecter pour payer moins.",
    tab_flights: "Vols",
    tab_hotels: "Hôtels",
    tab_cruises: "Croisières",
    origin: "Origine",
    destination: "Destination",
    date: "Date",
    search_btn: "Trouver des économies",
    affiliate_title: "Meilleurs outils pour voyager pas cher (Offres exclusives)",
    offer_discount: "Réduc",
    offer_free_months: "Mois Gratuits",
    offer_speed: "Haute Vitesse",
    results_found: "Prix trouvés dans",
    results_countries: "pays",
    best_price: "Meilleur prix détecté",
    ip_needed: "IP Requise",
    via: "Via",
    trick_btn: "Astuce",
    landing_title: "Comment opère la magie ?",
    landing_subtitle: "C'est simple : les sites de voyage vous font payer plus s'ils détectent que vous avez de l'argent. Nous vous apprenons à passer pour un local.",
    step_1_title: "Scan Global",
    step_1_desc: "Notre algorithme suit les prix en temps réel dans plus de",
    step_1_desc_bold: "50 pays",
    step_2_title: "Sélection d'IP",
    step_2_desc: "Nous détectons où la devise est moins chère ou les taxes plus basses et vous disons",
    step_2_desc_bold: "quel pays choisir",
    step_3_title: "Économie Directe",
    step_3_desc: "Activez votre VPN, passez en mode incognito et achetez le billet au",
    step_3_desc_bold: "prix local",
    legal_title: "Pourquoi est-ce légal ?",
    legal_1_title: "Discrimination par les prix",
    legal_1_desc: "Les entreprises facturent plus simplement parce que vous vivez dans un pays riche. Un VPN rétablit l'équilibre.",
    legal_2_title: "Marché libre mondial",
    legal_2_desc: "Vous achetez un produit numérique. Vous avez le droit de chercher la meilleure offre disponible sur internet.",
    footer: "Comparateur de prix mondial.",
    modal_detected: "Économie détectée",
    modal_mission: "Mission",
    modal_steps: "Suivez ces 3 étapes pour débloquer le prix.",
    modal_step_1: "Activer le \"Camouflage\"",
    modal_step_1_desc: "Connectez-vous à",
    modal_no_vpn: "Pas de VPN ?",
    modal_flash_offer: "Offre Flash : -82% + 2 mois gratuits",
    modal_get_offer: "Obtenir l'offre",
    modal_step_2: "Mode Fantôme",
    modal_step_2_desc: "Vital pour effacer les cookies.",
    modal_step_3: "Payer en local",
    modal_warning_title: "Astuce finale",
    modal_warning_desc: "Payez toujours en",
    modal_warning_desc_2: "Ne laissez pas le site convertir en",
    modal_btn_go: "Aller au site de réservation",
    trip_round: "Aller-retour",
    trip_oneway: "Aller simple",
    date_dept: "Aller",
    date_ret: "Retour",
    date_in: "Arrivée",
    date_out: "Départ"
  },
  IT: {
    currency: "Valuta",
    lang_name: "Italiano",
    hero_badge: "Ricerca in 50+ paesi 🌍",
    hero_title_1: "Posizione virtuale.",
    hero_title_2: "Risparmio reale.",
    hero_subtitle: "Le compagnie aeree cambiano i prezzi in base alla tua posizione. Ti diciamo da dove connetterti per pagare meno.",
    tab_flights: "Voli",
    tab_hotels: "Hotel",
    tab_cruises: "Crociere",
    origin: "Origine",
    destination: "Destinazione",
    date: "Data",
    search_btn: "Trova Risparmio",
    affiliate_title: "Migliori strumenti per viaggiare low cost (Offerte esclusive)",
    offer_discount: "Sconto",
    offer_free_months: "Mesi Gratis",
    offer_speed: "Alta Velocità",
    results_found: "Prezzi trovati in",
    results_countries: "paesi",
    best_price: "Miglior Prezzo Rilevato",
    ip_needed: "IP Richiesto",
    via: "Via",
    trick_btn: "Trucco",
    landing_title: "Come funziona la magia?",
    landing_subtitle: "È semplice: i siti di viaggio ti fanno pagare di più se rilevano che hai soldi. Ti insegniamo a sembrare un locale.",
    step_1_title: "Scansione Globale",
    step_1_desc: "Il nostro algoritmo traccia i prezzi in tempo reale in oltre",
    step_1_desc_bold: "50 paesi",
    step_2_title: "Selezione IP",
    step_2_desc: "Rileviamo dove la valuta è più economica o le tasse sono più basse e ti diciamo",
    step_2_desc_bold: "quale paese scegliere",
    step_3_title: "Risparmio Diretto",
    step_3_desc: "Attivi la tua VPN, entri in modalità incognito e compri il biglietto al",
    step_3_desc_bold: "prezzo locale",
    legal_title: "Perché è legale?",
    legal_1_title: "Discriminazione dei prezzi",
    legal_1_desc: "Le aziende fanno pagare di più solo perché vivi in un paese ricco. Una VPN livella il campo di gioco.",
    legal_2_title: "Mercato libero globale",
    legal_2_desc: "Stai acquistando un prodotto digitale. Hai il diritto di cercare la migliore offerta disponibile su internet.",
    footer: "Comparatore di prezzi globale.",
    modal_detected: "Risparmio rilevato",
    modal_mission: "Missione",
    modal_steps: "Segui questi 3 passaggi per sbloccare il prezzo.",
    modal_step_1: "Attiva \"Mimetizzazione\"",
    modal_step_1_desc: "Connettiti a",
    modal_no_vpn: "Niente VPN?",
    modal_flash_offer: "Offerta Flash: 82% Sconto + 2 mesi gratis",
    modal_get_offer: "Ottieni Offerta",
    modal_step_2: "Modalità Fantasma",
    modal_step_2_desc: "Vitale per cancellare i cookie.",
    modal_step_3: "Paga in locale",
    modal_warning_title: "Trucco finale",
    modal_warning_desc: "Paga sempre in",
    modal_warning_desc_2: "Non lasciare che il sito converta in",
    modal_btn_go: "Vai al sito di prenotazione",
    trip_round: "Andata e ritorno",
    trip_oneway: "Solo andata",
    date_dept: "Andata",
    date_ret: "Ritorno",
    date_in: "Arrivo",
    date_out: "Partenza"
  }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [userCurrency, setUserCurrency] = useState('EUR');
  const [language, setLanguage] = useState('ES');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [bgImage, setBgImage] = useState('');
  
  // Nuevo estado para tipo de viaje
  const [tripType, setTripType] = useState('roundtrip'); // 'roundtrip' | 'oneway'

  const [formData, setFormData] = useState({
    origin: '', destination: '', date: '', returnDate: ''
  });

  const t = (key) => TRANSLATIONS[language][key] || key;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length);
    setBgImage(BACKGROUND_IMAGES[randomIndex]);
  }, []);

  const getDealLink = () => {
    if (activeTab === 'flights') {
        const dateFormatted = formData.date.slice(2).replace(/-/g, ''); 
        const returnDateFormatted = formData.returnDate ? formData.returnDate.slice(2).replace(/-/g, '') : '';
        let url = `https://www.skyscanner.es/transport/flights/${formData.origin}/${formData.destination}/${dateFormatted}`;
        if (tripType === 'roundtrip' && returnDateFormatted) {
            url += `/${returnDateFormatted}`;
        }
        return url;
    } else if (activeTab === 'hotels') {
        let url = `${AFFILIATE_LINKS.booking_base}/searchresults.html?ss=${formData.destination}`;
        if (formData.date) url += `&checkin=${formData.date}`;
        if (formData.returnDate) url += `&checkout=${formData.returnDate}`;
        return url;
    } else {
        return `https://www.cruisecritic.com/search?q=${formData.destination}`;
    }
  };

  const convertPrice = (price, fromCurrency) => {
    if (fromCurrency === userCurrency) return null;
    const rateToEur = EXCHANGE_RATES[fromCurrency] || 1;
    const priceInEur = price * rateToEur;
    const rateFromEur = 1 / (EXCHANGE_RATES[userCurrency] || 1);
    const finalPrice = priceInEur * rateFromEur;
    return Math.round(finalPrice).toLocaleString();
  };

  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '🌍';
    const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!formData.destination) return alert("Por favor indica un destino");

    setLoading(true);
    setResults(null);

    let endpoint = '/search';
    if (activeTab === 'hotels') endpoint = '/hotels';
    if (activeTab === 'cruises') endpoint = '/cruises';

    try {
      const response = await fetch(`${API_URL_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error servidor');
      const data = await response.json();
      
      const processed = data.map(item => ({
        ...item,
        flag: item.flag?.length === 2 ? getFlagEmoji(item.flag) : '🌍',
        price: Number(item.price) || 0
      }));

      processed.sort((a, b) => {
        const priceA = a.price * (EXCHANGE_RATES[a.currency] || 1);
        const priceB = b.price * (EXCHANGE_RATES[b.currency] || 1);
        return priceA - priceB;
      });

      setResults(processed);

    } catch (error) {
      console.error(error);
      setResults([
        { country: 'Brasil', flag: '🇧🇷', price: 1500, currency: 'BRL', airline: 'Latam', hotelName: 'Rio Palace', cruiseLine: 'MSC Brazil' },
        { country: 'Turquía', flag: '🇹🇷', price: 8500, currency: 'TRY', airline: 'Turkish Airlines', hotelName: 'Grand Istanbul', cruiseLine: 'Bosphorus Lines' },
        { country: 'España', flag: '🇪🇸', price: 450, currency: 'EUR', airline: 'Iberia', hotelName: 'Madrid Central', cruiseLine: 'Costa Cruceros' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="bg-blue-900 text-white pb-64 relative overflow-hidden transition-all duration-1000">
        
        {/* BARRA SUPERIOR */}
        <div className="absolute top-4 right-4 z-20 flex flex-col md:flex-row gap-3">
            <div className="bg-black/30 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 border border-white/20 hover:bg-black/40 transition">
                <Languages className="w-4 h-4 text-slate-200" />
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-transparent font-bold text-white outline-none cursor-pointer text-sm">
                    <option value="ES" className="text-slate-900">Español 🇪🇸</option>
                    <option value="EN" className="text-slate-900">English 🇺🇸</option>
                    <option value="DE" className="text-slate-900">Deutsch 🇩🇪</option>
                    <option value="FR" className="text-slate-900">Français 🇫🇷</option>
                    <option value="IT" className="text-slate-900">Italiano 🇮🇹</option>
                </select>
            </div>
            <div className="bg-black/30 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 border border-white/20 hover:bg-black/40 transition">
                <span className="text-xs text-slate-200 uppercase font-semibold">{t('currency')}:</span>
                <select value={userCurrency} onChange={(e) => setUserCurrency(e.target.value)} className="bg-transparent font-bold text-white outline-none cursor-pointer text-sm">
                    <option value="EUR" className="text-slate-900">EUR (€)</option>
                    <option value="USD" className="text-slate-900">USD ($)</option>
                    <option value="GBP" className="text-slate-900">GBP (£)</option>
                </select>
            </div>
        </div>

        {bgImage && (
            <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out" style={{ backgroundImage: `url('${bgImage}')` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/40 to-blue-900/90" />

        <div className="relative container mx-auto px-4 pt-10">
          <nav className="flex items-center gap-2 mb-12">
            <Globe className="text-teal-400 h-8 w-8 drop-shadow-md" /> 
            <span className="text-2xl font-bold tracking-tighter drop-shadow-md">TRAVPN</span>
          </nav>

          <div className="text-center mb-10">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-600/30 backdrop-blur-sm border border-blue-400/50 text-blue-100 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg animate-pulse">
              {t('hero_badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              {t('hero_title_1')}<br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-200">{t('hero_title_2')}</span>
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto font-light drop-shadow-md">
              {t('hero_subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* --- BUSCADOR --- */}
      <div className="container mx-auto px-4 -mt-48 relative z-10 mb-20">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-5xl mx-auto border border-slate-100">
          
          <div className="flex bg-slate-50 p-2 border-b border-slate-200 gap-1">
            <button onClick={() => setActiveTab('flights')} className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold rounded-xl transition-all ${activeTab === 'flights' ? 'bg-white shadow text-blue-600 ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}><Plane className="h-5 w-5" /> {t('tab_flights')}</button>
            <button onClick={() => setActiveTab('hotels')} className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold rounded-xl transition-all ${activeTab === 'hotels' ? 'bg-white shadow text-blue-600 ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}><Hotel className="h-5 w-5" /> {t('tab_hotels')}</button>
            <button onClick={() => setActiveTab('cruises')} className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold rounded-xl transition-all ${activeTab === 'cruises' ? 'bg-white shadow text-blue-600 ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}><Ship className="h-5 w-5" /> {t('tab_cruises')}</button>
          </div>

          <form onSubmit={handleSearch} className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-white">
            
            {/* --- SELECTOR DE TIPO DE VIAJE (SOLO VUELOS) --- */}
            {activeTab === 'flights' && (
              <div className="md:col-span-12 mb-2 flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="tripType" value="roundtrip" checked={tripType === 'roundtrip'} onChange={() => setTripType('roundtrip')} className="w-4 h-4 text-blue-600 accent-blue-600" />
                  <span className="text-sm font-bold text-slate-700">{t('trip_round')}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="tripType" value="oneway" checked={tripType === 'oneway'} onChange={() => setTripType('oneway')} className="w-4 h-4 text-blue-600 accent-blue-600" />
                  <span className="text-sm font-bold text-slate-700">{t('trip_oneway')}</span>
                </label>
              </div>
            )}

            {/* ORIGEN (Solo vuelos) */}
            {activeTab === 'flights' && (
                <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 pl-1">{t('origin')}</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <input type="text" placeholder="Madrid (MAD)" className="w-full pl-10 p-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium" value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})} />
                    </div>
                </div>
            )}

            {/* DESTINO */}
            <div className={`${activeTab === 'flights' ? 'md:col-span-3' : 'md:col-span-4'}`}>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 pl-1">{t('destination')}</label>
                <div className="relative">
                    <Globe className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <input type="text" placeholder={activeTab === 'hotels' ? "París, Centro" : "Tokio (HND)"} className="w-full pl-10 p-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} />
                </div>
            </div>

            {/* FECHAS */}
            {activeTab === 'flights' ? (
              <>
                <div className={`${tripType === 'roundtrip' ? 'md:col-span-2' : 'md:col-span-3'}`}>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 pl-1">{t('date_dept')}</label>
                    <input type="date" className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 font-medium" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                {tripType === 'roundtrip' && (
                  <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2 pl-1">{t('date_ret')}</label>
                      <input type="date" className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 font-medium" value={formData.returnDate} onChange={(e) => setFormData({...formData, returnDate: e.target.value})} />
                  </div>
                )}
              </>
            ) : activeTab === 'hotels' ? (
              <>
                <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 pl-1">{t('date_in')}</label>
                    <input type="date" className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 font-medium" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 pl-1">{t('date_out')}</label>
                    <input type="date" className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 font-medium" value={formData.returnDate} onChange={(e) => setFormData({...formData, returnDate: e.target.value})} />
                </div>
              </>
            ) : (
              // CRUCEROS (SIMPLE)
              <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 pl-1">{t('date')}</label>
                  <input type="date" className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 font-medium" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
            )}

            <div className="md:col-span-2">
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition flex justify-center items-center gap-2 shadow-lg shadow-blue-200 active:scale-95">
                {loading ? <span className="animate-spin">⌛</span> : <><Search className="h-5 w-5" /> {t('search_btn')}</>}
              </button>
            </div>
          </form>
        </div>

        {/* --- SECCIÓN AFILIACIÓN VPNs (Ranking) --- */}
        <div className="mt-8 max-w-5xl mx-auto">
            <p className="text-center text-slate-500 text-xs font-bold uppercase mb-4 tracking-wider">{t('affiliate_title')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href={AFFILIATE_LINKS.surfshark} target="_blank" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition hover:border-blue-200 group">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xl">S</div>
                    <div>
                        <p className="font-bold text-sm text-slate-800">Surfshark</p>
                        <p className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded w-fit">82% {t('offer_discount')}</p>
                    </div>
                </a>
                <a href={AFFILIATE_LINKS.nordvpn} target="_blank" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition hover:border-blue-200 group">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">N</div>
                    <div>
                        <p className="font-bold text-sm text-slate-800">NordVPN</p>
                        <p className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded w-fit">63% {t('offer_discount')}</p>
                    </div>
                </a>
                <a href={AFFILIATE_LINKS.cyberghost} target="_blank" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition hover:border-blue-200 group">
                    <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold text-xl">C</div>
                    <div>
                        <p className="font-bold text-sm text-slate-800">CyberGhost</p>
                        <p className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded w-fit">2 {t('offer_free_months')}</p>
                    </div>
                </a>
                <a href={AFFILIATE_LINKS.expressvpn} target="_blank" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition hover:border-blue-200 group">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xl">E</div>
                    <div>
                        <p className="font-bold text-sm text-slate-800">ExpressVPN</p>
                        <p className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded w-fit">{t('offer_speed')}</p>
                    </div>
                </a>
            </div>
        </div>
      </div>

      {/* --- RESULTADOS --- */}
      {results ? (
        <div className="container mx-auto px-4 py-8 max-w-6xl flex-grow animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-8 text-slate-800 flex items-center gap-3">
                {t('results_found')} {results.length} {t('results_countries')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((item, idx) => {
                const converted = convertPrice(item.price, item.currency);
                return (
                  <div key={idx} className={`bg-white rounded-2xl p-6 border transition hover:shadow-xl hover:-translate-y-1 duration-300 relative group flex flex-col ${idx === 0 ? 'border-teal-400 shadow-lg ring-1 ring-teal-50' : 'border-slate-100 shadow-sm'}`}>
                    {idx === 0 && <div className="absolute -top-3 left-6 bg-teal-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-md z-10">{t('best_price')}</div>}
                    <div className="flex justify-between items-start mb-4 mt-2">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl shadow-sm rounded-full bg-slate-50 w-12 h-12 flex items-center justify-center">{item.flag}</span>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg leading-tight">{item.country}</h3>
                                <div className="text-xs text-slate-400 font-medium flex items-center gap-1"><Lock className="w-3 h-3"/> {t('ip_needed')}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            {item.price.toLocaleString()} <span className="text-sm text-slate-500 font-normal">{item.currency}</span>
                        </div>
                        {converted && (
                            <div className="text-sm font-bold text-blue-600 mt-1 flex items-center justify-center gap-1 bg-blue-100/50 py-1 rounded">
                                ≈ {converted} {userCurrency}
                            </div>
                        )}
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-4 border-t border-slate-50 pt-4">
                            {activeTab === 'flights' && <><Plane className="h-4 w-4 text-blue-400 flex-shrink-0"/> <span className="truncate">{item.airline}</span></>}
                            {activeTab === 'hotels' && <><Hotel className="h-4 w-4 text-blue-400 flex-shrink-0"/> <span className="truncate">{item.hotelName}</span></>}
                            {activeTab === 'cruises' && <><Ship className="h-4 w-4 text-blue-400 flex-shrink-0"/> <span className="truncate">{item.cruiseLine}</span></>}
                        </div>
                    </div>
                    <div className="flex gap-2 mt-auto">
                        <button onClick={() => { setSelectedDeal(item); setShowTutorial(true); }} className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition text-sm flex items-center justify-center gap-2">
                            <Info className="h-4 w-4" /> {t('trick_btn')}
                        </button>
                        <a href={getDealLink()} target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition border border-blue-200 flex items-center justify-center" title="Ir a web de compra">
                            <ExternalLink className="h-5 w-5" />
                        </a>
                    </div>
                  </div>
                )
              })}
            </div>
        </div>
      ) : (
        /* --- LANDING EXPLICATIVA --- */
        <div className="bg-white py-20 flex-grow">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('landing_title')}</h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        {t('landing_subtitle')}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 relative">
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-shadow text-center group">
                        <div className="w-20 h-20 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                            <Globe className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-800">{t('step_1_title')}</h3>
                        <p className="text-slate-500 leading-relaxed">
                            {t('step_1_desc')} <strong className="text-blue-600">{t('step_1_desc_bold')}</strong>.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-shadow text-center group relative top-0 md:-top-6">
                        <div className="w-20 h-20 mx-auto bg-teal-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-200 group-hover:scale-110 transition-transform">
                            <Shield className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-800">{t('step_2_title')}</h3>
                        <p className="text-slate-500 leading-relaxed">
                            {t('step_2_desc')} <strong className="text-teal-600">{t('step_2_desc_bold')}</strong>.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-shadow text-center group">
                        <div className="w-20 h-20 mx-auto bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
                            <CreditCard className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-800">{t('step_3_title')}</h3>
                        <p className="text-slate-500 leading-relaxed">
                            {t('step_3_desc')} <strong className="text-purple-600">{t('step_3_desc_bold')}</strong>.
                        </p>
                    </div>
                </div>

                {/* BANNER DE CONFIANZA */}
                <div className="mt-24 bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">{t('legal_title')}</h3>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                            <div className="flex gap-4">
                                <CheckCircle className="h-8 w-8 text-teal-400 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-lg mb-1">{t('legal_1_title')}</h4>
                                    <p className="text-slate-400 text-sm">{t('legal_1_desc')}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <CheckCircle className="h-8 w-8 text-teal-400 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-lg mb-1">{t('legal_2_title')}</h4>
                                    <p className="text-slate-400 text-sm">{t('legal_2_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      )}

      {/* --- MODAL TUTORIAL CON AFILIACIÓN INTEGRADA --- */}
      {showTutorial && selectedDeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-0 overflow-hidden shadow-2xl animate-fade-in-up max-h-[95vh] overflow-y-auto">
            <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                <button onClick={() => setShowTutorial(false)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition z-10"><X className="h-5 w-5"/></button>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{t('modal_detected')}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{t('modal_mission')}: {selectedDeal.country}</h3>
                    <p className="text-slate-400 text-sm">{t('modal_steps')}</p>
                </div>
            </div>

            <div className="p-8">
                {/* Paso 1: VPN + VENTA */}
                <div className="flex gap-5 mb-8 relative">
                    <div className="absolute left-6 top-10 bottom-[-20px] w-0.5 bg-slate-100"></div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 font-bold text-xl flex items-center justify-center border border-blue-100 z-10 shadow-sm">1</div>
                    <div className="flex-grow">
                        <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">{t('modal_step_1')} <Shield className="h-4 w-4 text-slate-400"/></h4>
                        
                        {/* CAJA DE AFILIADO DE ALTA CONVERSIÓN */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mt-2">
                            <p className="text-slate-700 text-sm mb-3">{t('modal_step_1_desc')} <strong>{selectedDeal.country}</strong>.</p>
                            <a href={AFFILIATE_LINKS.surfshark} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white border border-blue-200 p-3 rounded-lg hover:shadow-md transition group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-600 text-white p-1.5 rounded"><Zap className="h-4 w-4"/></div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{t('modal_no_vpn')}</p>
                                        <p className="text-xs text-green-600 font-bold">{t('modal_flash_offer')}</p>
                                    </div>
                                </div>
                                <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg group-hover:bg-blue-700 transition">{t('modal_get_offer')}</div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Paso 2 */}
                <div className="flex gap-5 mb-8 relative">
                    <div className="absolute left-6 top-10 bottom-[-20px] w-0.5 bg-slate-100"></div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 font-bold text-xl flex items-center justify-center border border-purple-100 z-10 shadow-sm">2</div>
                    <div className="flex-grow">
                        <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">{t('modal_step_2')} <EyeOff className="h-4 w-4 text-slate-400"/></h4>
                        <p className="text-slate-600 text-sm mt-1">Usa <strong>Ctrl + Shift + N</strong>. {t('modal_step_2_desc')}</p>
                    </div>
                </div>

                {/* Paso 3: VENTA DE VIAJE */}
                <div className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-green-50 text-green-600 font-bold text-xl flex items-center justify-center border border-green-100 z-10 shadow-sm">3</div>
                    <div className="flex-grow">
                        <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">{t('modal_step_3')}</h4>
                        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mt-2 text-sm text-yellow-800">
                            <p className="font-bold mb-1">⚠️ {t('modal_warning_title')}:</p>
                            <p>{t('modal_warning_desc')} <strong>{selectedDeal.currency}</strong>. {t('modal_warning_desc_2')} {userCurrency}.</p>
                        </div>
                        <a href={getDealLink()} target="_blank" rel="noopener noreferrer" className="w-full mt-4 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                            {t('modal_btn_go')} <ExternalLink className="h-4 w-4"/>
                        </a>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm mt-auto">
        <p>© 2024 TRAVPN.com - {t('footer')}</p>
      </footer>
    </div>
  );
};

export default App;  