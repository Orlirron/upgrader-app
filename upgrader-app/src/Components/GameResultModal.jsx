import React from 'react';

export default function GameResultModal({ gameResult, targetSkin, closeResult }) {
  return (
    <div className="result-overlay animate-fade-in">
      <div className={`result-modal ${gameResult}`}>
        <i className={gameResult === 'win' ? "fa-solid fa-trophy modal-icon" : "fa-solid fa-bomb modal-icon"}></i>
        <h2>{gameResult === 'win' ? "УСПІШНИЙ АПГРЕЙД!" : "КРАШ!"}</h2>
        <p>{gameResult === 'win' ? `Ти виграв новий скін ціною $${targetSkin.price.toFixed(2)}` : "Твій предмет згорів у рулетці"}</p>
        <button className="close-result-btn" onClick={closeResult}>ОК, СТАВИТИ ЩЕ</button>
      </div>
    </div>
  );
}