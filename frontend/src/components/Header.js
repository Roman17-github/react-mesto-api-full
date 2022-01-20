import logo from "../images/logo.svg";
import { Link, Route } from "react-router-dom";

function Header({ loggedIn,email }) {

  const removeToken = () => {
    localStorage.removeItem('jwt');
  }
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      <div className="header__profile">
        
        {loggedIn && (
          <Route exact path="/">
            <p className="header__email">{email}</p>
            <Link to="/sign-in" className="header__login" onClick={removeToken}>
              Выйти
            </Link>
          </Route>
        )}
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__login">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__login">
            Вход
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
