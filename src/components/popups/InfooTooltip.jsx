import CloseByEsc from "../../hooks/CloseByEsc";

function InfoToolTip({ isOpen, onClose, info }) {
  CloseByEsc({ isOpen, onClose });
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div className="popup__overlay"></div>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          id="popup__close"
          type="button"
          aria-label="close"
          onClick={onClose}
          className="popup__close"
        ></button>
        <div className={"popup__infoToolTip_container"}>
          <img
            className="popup__infoToolTip_image"
            src={info.image}
            alt={info.text}
          />
          <p className="popup__infoToolTip_text">{info.text}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoToolTip;
