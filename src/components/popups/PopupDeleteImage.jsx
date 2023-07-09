import React from "react";
import PopupWithForm from "./PopupWithForm";

const PopupDeleteImage = ({
  isOpen,
  onClose,
  buttonText,
  deleteImage,
  card,
}) => {
  function onSubmit(e) {
    e.preventDefault();
    deleteImage(card);
  }
  return (
    <PopupWithForm
      name={"delete-image"}
      title={"Вы уверены?"}
      isOpen={isOpen}
      onClose={onClose}
      textSubmit={buttonText}
      onSubmit={onSubmit}
      isValid={true}
    />
  );
};

export default PopupDeleteImage;
