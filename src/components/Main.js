import React from 'react';
import { api } from '../utils/constants';
import Card from './Card';
import {useEffect, useState} from 'react';

function Main(props) {
    const [userAvatar, setUserAvatar] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [caption, setDescription] = useState('');
    const [cards, setCards] = useState([]);
    
    useEffect(() => {
        Promise.all([api.getUserInfoApi(), api.getInitialCards()])
            .then(([user, cardData]) => {
                setUserAvatar(user.avatar);
                setUserInfo(user.name);
                setDescription(user.about);
                setCards(cardData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__edit-info">
                    <div className="profile__avatar-container">
                        <div className="profile__overlay">
                            <img className="profile__avatar" src={userAvatar} alt="Аватар" />
                            <button className="profile__avatar-edit-button" type="button" onClick={props.editAvatar}></button>
                        </div>
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__info-edit">
                        <h1 className="profile__title">{userInfo}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.editProfile}></button>
                    </div>
                    <p className="profile__subtitle">{caption}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.addPlace}></button>
            </section>
            <div className="cards">
                <ul className="cards__item">
                    {cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} />
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default Main;