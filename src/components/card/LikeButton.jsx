import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const LikeButton = ({ likes, userId, cardId }) => {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some((elem) => userId === elem._id));
  }, [likes, userId]);
  // console.log("heard");

  function handleCardLike() {
    api
      .toggleLikeCard(cardId, isLike)
      .then((newCard) => {
        setIsLike(newCard.likes.some((i) => i._id === userId));
        setCount(newCard.likes.length);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  const cardLikeButtonClassName = `card__like animation ${
    isLike ? "card__like_active" : ""
  }`;
  return (
    <div className={"card__like-wrapper"}>
      <button
        className={cardLikeButtonClassName}
        type="button"
        onClick={handleCardLike}
      ></button>
      <p className="card__like-count">{count}</p>
    </div>
  );
};

export default LikeButton;
