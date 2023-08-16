import { useEffect, useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditPopup from "./EditPopup";
import AddPopup from "./AddPopup";
import AvatarPopup from "./AvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useNavigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((newCards) => newCards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleDeleteClick(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        setCards((newCards) => cards.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    api.getAllData()
      .then((data) => {
        setCards(data[0])
        setCurrentUser(data[1])
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
      .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', { replace: true });
          // console.log(token)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, []);

  function handleEditProfileClick() {
    setIsEditPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPopupOpen(true);
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({
      name,
      link
    });
  }

  function closeAllPopups() {
    setIsEditPopupOpen(false);
    setIsAddPopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({
      name: '',
      link: '',
    })
  }

  function handleUpdateUser(e) {
    api.patchUserData(e)
      .then((res) => {
        // console.log(res);
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(e) {
    api.patchAvatar(e)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(e) {
    api.postNewCard({
      name: e.place,
      link: e.link
    })
      .then((res) => {
        console.log(res)
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleRegistration(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsSuccess(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
      })
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then(() => {
        setIsLoggedIn(true);
        navigate('/', { replace: true });
        setEmail(email);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSignOut}
        />

        <Routes>
          <Route exact path="/" element={<ProtectedRoute
            isLoggedIn={isLoggedIn}
            element={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onDeleteClick={handleDeleteClick}
            onCardLike={handleCardLike} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register onRegistration={handleRegistration} />} />

        </Routes>

        <Footer />
        <EditPopup
          isOpen={isEditPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPopup
          isOpen={isAddPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <AvatarPopup
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isSuccess}
        />
        <PopupWithForm title="Вы уверены?" name="confirm" buttonText="Сохранить" />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;