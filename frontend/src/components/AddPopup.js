import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPopup({ isOpen, onClose, onAddPlace }) {

  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      place,
      link
    })
  }

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    if(isOpen) {
      setPlace('');
      setLink('');
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Добавить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        minLength="2"
        maxLength="30"
        name="place"
        id="form-input-place"
        className="popup__input"
        required
        placeholder="Название"
        onChange={handlePlaceChange} 
        value={place}
        />

      <span className="form-input-place-error"></span>

      <input
        type="url"
        name="link"
        id="form-input-link"
        className="popup__input"
        required
        placeholder="Ссылка на картинку"
        onChange={handleLinkChange}
        value={link}
        />

      <span className="form-input-link-error"></span>
    </PopupWithForm>
  )
}

export default AddPopup;