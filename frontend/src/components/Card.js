import React from "react";
// import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ name, link, id, likes, onCardClick, card, onDeleteClick, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = isLiked ? 'card__like-icon_active' : 'card__like-icon';
  const cardDeleteButtonClassName = isOwn ? 'card__bin-icon' : 'card__bin-icon_hidden';

  function handleClick() {
    onCardClick({ name, link });
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDelete() {
    onDeleteClick(card);
  }

  return (
    <div className="card">
      {isOwn && <button className={cardDeleteButtonClassName} onClick={handleDelete} />}
      <img className="card__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="card__info-area">
        <h2 className="card__heading">{name}</h2>
        <div>
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <div className="card__counter">{likes.length}</div>
        </div>
      </div>
    </div>
  )
}

export default Card;