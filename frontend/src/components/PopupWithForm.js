import React from "react";

function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container" >
        <form name={`${name}-form`} className="popup__form" onSubmit={onSubmit}>
          <fieldset className="popup__fieldset">
            <h2 className="popup__form-heading">{title}</h2>
            {children}
            <button type="submit" name="submit" className="popup__submit-button">{buttonText || 'Сохранить'}</button>
            
            <button type="button" className="popup__close-button" onClick={onClose}></button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
