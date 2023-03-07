import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    function closePopup(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closeAllPopups();
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closeAllPopups();
        }
        if (evt.key === 'Escape') {
            closeAllPopups();
        }
    };

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
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

    React.useEffect(() => {
        if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard) {
            document.addEventListener('keydown', closePopup);
            document.addEventListener('mousedown', closePopup);
        }
        return () => {
            document.removeEventListener('keydown', closePopup);
            document.removeEventListener('mousedown', closePopup);
        };
    });


    return (
        <div className="page">

            <Header />
            <Main
                isEditProfilePopupOpen={handleEditProfileClick}
                isAddPlacePopupOpen={handleAddPlaceClick}
                isEditAvatarPopupOpen={handleEditAvatarClick}
                onCardClick={handleCardClick}
            />
            <Footer />

            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                name="popup-edit"
                title="Редактировать профиль"
                onClose={closeAllPopups}
            >
                <input className="form__input form__input_item_name" id="name-input" type="text" name="name" placeholder="Имя"
                    minLength="2" maxLength="40" required />
                <span className="form__input-error name-input-error"></span>

                <input className="form__input form__input_item_job" id="job-input" type="text" name="about" placeholder="О себе"
                    minLength="2" maxLength="200" required />
                <span className="form__input-error job-input-error"></span>
                <button className="form__save-button" type="submit" id="submit">Сохранить</button>

            </PopupWithForm>


            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                name="form-avatar"
                title="Обновить аватар"
                onClose={closeAllPopups}
            >
                <input className="form__input form__input_link_avatar" id="avatar" type="url" name="avatar"
                    placeholder="Ссылка на картинку" required />
                <span className="form__input-error avatar-error"></span>
                <button className="form__save-button" type="submit">Сохранить</button>
            </PopupWithForm>



            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                name="popup-edit-place"
                title="Новое место"
                onClose={closeAllPopups}
            >
                <input className="form__input form__input_item_place" id="place-input" type="text" name="place"
                    placeholder="Название" minLength="2" maxLength="40" required />
                <span className="form__input-error place-input-error"></span>
                <input className="form__input form__input_item_link" id="link-input" type="url" name="link"
                    placeholder="Ссылка на картинку" required />
                <span className="form__input-error link-input-error"></span>
                <button className="form__save-button" type="submit">Создать</button>
            </PopupWithForm>



            <ImagePopup
                name="popup_image"
                card={selectedCard}
                onClose={closeAllPopups}
            />

        </div>

    );
}

export default App;