import React, { useContext } from "react";
import Card from "../card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Main = ({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleDeleteImage,
  onCardClick,
  cardsData,
}) => {
  const currentUser = useContext(CurrentUserContext);
  // console.log("render main");
  return (
    <main className="main">
      <section className="profile page__profile">
        <div className="profile__avatar-wrapper">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />

          <div
            className="profile__update-avatar"
            onClick={handleEditAvatarClick}
          ></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>

          <p className="profile__description">{currentUser.description}</p>

          <button
            className="profile__edit animation"
            aria-label="edit profile"
            type="button"
            data-button="button-edit-profile"
            onClick={handleEditProfileClick}
          ></button>
        </div>

        <button
          className="profile__add-new-card animation"
          type="button"
          data-button="button-add-new-card"
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section className="cards page__cards" aria-label="articles">
        {cardsData.map((card) => {
          return (
            <Card
              onCardClick={onCardClick}
              handleDeleteImage={handleDeleteImage}
              card={card}
              cardsData={cardsData}
              key={card._id}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
