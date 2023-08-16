import React, { useContext } from "react";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteClick, onCardLike }) {


  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.data.name;
  const userDescription = currentUser.data.about;
  const userAvatar = currentUser.data.avatar;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__photo" alt="Фото юзера" style={{ backgroundImage: `url(${userAvatar})` }}>
            <div className="profile__photo-overlay"></div>
            <button
              type="button"
              className="profile__avatar-button"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__text">
            <h1 className="profile__username">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
            <p className="profile__subscription">{userDescription}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="cardsArea">
        {
          cards.data.map((card) => {
            return (<Card
            name={card.name}
            link={card.link}
            likes={card.likes}
            id={card._id}
            key={card._id}
            onCardClick={onCardClick}
            card={card}
            onDeleteClick={onDeleteClick}
            onCardLike={onCardLike}
          />)}
          )
        }

      </section>
    </main>
  )
}

export default Main;