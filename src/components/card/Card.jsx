import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LikeButton from "./LikeButton";

const Card = ({ onCardClick, card, handleDeleteImage }) => {
  const currentUser = useContext(CurrentUserContext);
  const handleClick = () => {
    onCardClick(card);
  };

  function handleDeleteClick() {
    handleDeleteImage(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "" : "card__delete_hidden"
  }`;
  // console.log("Card");
  // console.log(card);
  return (
    <article className="card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="card__image"
        src={card.src}
        alt={card.name}
        onClick={handleClick}
      />
      <h2 className="card__title">{card.name}</h2>

      <LikeButton
        likes={card.likes}
        userId={currentUser._id}
        cardId={card._id}
      />
    </article>
  );
};

export default Card;
