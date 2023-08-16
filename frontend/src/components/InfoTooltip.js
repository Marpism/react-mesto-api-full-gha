import React from 'react';
import failIcon from '../images/Union2.svg';
import successIcon from '../images/Union.svg';

export default function InfoTooltip({ onClose, isOpen, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? `popup_opened` : ""}`}>
      {isSuccess ? (
        <div className="popup__status-alert" >
          <img className="popup__alert-icon" alt="Регистрация прошла успешно" src={successIcon} />
          <p className="popup__alert-text">Вы успешно зарегистрировались!</p>
          <button type="button" className="popup__close-button" onClick={onClose}></button>
        </div>
      ) : (
        <div className="popup__status-alert" >
          <img className="popup__alert-icon" alt="Что-то пошло не так" src={failIcon} />
          <p className="popup__alert-text">Что-то пошло не так! Попробуйте ещё раз.</p>
          <button type="button" className="popup__close-button" onClick={onClose}></button>
        </div>
      )}
    </div>
  )
}