import React, { useState } from 'react';
import { Search, Plane, ArrowRight, MapPin, Globe, Info, X, Check, Shield } from 'lucide-react';
import './App.css'; // <-- Añade esta línea
// ... resto de tu código ...
// ----------------------------------------------------------------------------------
// CONFIGURACIÓN DE LA API
// ----------------------------------------------------------------------------------
// Asegúrate de que esta URL es la de TU backend en Render
const API_URL = 'https://travpn-backend-x82z.onrender.com/api/search'; 
// ----------------------------------------------------------------------------------

const App = () => {
  const [tripType, setTripType] = useState('roundtrip');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);

  // Estados del formulario
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departDate: '',
    returnDate: ''
  });

  // Función para obtener emojis de bandera
  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '🌍';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  // Función REAL para buscar en tu servidor
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!formData.origin || !formData.destination || !formData.departDate) return;

    setLoading(true);
    setResults(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: formData.origin,       
          destination: formData.destination, 
          date: formData.departDate      
        })
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      
      const processedData = data.map(item => ({
        ...item,
        flag: item.flag && item.flag.length === 2 ? getFlagEmoji(item.flag) : item.flag || '🌍',
        price: Number(item.price) || 0 
      }));

      processedData.sort((a, b) => a.price - b.price);
      setResults(processedData);

    } catch (error) {
      console.error("Error conectando con el servidor:", error);
      alert("No se pudo conectar con el servidor Backend.\n\nVerifica que la URL en API_URL sea correcta y que tu servidor en Render esté activo.");
      
      // Fallback visual
      const fallbackData = [
        { id: 'br', name: 'Brasil (Ejemplo)', flag: '🇧🇷', price: 450, currency: 'BRL' },
        { id: 'es', name: 'España (Ejemplo)', flag: '🇪🇸', price: 850, currency: 'EUR' },
      ];
      setResults(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const openTutorial = (deal) => {
    setSelectedDeal(deal);
    setShowTutorial(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-blue-900 text-white pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Travel background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative container mx-auto px-4 pt-10">
          <nav className="flex justify-between items-center mb-16">
            <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <Globe className="text-teal-400" /> TRAVPN
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium">
              <a href="#" className="hover:text-teal-300 transition">Destinos</a>
            </div>
          </nav>

          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              El mismo vuelo,<br/>
              <span className="text-teal-400">diferente precio.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 font-light">
              Comparamos precios reales usando nuestra red global para decirte desde qué país conectarte.
            </p>
          </div>
        </div>
      </div>

      {/* --- CAJA DE BÚSQUEDA FLOTANTE --- */}
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto">
          
          <div className="flex gap-6 mb-6 border-b border-slate-100 pb-4">
            <button 
              onClick={() => setTripType('roundtrip')}
              className={`pb-2 text-sm font-semibold transition ${tripType === 'roundtrip' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Ida y vuelta
            </button>
            <button 
              onClick={() => setTripType('oneway')}
              className={`pb-2 text-sm font-semibold transition ${tripType === 'oneway' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Solo ida
            </button>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Origen</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500" />
                </div>
                <input 
                  type="text" 
                  placeholder="Ej: MAD" 
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-slate-50 hover:bg-white"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="hidden md:flex md:col-span-1 justify-center items-center pb-3">
              <div className="p-2 bg-slate-100 rounded-full text-slate-400">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Destino</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Plane className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500" />
                </div>
                <input 
                  type="text" 
                  placeholder="Ej: JFK" 
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-slate-50 hover:bg-white"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className={`md:col-span-3 grid ${tripType === 'roundtrip' ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Ida</label>
                <div className="relative">
                   <input 
                    type="date" 
                    className="block w-full px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-600 bg-slate-50"
                    value={formData.departDate}
                    onChange={(e) => setFormData({...formData, departDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              {tripType === 'roundtrip' && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Vuelta</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      className="block w-full px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-600 bg-slate-50"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transform transition hover:-translate-y-0.5 flex justify-center items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <Search className="h-5 w-5" /> Buscar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* --- RESULTADOS --- */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        
        {loading && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-slate-700 mb-4 animate-pulse">Analizando precios globales...</h3>
            <div className="mt-8 flex justify-center gap-4">
              <span className="text-4xl animate-bounce" style={{animationDelay: '0s'}}>🇪🇸</span>
              <span className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🇦🇷</span>
              <span className="text-4xl animate-bounce" style={{animationDelay: '0.4s'}}>🇹🇷</span>
              <span className="text-4xl animate-bounce" style={{animationDelay: '0.6s'}}>🇧🇷</span>
            </div>
          </div>
        )}

        {!loading && !results && (
          <div className="text-center py-10 opacity-60">
            <Globe className="h-16 w-16 mx-auto text-slate-300 mb-4" />
            <p className="text-lg">Introduce tu destino para ver el ahorro real.</p>
          </div>
        )}

        {results && results.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">Resultados del Servidor</h2>
                <p className="text-slate-500 mt-1">
                  Vuelo: <span className="font-semibold text-slate-700">{formData.origin}</span> <ArrowRight className="inline h-3 w-3" /> <span className="font-semibold text-slate-700">{formData.destination}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* MEJOR OFERTA (PRIMERA TARJETA) */}
              <div className="md:col-span-2 lg:col-span-1 row-span-2 bg-white rounded-2xl shadow-xl border-2 border-teal-400 overflow-hidden relative transform hover:scale-[1.01] transition duration-300">
                <div className="bg-teal-500 text-white text-xs font-bold px-3 py-1 absolute top-4 right-4 rounded-full uppercase tracking-wider">
                  ¡Mejor Precio!
                </div>
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-sm font-semibold text-teal-600 mb-2 uppercase tracking-wide">Compra desde aquí:</div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-5xl">{results[0].flag}</span>
                      <h3 className="text-3xl font-bold text-slate-800">{results[0].name || results[0].country}</h3>
                    </div>
                    <p className="text-slate-500 mb-6">
                      Nuestro servidor ha detectado que usando una IP de {results[0].name || results[0].country}, obtienes el precio más bajo.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-extrabold text-slate-900">{results[0].price} {results[0].currency}</span>
                    </div>
                    
                    <button 
                      onClick={() => openTutorial(results[0])}
                      className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition shadow-lg flex justify-center items-center gap-2"
                    >
                      Ver cómo comprar <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* RESTO DE TARJETAS */}
              {results.slice(1).map((region, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{region.flag}</span>
                      <div>
                        <h4 className="font-bold text-slate-700">{region.name || region.country}</h4>
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">IP Requerida</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-slate-800">{region.price} {region.currency}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm">
        <p>© 2024 TRAVPN.com - Conectado a Servidor Seguro.</p>
      </footer>

      {/* --- MODAL TUTORIAL --- */}
      {showTutorial && selectedDeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">{selectedDeal.flag}</span>
                Truco para comprar en {selectedDeal.name || selectedDeal.country}
              </h3>
              <button onClick={() => setShowTutorial(false)} className="p-2 hover:bg-slate-100 rounded-full transition">
                <X className="h-6 w-6 text-slate-500" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="space-y-8">
                
                {/* PASO 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Activa tu VPN</h4>
                    <p className="text-slate-600 mb-2">Necesitas simular que estás en <strong>{selectedDeal.name || selectedDeal.country}</strong>.</p>
                  </div>
                </div>

                {/* PASO 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Modo Incógnito</h4>
                    <p className="text-slate-600">
                      Abre una ventana de <strong>Incógnito/Privada</strong>. Es crucial para borrar cookies anteriores.
                    </p>
                  </div>
                </div>

                {/* PASO 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Busca y Compra</h4>
                    <p className="text-slate-600 mb-3">
                      Entra en Skyscanner o Google Flights. Verás que la moneda ha cambiado a <strong>{selectedDeal.currency}</strong> y el precio es más bajo.
                    </p>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
              <button 
                onClick={() => setShowTutorial(false)}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition"
              >
                ¡Entendido!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;