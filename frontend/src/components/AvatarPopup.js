import React from "react";
import PopupWithForm from "./PopupWithForm";

function AvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    if(isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        id="form-input-avatar"
        className="popup__input"
        required
        ref={avatarRef}
        placeholder="Ссылка"
      />
      <span className="form-input-avatar-error"></span>
    </PopupWithForm>
  )
}

export default AvatarPopup;