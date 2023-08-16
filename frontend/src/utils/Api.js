class Api {
  constructor(options) {
    this._url = options.url
    this._headers = options.headers
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt');

    return {
      'Authorization': `Bearer ${token}`,
      ...this._headers};
  }

  getCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._getHeaders()
    })
      .then(this._getResponseData);
  }

  getUserData() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._getHeaders()
    })
      .then(this._getResponseData);
  }

  patchUserData(values) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: values.name,
        about: values.about
      })
    })
      .then(this._getResponseData);
  }

  patchAvatar(values) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: values.avatar
      })
    })
      .then(this._getResponseData);
  }

  postNewCard(values) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: values.name,
        link: values.link
      })
    })
      .then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(this._url + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then(this._getResponseData);
  }

  putLike(id) {
    return fetch(this._url + `/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders()
    })
      .then(this._getResponseData);
  }

  removeLike(id) {
    return fetch(this._url + `/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then(this._getResponseData);
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return this.putLike(id)
    } else {
      return this.removeLike(id)
    }
  }

  getAllData() {
    return Promise.all([this.getCards(), this.getUserData()]);
  }
}

const api = new Api({
  url: 'https://api.marymary.students.nomoreparties.co',
  // 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    // authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRiYWE0YzZiYTA5NjkwN2NlZWI1NmIiLCJpYXQiOjE2OTIxMjU2NzMsImV4cCI6MTY5MjczMDQ3M30.zMmhXx9EvaZTP0J6eauKS6Kn3UWtD2kf-pUY8RSsI6o',
    'Content-Type': 'application/json',
  }
});

export default api;