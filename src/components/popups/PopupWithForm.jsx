import CloseByEsc from "../../hooks/CloseByEsc";

const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  children,
  textSubmit,
  onSubmit,
  isValid,
  isDisable,
  values,
}) => {
  // console.log(name, title, isOpen, onClose, children);

  CloseByEsc({ isOpen, onClose });
  // console.log(isValid);

  return (
    <div>
      <div
        className={`${name} popup ${isOpen ? "popup_opened" : ""} `}
        onClick={onClose}
      >
        <div className="popup__container" onClick={(e) => e.stopPropagation()}>
          <h2 className="popup__title">{title}</h2>
          <form
            noValidate
            name={`popup-${name}`}
            className={`popup__form`}
            onSubmit={onSubmit}
          >
            {children}
            <button
              type="submit"
              aria-label="saveButton"
              className={`${
                isValid
                  ? "popup__button "
                  : "popup__button popup__button_inactive"
              }`}
              disabled={!isValid}
            >
              {textSubmit}
            </button>

            <button
              type="button"
              aria-label="close"
              onClick={onClose}
              className="popup__close"
            ></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupWithForm;
