import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {
    
    const handleClick = () => {
        props.onCardClick(props);
    }

    const handleLikeClick = () => {
      props.onCardLike(props)
    }

    const handleDeleteClick = () => {
       props.onCardDelete(props)
    }
    
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.userId === currentUser._id;
    const cardDeleteButtonClassName = (
      `element__delete ${isOwn ? '' : ' element__delete_hidden'}`
    );

    const isLiked = props.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
      `element__like ${isLiked ? 'element__like_active' : ''}`
    );
    

  return (
    <div className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img
        src={props.link}
        alt="картинка"
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__bottom">
        <p className="element__name">{props.name}</p>
        <div className="like-group">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <div className="element__like-count">{props.likes.length}</div>
        </div>
      </div>
    </div>
  );
}
