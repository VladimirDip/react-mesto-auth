import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import ImagePopup from "./popups/ImagePopup";
import AddPlacePopup from "./popups/AddPlacePopup";

import EditAvatarPopup from "./popups/EditAvatarPopup";
import EditProfilePopup from "./popups/EditProfilePopup";
import PopupDeleteImage from "./popups/PopupDeleteImage";
import NavBar from "./header/NavBar";
import Login from "./auth/Login";
import InfoToolTip from "./popups/InfooTooltip";
import success from "../images/success.svg";
import error from "../images/error.svg";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";
import Register from "./auth/Register";

import * as Auth from "../Auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { auth } from "../Auth";

function App() {
  // console.log("Render main page");

  const reformattingCard = (card) => {
    return {
      src: card.link,
      name: card.name,
      likes: card.likes,
      _id: card._id,
      owner: card.owner,
    };
  };

  const reformattingUser = (user) => {
    return {
      name: user.name,
      description: user.about,
      avatar: user.avatar,
      _id: user._id,
      cohort: user.cohort,
    };
  };

  const navigate = useNavigate();

  /*States*/
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    src: "",
    id: "",
  });
  const [isPicturePopupOpen, setIsPicturePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(false);
  const [info, setInfo] = useState({
    image: "",
    text: "",
  });
  const [showToolTip, setShowToolTip] = useState(false);
  const [checkToken, setCheckToken] = useState(false);

  const chooseInfoTooltip = (info) => {
    setInfo({ image: info.image, text: info.text });
  };
  const [currentUser, setCurrentUser] = useState({});

  /*End States*/

  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  };
  const onAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  };
  const onDeletePopup = (card) => {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  };
  const onPicturePopup = () => {
    setIsPicturePopupOpen(true);
  };
  const handleCardClick = (card) => {
    // console.log(card);
    setSelectedCard(card);
    onPicturePopup();
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPicturePopupOpen(false);
    setSelectedCard({ name: "", src: "", id: "" });
    setIsDeletePopupOpen(false);
    setShowToolTip(false);
  };

  function handleCardDelete(card) {
    setIsLoadingButton(true);
    setIsDisable(false);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((i) => i._id !== card._id));
        closeAllPopups();
        setIsLoadingButton(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoadingButton(false);
        setIsDisable(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    //console.log(data)
    setIsLoadingButton(true);
    setIsDisable(true);
    api
      .addNewCard(newCard.name, newCard.link)
      .then((newCard) => {
        setCards([reformattingCard(newCard), ...cards]);
        closeAllPopups();
        setIsLoadingButton(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoadingButton(false);
        setIsDisable(false);
      });
  }

  function handleUpdateUser(dataUser) {
    setIsLoadingButton(true);
    setIsDisable(true);
    api
      .setUserData(dataUser)
      .then((res) => {
        //тут
        const reformatRes = reformattingUser(res);
        setCurrentUser(reformatRes);
        closeAllPopups();
        setIsLoadingButton(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoadingButton(false);
        setIsDisable(false);
      });
  }

  function handleUpdateAvatar(dataAvatar) {
    setIsLoadingButton(true);
    setIsDisable(true);
    api
      .setUserAvatar(dataAvatar)
      .then((res) => {
        const reformatRes = reformattingUser(res);
        setCurrentUser(reformatRes);
        closeAllPopups();
        setIsLoadingButton(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoadingButton(false);
        setIsDisable(false);
      });
  }

  function registration({ email, password }) {
    setIsDisable(true);
    auth
      .register(email, password)
      .then((response) => {
        setShowToolTip(true);
        chooseInfoTooltip({
          image: success,
          text: "Вы успешно зарегистрировались",
        });
        navigate("/sign-in");
        setEmail(email);
        setIsDisable(false);
      })
      .catch((err) => {
        setShowToolTip(true);
        chooseInfoTooltip({
          image: error,
          text: "Что-то пошло не так! Попробуйте еще раз!",
        });
        console.log(err);
      })
      .finally(() => {
        setIsDisable(false);
      });
  }

  function authorization({ email, password }) {
    setIsDisable(true);
    auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);

        setLoggedIn(true);
        navigate("/");
        setIsDisable(false);
        console.log(data);
        localStorage.setItem("jwt", data.token);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsDisable(false);
        setLoggedIn(false);
        setShowToolTip(true);

        chooseInfoTooltip({
          image: error,
          text: "Что-то пошло не так! Попробуйте еще раз!",
        });
      })
      .finally(() => {
        setIsDisable(false);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setCheckToken(true);
      auth
        .tokenCheck(jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate("/");
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [navigate]);

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-up");
    setLoggedIn(false);
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          const { name: name, about: description, ...rest } = userData;
          const card = cardsData.map((item) => {
            return {
              src: item.link,
              name: item.name,
              likes: item.likes,
              _id: item._id,
              owner: item.owner,
            };
          });

          setCards(card);
          setCurrentUser({ name, description, ...rest });
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header>
          <NavBar loggedIn={loggedIn} email={email} signOut={signOut} />
        </Header>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register registration={registration} isDisabled={isDisable} />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login authorization={authorization} isDisabled={isDisable} />
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn} checkToken={checkToken}>
                <Main
                  handleAddPlaceClick={onAddPlace}
                  handleEditAvatarClick={onEditAvatar}
                  handleEditProfileClick={onEditProfile}
                  handleDeleteImage={onDeletePopup}
                  onCardClick={handleCardClick}
                  cardsData={cards}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  buttonText={isLoadingButton ? "Сохранение..." : "Сохранить"}
                  disable={isDisable}
                />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  buttonText={isLoadingButton ? "Сохранение..." : "Сохранить"}
                  disable={isDisable}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                  buttonText={isLoadingButton ? "Сохранение..." : "Сохранить"}
                  disable={isDisable}
                />

                <ImagePopup
                  card={selectedCard}
                  isOpen={isPicturePopupOpen}
                  onClose={closeAllPopups}
                />

                <PopupDeleteImage
                  isOpen={isDeletePopupOpen}
                  onClose={closeAllPopups}
                  buttonText={isLoadingButton ? "Удаление..." : "Да"}
                  deleteImage={handleCardDelete}
                  card={selectedCard}
                  disable={isDisable}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
        <InfoToolTip
          isOpen={showToolTip}
          onClose={closeAllPopups}
          info={info}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
