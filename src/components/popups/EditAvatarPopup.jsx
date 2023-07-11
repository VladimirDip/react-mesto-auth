import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect } from "react";
import useFormValidation from "../../hooks/useFormValidation";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
  disable,
}) {
  let avatarRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  const { handleChange, isValid, errors, values, reset } = useFormValidation({
    isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
      reset();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"update-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      textSubmit={buttonText}
      onSubmit={onSubmit}
      isValid={isValid}
      isDisable={disable}
      values={values}
    >
      <label className="popup__input-field" htmlFor="link">
        <input
          ref={avatarRef}
          className="popup__input-form"
          type="url"
          name="avatarLink"
          id="avatarLink"
          placeholder="Ссылка на картинку(https://example.com)"
          onChange={handleChange}
          value={values.avatarLink ? values.avatarLink : ""}
          required={true}
        />
        <span
          className={`popup__input-error ${
            errors.avatarLink ? "popup__input-error_active" : ""
          }`}
        >
          {errors.avatarLink}
        </span>
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
