import PopupWithForm from "./PopupWithForm";
import React, { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  buttonText,
  disable,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { handleChange, isValid, errors, values, reset, setValue } =
    useFormValidation({
      isOpen,
    });
  const onSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      description: values.description,
    });
  };
  useEffect(() => {
    if (isOpen) {
      reset({ name: currentUser.name, description: currentUser.description });
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("description", currentUser.description);
  }, [currentUser, setValue]);

  return (
    <PopupWithForm
      name={"edit-profile"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      textSubmit={buttonText}
      onSubmit={onSubmit}
      isValid={isValid}
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
          id="name"
          placeholder="Введите имя"
          onChange={handleChange}
          maxLength={30}
          minLength={2}
          required={true}
          value={values.name ? values.name : ""}
        />
        <span
          className={`popup__input-error ${
            errors.name ? "popup__input-error_active" : ""
          }`}
        >
          {errors.name}
        </span>
      </label>

      <label className="popup__input-field" htmlFor="description">
        <input
          className={`popup__input-form ${
            errors.description ? "popup__input-form_type_error" : ""
          }`}
          type="text"
          name="description"
          id="description"
          placeholder="Введите описание"
          onChange={handleChange}
          maxLength={150}
          minLength={2}
          required={true}
          value={values.description ? values.description : ""}
        />
        <span
          className={`popup__input-error ${
            errors.description ? "popup__input-error_active" : ""
          }`}
        >
          {errors.description}
        </span>
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
