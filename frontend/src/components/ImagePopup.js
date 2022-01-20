export default function ImagePopup(props) {
    return (
       <div className={`popup popup_type_photo ${props.card.link ? "popup_opened" : ""}`}>
            <div className="popup__photoContainer">
              <img
                src={props.card.link}
                alt="картинка"
                className="popup__image"
              />
              <p className="popup__photoName">{props.card.name}</p>
              <button
                type="button"
                className="popup__close popup__close_type_photo"
                onClick={props.onClose}
              ></button>
            </div>
          </div>
    ) 
}