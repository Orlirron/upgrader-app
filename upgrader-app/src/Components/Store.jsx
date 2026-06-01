import React from 'react';

export default function Store({ skinsData, buySkin, isRolling }) {
  return (
    <div className="store-section">
      <div className="section-title">
        <h2><i className="fa-solid fa-cart-shopping"></i> Магазин скінів</h2>
      </div>
      <div className="store-grid">
        {skinsData.map(skin => (
          <div 
            key={`store-${skin.id}`} 
            className={`store-card ${skin.rarity} ${isRolling ? 'disabled-click' : ''}`}
            onClick={() => buySkin(skin)}
          >
            <div className="store-skin-price">${skin.price.toFixed(2)}</div>
            {/* Ось цей рядок відповідає за малюночки */}
            <img src={skin.img} alt={skin.name} />
            <div className="store-buy-overlay">
              <span><i className="fa-solid fa-basket-shopping"></i> КУПИТИ</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}