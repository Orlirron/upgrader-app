import React from 'react';

export default function UpgradeArena({
  selectedSkin,
  targetSkin,
  isRolling,
  currentRoll,
  winChance,
  handleUpgrade,
  setTargetSkin,
  targetSkinsPool
}) {
  return (
    <section className="upgrade-section">
      <div className="upgrade-workspace">
        <div className="game-screen">
          <div className="game-slot">
            <span className="slot-label">ТВОЯ СТАВКА</span>
            {selectedSkin ? (
              <div className="slot-filled">
                <img src={selectedSkin.img} alt="" />
                <div className="slot-price">${selectedSkin.price.toFixed(2)}</div>
              </div>
            ) : (
              <div className="slot-empty"><i className="fa-solid fa-plus"></i></div>
            )}
          </div>

          <div className="roulette-zone">
            <div className="percentage-circle">
              <span>
                {isRolling ? `${currentRoll.toFixed(2)}%` : (winChance > 0 ? `${winChance.toFixed(2)}%` : "0%")}
              </span>
            </div>
          </div>

          <div className="game-slot">
            <span className="slot-label">ТВОЯ ЦІЛЬ</span>
            {targetSkin ? (
              <div className="slot-filled">
                <img src={targetSkin.img} alt="" />
                <div className="slot-price">${targetSkin.price.toFixed(2)}</div>
              </div>
            ) : (
              <div className="slot-empty"><i className="fa-solid fa-crosshairs"></i></div>
            )}
          </div>
        </div>

        <button 
          className="action-upgrade-btn" 
          disabled={!selectedSkin || !targetSkin || isRolling}
          style={{ opacity: (selectedSkin && targetSkin && !isRolling) ? 1 : 0.4 }}
          onClick={handleUpgrade}
        >
          {isRolling ? "КРУТИМО..." : "ПОЧАТИ АПГРЕЙД"}
        </button>

        <div className="target-pool-zone">
          <h3>Обери скін, який хочеш отримати:</h3>
          <div className="target-grid">
            {targetSkinsPool.map(skin => {
              const isTarget = targetSkin && targetSkin.id === skin.id;
              return (
                <div 
                  key={skin.id} 
                  className={`target-card ${skin.rarity} ${isTarget ? 'active-target' : ''} ${isRolling ? 'disabled-click' : ''}`}
                  onClick={() => !isRolling && setTargetSkin(skin)}
                >
                  <img src={skin.img} alt="" />
                  <div className="target-info">
                    <span className="t-name">{skin.name.split(' | ')[1]}</span>
                    <span className="t-price">${skin.price.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}