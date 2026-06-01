import React from 'react';

export default function Inventory({ 
  inventory, 
  selectedSkin, 
  setSelectedSkin, 
  isRolling, 
  handleSell, 
  handleSellAll 
}) {
  return (
    <div className="inventory-section">
      <div className="section-title">
        <h2><i className="fa-solid fa-box-open"></i> Твій інвентар</h2>
        <span className="count">{inventory.length} предметів</span>
        <button className="sell-all-btn" onClick={handleSellAll}>Продати все</button>
      </div>
      
      <div className="skins-grid">
        {inventory.length > 0 ? (
          inventory.map(skin => {
            const isSelected = selectedSkin && selectedSkin.id === skin.id;
            return (
              <div 
                key={skin.id} 
                className={`skin-card ${skin.rarity} ${isSelected ? 'active' : ''} ${isRolling ? 'disabled-click' : ''}`}
                onClick={() => !isRolling && setSelectedSkin(skin)}
              >
                <div className="skin-price">${skin.price.toFixed(2)}</div>
                <img src={skin.img} alt={skin.name} className="skin-img" />
                
                <div className="skin-info-wrapper">
                  <div className="skin-name">{skin.name}</div>
                  {!isRolling && (
                    <button className="sell-skin-btn" onClick={(e) => handleSell(skin, e)}>
                      <i className="fa-solid fa-coins"></i> Продати
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-inventory-text">
            Твій інвентар порожній. Купи щось у магазині знизу!
          </div>
        )}
      </div>
    </div>
  );
}