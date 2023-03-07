function Card(props) {
  return (
    <div id="card-template">
      <li className="card">
        <img className="card__image" alt={props.card.name} src={props.card.link} onClick={() => props.onCardClick(props.card)} />
        <button className="card__delete" type="button"></button>
        <div className="card__container">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like_container">
            <button className="card__like" type="button" id="like"></button>
            <span className="card__like-count">{props.card.likes.length}</span>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;