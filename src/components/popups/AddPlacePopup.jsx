import PopupWithForm from "./PopupWithForm";

import { useEffect } from "react";
import useFormValidation from "../../hooks/useFormValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText, disable }) {
  const { handleChange, isValid, errors, values, reset } = useFormValidation({
    isOpen,
  });

  function onSubmit(e) {
    e.preventDefault();

    const dataCard = {};
    dataCard.name = values.name;
    dataCard.link = values.link;
    onAddPlace(dataCard);
  }

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      name={"add-card"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      textSubmit={buttonText}
      isValid={isValid}
      onSubmit={onSubmit}
      isDisable={disable}
      values={values}
    >
      <label className="popup__input-field" htmlFor="name">
        <input
          className={`popup__input-form ${
            errors.name ? "popup__input-form_type_error" : ""
          }`}
          type="text"
          name="name"
          id="named-place"
          placeholder="Название"
          onChange={handleChange}
          value={values.name ? values.name : ""}
          minLength={2}
          maxLength={30}
          required={true}
        />
        <span
          className={`popup__input-error ${
            errors.name ? "popup__input-error_active" : ""
          }`}
        >
          {errors.name}
        </span>
      </label>
      <label className="popup__input-field" htmlFor="link">
        <input
          className={`popup__input-form ${
            errors.link ? "popup__input-form_type_error" : ""
          }`}
          type="url"
          name="link"
          id="link"
          placeholder="Ссылка на картинку(https://example.com)"
          onChange={handleChange}
          value={values.link ? values.link : ""}
          required={true}
        />
        <span
          className={`popup__input-error ${
            errors.link ? "popup__input-error_active" : ""
          }`}
        >
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
