import React, { useState } from 'react';
import { Search, Plane, ArrowRight, MapPin, Globe, Info, X, Check, Shield } from 'lucide-react';

// URL DEL BACKEND
const API_URL = 'https://travpn-backend.onrender.com/api/search'; 

const App = () => {
  const [tripType, setTripType] = useState('roundtrip');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departDate: '',
    returnDate: ''
  });

  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '🌍';
    const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

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

      if (!response.ok) throw new Error('Error servidor');
      const data = await response.json();
      const processedData = data.map(item => ({
        ...item,
        flag: item.flag && item.flag.length === 2 ? getFlagEmoji(item.flag) : item.flag || '🌍',
        price: Number(item.price) || 0 
      }));
      processedData.sort((a, b) => a.price - b.price);
      setResults(processedData);
    } catch (error) {
      console.error(error);
      const fallbackData = [
        { id: 'br', name: 'Brasil', flag: '🇧🇷', price: 450, currency: 'BRL' },
        { id: 'tr', name: 'Turquía', flag: '🇹🇷', price: 480, currency: 'TRY' },
        { id: 'es', name: 'España', flag: '🇪🇸', price: 850, currency: 'EUR' },
      ];
      setResults(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // ESTILOS CSS INTEGRADOS (Diseño Azul/Teal Original)
  const styles = `
    /* Variables y Reset */
    :root {
      --primary-blue: #1e3a8a; /* Blue-900 */
      --accent-teal: #2dd4bf; /* Teal-400 */
      --bg-slate: #f8fafc;
      --text-dark: #1e293b;
      --text-gray: #64748b;
      --card-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
    }

    /* --- HERO SECTION --- */
    .hero-section {
      background-color: #1e3a8a;
      color: white;
      position: relative;
      padding-bottom: 8rem; /* Espacio para el buscador flotante */
      overflow: hidden;
      min-height: 500px;
    }

    .hero-bg-img {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover;
      opacity: 0.3;
      z-index: 1;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      letter-spacing: -1px;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }

    .text-teal { color: #2dd4bf; }

    .hero-subtitle {
      font-size: 1.25rem;
      color: #cbd5e1; /* Slate-300 */
      max-width: 600px;
      margin: 0 auto;
    }

    /* --- BUSCADOR FLOTANTE --- */
    .search-wrapper {
      position: relative;
      z-index: 20;
      margin-top: -6rem;
      padding: 0 1rem;
    }

    .search-card {
      background: white;
      max-width: 1000px;
      margin: 0 auto;
      border-radius: 1.5rem; /* rounded-3xl */
      padding: 2rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .tabs {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1rem;
    }

    .tab-btn {
      background: none;
      border: none;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      padding-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .tab-btn.active {
      color: #2563eb; /* Blue-600 */
      border-bottom: 2px solid #2563eb;
    }

    .search-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      align-items: end;
    }

    .input-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 0.5rem;
      margin-left: 0.5rem;
    }

    .input-group {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
    }

    .form-input {
      width: 100%;
      padding: 1rem 1rem 1rem 2.8rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem; /* rounded-xl */
      font-size: 1rem;
      background-color: #f8fafc;
      transition: all 0.2s;
    }

    .form-input:focus {
      background: white;
      border-color: #3b82f6;
      outline: 4px solid rgba(59, 130, 246, 0.1);
    }

    .submit-btn {
      background: linear-gradient(to right, #2563eb, #14b8a6);
      color: white;
      font-weight: 700;
      border: none;
      padding: 1rem;
      border-radius: 0.75rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      transition: transform 0.2s;
      height: 54px; /* Para alinear con inputs */
    }

    .submit-btn:hover { transform: translateY(-2px); }
    .submit-btn:disabled { opacity: 0.7; cursor: wait; }

    /* --- RESULTADOS --- */
    .results-section {
      max-width: 1100px;
      margin: 4rem auto;
      padding: 0 1rem;
    }

    .loading-state {
      text-align: center;
      padding: 4rem 0;
      color: #64748b;
    }

    .results-header {
      margin-bottom: 2rem;
    }

    .route-display {
      color: #64748b;
      font-size: 1.1rem;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    /* Tarjeta Normal */
    .result-card {
      background: white;
      border-radius: 1rem;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    /* Tarjeta Destacada (Estilo Original) */
    .best-deal-card {
      grid-column: span 1;
      grid-row: span 2;
      background: white;
      border-radius: 1rem;
      border: 2px solid #2dd4bf;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
    }

    @media (min-width: 768px) {
      .best-deal-card { grid-column: span 2; flex-direction: row; }
    }
    @media (min-width: 1024px) {
      .best-deal-card { grid-column: span 1; flex-direction: column; }
    }

    .deal-badge {
      position: absolute;
      top: 1rem; right: 1rem;
      background: #14b8a6;
      color: white;
      font-size: 0.75rem;
      font-weight: 800;
      padding: 0.25rem 0.75rem;
      border-radius: 99px;
      text-transform: uppercase;
    }

    .card-content { padding: 2rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }

    .country-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .flag-lg { font-size: 3rem; }
    .country-name-lg { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }

    .price-lg { font-size: 2.5rem; font-weight: 800; color: #0f172a; }
    .savings-text { color: #16a34a; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; }

    .tutorial-btn {
      background: #0f172a; /* Slate-900 */
      color: white;
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 0.75rem;
      font-weight: 700;
      margin-top: 1.5rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      transition: background 0.2s;
    }

    .tutorial-btn:hover { background: #1e293b; }

    /* --- MODAL TUTORIAL (Recuperado) --- */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 50;
      padding: 1rem;
    }

    .modal-content {
      background: white;
      border-radius: 1.5rem;
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      background: white;
    }

    .modal-body { padding: 2rem; }

    .step-item { display: flex; gap: 1rem; margin-bottom: 2rem; }

    .step-circle {
      width: 2.5rem; height: 2.5rem;
      background: #0f172a;
      color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      flex-shrink: 0;
    }

    .step-title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
    .step-desc { color: #64748b; line-height: 1.5; }

    .info-box {
      background: #eff6ff;
      border: 1px solid #dbeafe;
      color: #1e40af;
      padding: 1rem;
      border-radius: 0.75rem;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #f1f5f9;
      background: #f8fafc;
      text-align: center;
    }
  `;

  return (
    <div className="app-container">
      <style>{styles}</style>
      {/* HERO SECTION */}
      <div className="hero-section">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Background" 
          className="hero-bg-img"
        />
        <div className="hero-content">
          <nav className="navbar">
            <div className="logo"><Globe className="text-teal" /> TRAVPN</div>
            <div style={{fontWeight: 500}}>Destinos</div>
          </nav>
          <h1 className="hero-title">
            El mismo vuelo,<br/>
            <span className="text-teal">diferente precio.</span>
          </h1>
          <p className="hero-subtitle">
            Comparamos precios desde servidores en 50+ países para que sepas dónde conectarte con tu VPN.
          </p>
        </div>
      </div>

      {/* BUSCADOR FLOTANTE */}
      <div className="search-wrapper">
        <div className="search-card">
          <div className="tabs">
            <button className={`tab-btn ${tripType === 'roundtrip' ? 'active' : ''}`} onClick={() => setTripType('roundtrip')}>Ida y vuelta</button>
            <button className={`tab-btn ${tripType === 'oneway' ? 'active' : ''}`} onClick={() => setTripType('oneway')}>Solo ida</button>
          </div>

          <form onSubmit={handleSearch} className="search-form">
            <div className="input-group">
              <label className="input-label">Origen</label>
              <MapPin className="input-icon" size={20}/>
              <input type="text" placeholder="Ej: MAD" className="form-input" value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})} required />
            </div>

            <div className="input-group">
              <label className="input-label">Destino</label>
              <Plane className="input-icon" size={20}/>
              <input type="text" placeholder="Ej: HND" className="form-input" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} required />
            </div>

            <div className="input-group">
              <label className="input-label">Fecha Ida</label>
              <input type="date" className="form-input" style={{paddingLeft: '1rem'}} value={formData.departDate} onChange={(e) => setFormData({...formData, departDate: e.target.value})} required />
            </div>

            {tripType === 'roundtrip' && (
              <div className="input-group">
                <label className="input-label">Fecha Vuelta</label>
                <input type="date" className="form-input" style={{paddingLeft: '1rem'}} value={formData.returnDate} onChange={(e) => setFormData({...formData, returnDate: e.target.value})} required />
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Buscando...' : <><Search size={20}/> Buscar</>}
            </button>
          </form>
        </div>
      </div>

      {/* RESULTADOS */}
      <div className="results-section">
        {loading && (
          <div className="loading-state">
            <h2>Analizando precios globales...</h2>
            <p>Conectando con servidores en Argentina, Turquía, Tailandia...</p>
          </div>
        )}
        
        {results && (
          <div>
            <div className="results-header">
              <h2 style={{fontSize: '2rem', fontWeight: 800}}>Resultados</h2>
              <p className="route-display">{formData.origin} <ArrowRight size={14} style={{display:'inline'}}/> {formData.destination}</p>
            </div>

            <div className="cards-grid">
              {/* TARJETA DESTACADA (MEJOR OFERTA) */}
              <div className="best-deal-card">
                <div className="deal-badge">¡Mejor Precio!</div>
                <div className="card-content">
                  <div>
                    <div style={{color: '#0d9488', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Compra desde aquí</div>
                    <div className="country-header">
                      <span className="flag-lg">{results[0].flag}</span>
                      <h3 className="country-name-lg">{results[0].name || results[0].country}</h3>
                    </div>
                    <p style={{color: '#64748b'}}>Usando una IP de este país obtienes el precio más bajo.</p>
                  </div>
                  
                  <div>
                    <div className="price-lg">{results[0].price} {results[0].currency}</div>
                    {results.length > 1 && (
                      <div className="savings-text">
                        <Check size={18} /> Mejor que los {results[results.length - 1].price} {results[results.length - 1].currency} de {results[results.length - 1].name}
                      </div>
                    )}
                    <button className="tutorial-btn" onClick={() => {setSelectedDeal(results[0]); setShowTutorial(true)}}>
                      Ver tutorial de compra <ArrowRight size={20}/>
                    </button>
                  </div>
                </div>
              </div>

              {/* RESTO DE TARJETAS */}
              {results.slice(1).map((deal, idx) => (
                <div key={idx} className="result-card">
                  <div>
                    <div style={{display:'flex', gap:'10px', alignItems:'center', marginBottom:'10px'}}>
                      <span style={{fontSize:'2rem'}}>{deal.flag}</span>
                      <div>
                        <h4 style={{fontWeight:700, margin:0}}>{deal.name || deal.country}</h4>
                        <span style={{fontSize:'0.75rem', background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px', color:'#64748b'}}>IP Requerida</span>
                      </div>
                    </div>
                  </div>
                  <div style={{marginTop:'1rem', fontSize:'1.5rem', fontWeight:700}}>
                    {deal.price} {deal.currency}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL TUTORIAL (Diseño Original Recuperado) */}
      {showTutorial && selectedDeal && (
        <div className="modal-overlay" onClick={() => setShowTutorial(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{fontSize:'1.25rem', fontWeight:800, display:'flex', alignItems:'center', gap:'10px'}}>
                <span style={{fontSize:'1.5rem'}}>{selectedDeal.flag}</span>
                Truco para {selectedDeal.name || selectedDeal.country}
              </h3>
              <button onClick={() => setShowTutorial(false)} style={{background:'none', border:'none', cursor:'pointer'}}><X color="#94a3b8"/></button>
            </div>
            
            <div className="modal-body">
              {/* PASO 1 */}
              <div className="step-item">
                <div className="step-circle">1</div>
                <div>
                  <h4 className="step-title">Activa tu VPN</h4>
                  <p className="step-desc">Necesitas simular que estás en <strong>{selectedDeal.name || selectedDeal.country}</strong>.</p>
                  <div className="info-box">
                    <strong>Recomendación:</strong> Usa NordVPN o Surfshark y selecciona el servidor "{selectedDeal.name || selectedDeal.country}".
                  </div>
                </div>
              </div>

              {/* PASO 2 */}
              <div className="step-item">
                <div className="step-circle">2</div>
                <div>
                  <h4 className="step-title">Modo Incógnito</h4>
                  <p className="step-desc">Abre una ventana de <strong>Incógnito/Privada</strong>. Es crucial para borrar cookies anteriores.</p>
                </div>
              </div>

              {/* PASO 3 */}
              <div className="step-item">
                <div style={{...{width:'2.5rem', height:'2.5rem', background:'#14b8a6', color:'white', borderRadius:'50%', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:700, flexShrink:0}}}>3</div>
                <div>
                  <h4 className="step-title">Busca y Compra</h4>
                  <p className="step-desc">Entra en Skyscanner. Verás la moneda en <strong>{selectedDeal.currency}</strong> y el precio reducido.</p>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="tutorial-btn" style={{marginTop:0}} onClick={() => setShowTutorial(false)}>
                ¡Entendido, voy a probarlo!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;