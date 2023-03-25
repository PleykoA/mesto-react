import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import React, { useEffect, useState } from 'react';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [cardToDelete, setCardToDelete] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

    useEffect(() => {
        Promise.all([api.getUserInfoApi(), api.getInitialCards()])
            .then(([user, cardData]) => {
                setCurrentUser(user);
                setCards(cardData)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function closePopup(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closeAllPopups();
        }
        else if (evt.target.classList.contains('popup__close-button')) {
            closeAllPopups();
        }
        else if (evt.key === 'Escape') {
            closeAllPopups();
        }
    };

    useEffect(() => {
        if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard || isDeletePopupOpen) {
            document.addEventListener('keydown', closePopup);
            document.addEventListener('mousedown', closePopup);
        }
        return () => {
            document.removeEventListener('keydown', closePopup);
            document.removeEventListener('mousedown', closePopup);
        };
    });

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeletePopupOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleCardDelete(card) {
        setCardToDelete(card);
        setIsDeletePopupOpen(!isDeletePopupOpen);
    };

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api
            .editAvatar(data)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api
            .editProfile(data)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddPlaceSubmit(card) {
        setIsLoading(true);
        api
            .addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() =>
                setIsLoading(false));
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        if (!isLiked) {
            api
                .likeCard(card._id)
                .then((card) => {
                    setCards((state) =>
                        state.map((c) =>
                            (c._id === card._id ? card : c))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api
                .removeLikeCard(card._id)
                .then((card) => {
                    setCards((state) =>
                        state.map((c) =>
                            (c._id === card._id ? card : c))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleDeleteClick(card) {
        setIsLoading(true);
        api
            .deleteCard(card._id)
            .then(() => {
                setCards(() =>
                    cards.filter((selectedCard) =>
                        selectedCard._id !== card._id)
                );
            })
            .then(() => closeAllPopups())
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    editProfile={handleEditProfileClick}
                    addPlace={handleAddPlaceClick}
                    editAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                />
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    editAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    addPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />

                <PopupWithConfirmation
                    card={cardToDelete}
                    onClose={closeAllPopups}
                    isOpen={isDeletePopupOpen}
                    isLoading={isLoading}
                    onCardDelete={handleDeleteClick}
                    isValid={true}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;