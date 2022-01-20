export default function PopupWithForm(props) {
  
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <form
          name={`form-${props.name}`}
          className="form"
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className={`popup__submit`}>
            {props.buttonText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
