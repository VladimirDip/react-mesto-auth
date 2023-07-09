import CloseByEsc from "../../hooks/CloseByEsc";

const ImagePopup = ({ card, isOpen, onClose }) => {
  CloseByEsc({ isOpen, onClose });

  return (
    <div>
      <div
        className={`popup open-image ${card && isOpen ? `popup_opened` : ""}`}
        data-target="button-open-image"
        onClick={onClose}
      >
        <div
          className="popup__container popup__container_images"
          id="open-image"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            className="popup__image"
            src={card ? card.src : {}}
            alt={card ? card.alt : {}}
          />
          <p className="popup__title-image">{card ? card.name : {}}</p>
          <button
            className="popup__close"
            type="button"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
