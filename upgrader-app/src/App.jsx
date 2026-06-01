import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Inventory from './components/Inventory';
import Store from './components/Store';
import UpgradeArena from './components/UpgradeArena';
import GameResultModal from './components/GameResultModal';
import ProfileModal from './components/ProfileModal';

// Початковий інвентар, якщо в пам'яті порожньо
const INITIAL_INVENTORY = [
  { id: 1, name: "AK-47 | Redline", price: 25.50, rarity: "classified", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914757.png" },
  { id: 2, name: "AWP | Asiimov", price: 115.00, rarity: "covert", img: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images/skins/3914856.png" },
];

export default function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [online, setOnline] = useState(2198);

  const [targetSkinsPool, setTargetSkinsPool] = useState([]);

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

  // Стан для скінів у магазині та індикатор завантаження
  const [storeSkins, setStoreSkins] = useState([]);
  const [isLoadingStore, setIsLoadingStore] = useState(true);

  // useEffect з порожнім масивом [] запуститься лише 1 раз — при старті сайту
useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingStore(true);
        
        // ВАЖЛИВО: ці файли ПОВИННІ бути в папці public/
        // Шлях '/' означає корінь папки public
        const [storeRes, poolRes] = await Promise.all([
          fetch('/store-items.json'), 
          fetch('/roulette-pool.json')
        ]);
        
        if (!storeRes.ok || !poolRes.ok) {
          throw new Error(`Помилка завантаження: ${storeRes.status} ${poolRes.status}`);
        }

        const storeData = await storeRes.json();
        const poolData = await poolRes.json();

        setStoreSkins(storeData);
        setTargetSkinsPool(poolData);
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
      } finally {
        setIsLoadingStore(false);
      }
    };

    fetchData();
  }, []);

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
           <GameResultModal 
             gameResult={gameResult} 
             targetSkin={targetSkin} 
             closeResult={closeResult} 
           />
         )}

         {isProfileOpen && (
           <ProfileModal 
             setIsProfileOpen={setIsProfileOpen} 
             personalStats={personalStats} 
           />
         )}

    {/* Підключений компонент шапки */}
      <Header 
        online={online} 
        upgrades={upgrades} 
        balance={balance} 
        setBalance={setBalance} 
        setIsProfileOpen={setIsProfileOpen} 
      />

      <main className="main-layout">
        
        <section className="left-column">
          
        <Inventory 
         inventory={inventory}
         selectedSkin={selectedSkin}
         setSelectedSkin={setSelectedSkin}
         isRolling={isRolling}
         handleSell={handleSell}
         handleSellAll={handleSellAll}
       />

        <Store 
         skinsData={storeSkins} 
         buySkin={handleBuySkin} 
         isRolling={isRolling}
       />

        </section>

        <UpgradeArena 
              selectedSkin={selectedSkin}
              targetSkin={targetSkin}
              isRolling={isRolling}
              currentRoll={currentRoll}
              winChance={winChance}
              handleUpgrade={handleUpgrade}
              setTargetSkin={setTargetSkin}
              targetSkinsPool={targetSkinsPool}
            />

      </main>
    </div>
  );
}