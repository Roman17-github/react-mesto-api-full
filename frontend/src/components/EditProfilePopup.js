import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {

    const [name,setName] = React.useState("");
    const [description,setDescription] = React.useState("");
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser,props.isOpen]);

      function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
          name:name,
          about: description,
        });
      } 

    return (
        <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        isOpen={props.isOpen}
        onClose={props.onClose}
        buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
        submitType="disabled"
        onSubmit={handleSubmit}
      >
        <input
          name="name"
          type="text"
          placeholder="ваше имя"
          className="popup__input"
          id="name"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
          onChange={(e) => {setName( e.target.value)}}
        />
        <span id="name-error" className="form__error"></span>
        <input
          name="about"
          type="text"
          placeholder="род занятий"
          className="popup__input"
          id="subline"
          minLength="2"
          maxLength="200"
          required
          value={description || ""}
          onChange={(e) => {setDescription( e.target.value)}}
        />
        <span id="subline-error" className="form__error"></span>
      </PopupWithForm>
    );


}