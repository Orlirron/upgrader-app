import React from 'react';

export default function Header({ online, upgrades, balance, setBalance, setIsProfileOpen }) {
  return (
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
  );
}