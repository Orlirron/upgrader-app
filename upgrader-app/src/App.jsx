import React, { useState, useEffect } from 'react';
import './App.css';

// Початковий інвентар, якщо в пам'яті порожньо
const INITIAL_INVENTORY = [
  { id: 1, name: "AK-47 | Redline", price: 25.50, rarity: "classified", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914757.png" },
  { id: 2, name: "AWP | Asiimov", price: 115.00, rarity: "covert", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914856.png" },
];

const STORE_SKINS = [
  { id: 201, name: "P250 | Sand Dune", price: 0.50, rarity: "consumer", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914392.png" },
  { id: 202, name: "AK-47 | Redline", price: 25.50, rarity: "classified", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914757.png" },
  { id: 203, name: "USP-S | Kill Confirmed", price: 45.00, rarity: "covert", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3915152.png" },
  { id: 204, name: "Desert Eagle | Printstream", price: 85.00, rarity: "covert", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914931.png" },
  { id: 205, name: "AWP | Asiimov", price: 115.00, rarity: "covert", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914856.png" },
];

const TARGET_SKINS_POOL = [
  { id: 101, name: "M4A4 | Howl", price: 2100.00, rarity: "contraband", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914841.png" },
  { id: 102, name: "Glock-18 | Fade", price: 950.00, rarity: "covert", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914902.png" },
  { id: 103, name: "M9 Bayonet | Doppler", price: 1200.00, rarity: "covert", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3915525.png" },
  { id: 104, name: "Butterfly Knife | Fade", price: 2800.00, rarity: "covert", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3915509.png" },
  { id: 105, name: "Karambit | Doppler", price: 3500.00, rarity: "covert", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3915517.png" },
  { id: 106, name: "AK-47 | Fire Serpent", price: 800.00, rarity: "classified", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914758.png" },
  { id: 107, name: "AWP | Dragon Lore", price: 1500.00, rarity: "covert", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914857.png" },
  { id: 108, name: "M4A1-S | Hyper Beast", price: 400.00, rarity: "classified", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914842.png" },
  { id: 109, name: "P90 | Emerald Dragon", price: 300.00, rarity: "classified", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914393.png" },
  { id: 110, name: "USP-S | Orion", price: 150.00, rarity: "classified", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3915153.png" },
  { id: 111, name: "Desert Eagle | Blaze", price: 250.00, rarity: "classified", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914932.png" },
  { id: 112, name: "FAMAS | Styx", price: 75.00, rarity: "restricted", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914701.png" },
  { id: 113, name: "Nova | Bloomstick", price: 50.00, rarity: "restricted", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914685.png" },
  { id: 114, name: "MAC-10 | Neon Rider", price: 60.00, rarity: "restricted", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914677.png" },
  { id: 115, name: "MP7 | Nemesis", price: 80.00, rarity: "restricted", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914678.png" },
  { id: 116, name: "P250 | Mehndi", price: 40.00, rarity: "restricted", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914394.png" },
  { id: 117, name: "CZ75-Auto | Victoria", price: 30.00, rarity: "restricted", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914679.png" },
  { id: 118, name: "R8 Revolver | Reboot", price: 20.00, rarity: "restricted", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914680.png" },
  { id: 119, name: "XM1014 | Tranquility", price: 15.00, rarity: "restricted", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914681.png" },
  { id: 120, name: "Sawed-Off | Origami", price: 10.00, rarity: "restricted", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914682.png" },
  { id: 121, name: "MP9 | Rose Iron", price: 5.00, rarity: "mil-spec", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914676.png" },
  { id: 122, name: "P2000 | Handgun", price: 3.00, rarity: "mil-spec", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914395.png" },
  { id: 123, name: "G3SG1 | Murky", price: 2.00, rarity: "mil-spec", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914702.png" },
  { id: 124, name: "SSG 08 | Detour", price: 1.50, rarity: "mil-spec", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914703.png" },
  { id: 125, name: "Negev | Bratatat", price: 1.00, rarity: "mil-spec", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914704.png" },
  { id: 126, name: "PP-Bizon | Harvester", price: 0.75, rarity: "mil-spec", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914705.png" },
  




];

export default function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [online, setOnline] = useState(2198);

  const [personalStats, setPersonalStats] = useState(() => {
    const saved = localStorage.getItem('upgrader_personal_stats');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Захист: якщо в пам'яті лежать старі дані без biggestWin, додаємо його безпечно
      return { ...parsed, biggestWin: parsed.biggestWin || 0 };
    }
    return { wins: 0, losses: 0, biggestWin: 0 };
  });

  const [upgrades, setUpgrades] = useState(() => {
    const saved = localStorage.getItem('upgrader_stats');
    return saved ? JSON.parse(saved) : 128727390;
  });

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('upgrader_balance');
    return saved ? JSON.parse(saved) : 150.00;
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('upgrader_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  useEffect(() => {
    localStorage.setItem('upgrader_personal_stats', JSON.stringify(personalStats));
  }, [personalStats]);

  useEffect(() => {
    localStorage.setItem('upgrader_stats', JSON.stringify(upgrades));
  }, [upgrades]);

  useEffect(() => {
    localStorage.setItem('upgrader_balance', JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('upgrader_inventory', JSON.stringify(inventory));
  }, [inventory]);

  const [selectedSkin, setSelectedSkin] = useState(null);
  const [targetSkin, setTargetSkin] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(0); 
  const [gameResult, setGameResult] = useState(null);

  let winChance = 0;
  if (selectedSkin && targetSkin) {
    winChance = (selectedSkin.price / targetSkin.price) * 100;
    if (winChance > 100) winChance = 100;
  }

  const handleBuySkin = (skin) => {
    if (isRolling) return;
    
    if (balance < skin.price) {
      alert("Не вистачає грошей! Натисни кнопку 'Top Up' вгорі.");
      return;
    }

    setBalance(prev => prev - skin.price);
    setInventory(prev => [...prev, { ...skin, id: Date.now() }]);
  };

  const handleSell = (skinToSell, event) => {
    event.stopPropagation();
    setBalance(prevBalance => prevBalance + skinToSell.price);
    setInventory(prevInventory => prevInventory.filter(skin => skin.id !== skinToSell.id));
    if (selectedSkin && selectedSkin.id === skinToSell.id) {
      setSelectedSkin(null);
    }
  };

  const handleSellAll = () => {
    if (isRolling) return;
    if (inventory.length === 0) return;

    const totalValue = inventory.reduce((sum, skin) => sum + skin.price, 0);
    setBalance(prev => prev + totalValue);
    setInventory([]);
    setSelectedSkin(null);
  };

  const handleUpgrade = () => {
    if (isRolling) return;
    setIsRolling(true);
    setGameResult(null);
    setCurrentRoll(0);

    const finalRoll = Math.random() * 100; 
    let currentVal = 0;
    let ticks = 0;
    const totalTicks = 60; 
    const step = finalRoll / totalTicks; 

    const rollInterval = setInterval(() => {
      currentVal += step;
      setCurrentRoll(currentVal);
      ticks++;

      if (ticks >= totalTicks) {
        clearInterval(rollInterval);
        setCurrentRoll(finalRoll); 

        if (finalRoll <= winChance) {  
          setPersonalStats(prev => ({
            ...prev,
            wins: prev.wins + 1,
            biggestWin: Math.max(prev.biggestWin || 0, targetSkin.price)
          }));
          
          setGameResult('win');
          setInventory(prevInventory => {
            const withoutOldSkin = prevInventory.filter(skin => skin.id !== selectedSkin.id);
            return [...withoutOldSkin, { ...targetSkin, id: Date.now() }];
          });
          setUpgrades(prev => prev + 1);
        } else {
          setPersonalStats(prev => ({
            ...prev,
            losses: prev.losses + 1
          }));
          
          setGameResult('lose');
          setInventory(prevInventory => {
            return prevInventory.filter(skin => skin.id !== selectedSkin.id);
          });
        }
        setIsRolling(false);
      }
    }, 50); 
  };

  const closeResult = () => {
    setGameResult(null);
    setSelectedSkin(null);
    setTargetSkin(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOnline(prev => prev + Math.floor(Math.random() * 5 - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

      {gameResult && (
        <div className="result-overlay animate-fade-in">
          <div className={`result-modal ${gameResult}`}>
            <i className={gameResult === 'win' ? "fa-solid fa-trophy modal-icon" : "fa-solid fa-bomb modal-icon"}></i>
            <h2>{gameResult === 'win' ? "УСПІШНИЙ АПГРЕЙД!" : "КРАШ СЛУЧИВСЯ!"}</h2>
            <p>{gameResult === 'win' ? `Ти виграв новий скін ціною $${targetSkin.price.toFixed(2)}` : "Твій предмет згорів у рулетці"}</p>
            <button className="close-result-btn" onClick={closeResult}>ОК, СТАВИТИ ЩЕ</button>
          </div>
        </div>
      )}

      {isProfileOpen && (
        <div className="result-overlay animate-fade-in" onClick={() => setIsProfileOpen(false)}>
          <div className="result-modal profile-panel" onClick={(e) => e.stopPropagation()}>
            <h2><i className="fa-solid fa-user-gear text-gold"></i> Твоя аналітика</h2>
            
            <div className="stats-container">
              <div className="profile-stat-box">
                <span className="p-label">Всього ігор</span>
                <span className="p-value">{personalStats.wins + personalStats.losses}</span>
              </div>
              <div className="profile-stat-box">
                <span className="p-label">Вінрейт</span>
                <span className="p-value">
                  {personalStats.wins + personalStats.losses > 0 
                    ? `${((personalStats.wins / (personalStats.wins + personalStats.losses)) * 100).toFixed(1)}%`
                    : "0%"}
                </span>
              </div>
              <div className="profile-stat-box">
                <span className="p-label">Найбільший куш</span>
                <span className="p-value" style={{ color: '#4caf50' }}>
                  ${(personalStats.biggestWin || 0).toFixed(2)}
                </span>
              </div>
            </div>

            <button className="close-result-btn" onClick={() => setIsProfileOpen(false)}>ЗАКРИТИ</button>
          </div>
        </div>
      )}

      <header className="main-header">
        <div className="header-section stats">
          <div className="stat-item">
            <span className="dot green"></span>
            <span className="label">ONLINE</span>
            <span className="value">{online.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <i className="fa-solid fa-bolt icon-gold"></i>
            <span className="label">UPGRADES</span>
            <span className="value">{upgrades.toLocaleString()}</span>
          </div>
        </div>
        <div className="header-section logo">
          <div className="logo-wrapper">
            <i className="fa-solid fa-shield-halved logo-icon"></i>
            <h1>UPGRADER</h1>
          </div>
        </div>
        <div className="header-section user-controls">
          <div className="lang-select">
            <img src="https://flagcdn.com/w20/gb.png" alt="en" />
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div className="wallet">
            <i className="fa-solid fa-coins gold-text"></i>
            <span className="balance-value">${balance.toFixed(2)}</span>
            <button className="top-up-btn" onClick={() => setBalance(prev => prev + 100)}>
              <i className="fa-solid fa-plus"></i> Top Up
            </button>
          </div>
          <div className="profile" onClick={() => setIsProfileOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="avatar-wrapper">
              <img src="https://i.pravatar.cc/100?img=12" alt="avatar" />
              <div className="level-badge">12</div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-layout">
        
        <section className="left-column">
          
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

          <div className="store-section">
            <div className="section-title">
              <h2><i className="fa-solid fa-cart-shopping"></i> Магазин скінів</h2>
            </div>
            <div className="store-grid">
              {STORE_SKINS.map(skin => (
                <div 
                  key={skin.id} 
                  className={`store-card ${skin.rarity} ${isRolling ? 'disabled-click' : ''}`}
                  onClick={() => handleBuySkin(skin)}
                >
                  <div className="store-skin-price">${skin.price.toFixed(2)}</div>
                  <img src={skin.img} alt="" />
                  <div className="store-buy-overlay">
                    <span><i className="fa-solid fa-basket-shopping"></i> КУПИТИ</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

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
                {/* ОСЬ ГОЛОВНИЙ ФІКС: Більше ніяких `rolling` класів, кружечок стоїть як вкопаний */}
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
                {TARGET_SKINS_POOL.map(skin => {
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

      </main>
    </div>
  );
}