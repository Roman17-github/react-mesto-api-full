import React from "react";
import Card from "./Card.js";
import  CurrentUserContext  from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser.avatar}
            alt="аватар"
            className="profile__image"
          />
          <div
            className="profile__icon"
            onClick={() => props.onEditAvatar()}
          ></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit"
            onClick={() => props.onEditProfile(true)}
          ></button>
          <p className="profile__subline">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={() => props.onPlaceAdd()}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              onCardClick={props.onCardClick}
              key={card._id}
              userId={card.owner._id}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              {...card}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
