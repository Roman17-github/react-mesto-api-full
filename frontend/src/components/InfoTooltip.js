import reg_ok from "../images/reg-ok.svg";
import reg_failed from "../images/reg=failed.svg";


export default function InfoTooltip({isOpen,onClose,isSucces}) {
    return(
        <div className={`popup  ${isOpen ? "popup__status_opened" : ""}`}>
            <div className="popup__container">
              <img
                src={isSucces ? reg_ok : reg_failed}
                alt="картинка"
                className="popup__image_status"
              />
              <p className="popup__status">
                  {isSucces ? "Вы успешно зарегистрировались" : "Что-то пошло не так!Попробуйте ещё раз"}
              </p>
              <button
                type="button"
                className="popup__close"
                onClick={onClose}
              ></button>
            </div>
          </div>
    )
}