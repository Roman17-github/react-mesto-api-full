 class Api {
    constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    }
  
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    getCards() {
      return fetch(`${this._url}/cards`, {
        method: "GET",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    setUserInfo(input) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: input.name,
          about: input.about,
        }),
      }).then(this._checkResponse);
    }
  
    addCard(input) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: input.name,
          link: input.link,
        }),
      }).then(this._checkResponse);
    }
  
    deleteCard(cardID) {
      return fetch(`${this._url}/cards/${cardID}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    avatar(input) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: input.avatar,
        }),
      }).then(this._checkResponse);
    }

    changeLikeCardStatus(cardID,isLiked) {
      if (isLiked) {
        return fetch(`${this._url}/cards/likes/${cardID}`, {
          method: "PUT",
          headers: this._headers,
        }).then(this._checkResponse);
      } else {
        return fetch(`${this._url}/cards/likes/${cardID}`, {
          method: "DELETE",
          headers: this._headers,
        }).then(this._checkResponse);
      }
    }
  }

   const api = new Api({
    url: "https://nomoreparties.co/v1/cohort-26",
    headers: {
      authorization: "aaca6239-cac0-4a87-8d95-e01e56ac6f60",
      "Content-Type": "application/json",
    },
  });
  
  export default api;