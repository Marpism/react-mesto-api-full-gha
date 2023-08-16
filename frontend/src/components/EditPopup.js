import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditPopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        minLength="2"
        maxLength="40"
        name="name"
        id="form-input-username"
        className="popup__input"
        required
        onChange={handleChangeName}
        value={name || ''} />

      <span className="form-input-username-error"></span>

      <input
        type="text"
        minLength="2"
        maxLength="200"
        name="about"
        id="form-input-subscription"
        className="popup__input"
        required
        onChange={handleChangeDescription}
        value={description || ''} />

      <span className="form-input-subscription-error"></span>
    </PopupWithForm>
  )
}

export default EditPopup;
