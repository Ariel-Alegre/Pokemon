import style from "./PokemonCards.module.css";
import { Link } from "react-router-dom";

const PokemonCards = ({ pokemon }) => {
  return (
    <div className={style.cardsContainer}>
      <Link to={`/details/${pokemon.id}`}>
        <li>
          <div className={style.imageContainer}>
            <img
              className={style.image}
              src={pokemon.image}
              alt={pokemon.image}
            />
          </div>
          <strong className={style.name}>{pokemon.name.toUpperCase()}</strong>
          <p className={style.type}>
            types:{" "}
            {pokemon.types
              ?.map((info) => info.name)
              .toString()
              .replace(",", " && ")}{" "}
          </p>
        </li>
      </Link>
    </div>
  );
};

export default PokemonCards;
