import React from "react";
import image from "../images/1.jpg"

function ImagePopup({ card, onClose }) {
  return (
    <div className={card.name ? "popup popup_dark popup_opened" : "popup popup_dark"} id="image_popup">
      <figure className="popup__image-container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <img className="popup__image" alt={card.name} src={card.link} />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;

