class Auth {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then(this._getResponseData)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        return res;
      }
    })
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
      .then(this._getResponseData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          return res;
        }
      })
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._getResponseData);
  }
}

const auth = new Auth({
  url: 'https://api.marymary.students.nomoreparties.co',
  // 'https://auth.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default auth;















