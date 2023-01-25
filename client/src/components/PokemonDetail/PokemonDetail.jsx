import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetail, cleanDetail } from "../../redux/action";
import style from "./PokemonDetail.module.css";
import { AiFillHome } from "react-icons/ai";

const PokemonDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.pokemonsDetails);

  useEffect(() => {
    dispatch(getPokemonDetail(id));
    dispatch(cleanDetail());
  }, [dispatch, id]);

  return (
    <div>
      <div className={style.detailsContainer}>
        <div className={style.boxDetails}>
          <Link to="/home">
            <button className={style.home}>
              <AiFillHome />
            </button>
          </Link>
          <div>
            <div className={style.nameContainer}>
              <strong className={style.name}>{details.name}</strong>
            </div>
            <img
              src={details.image}
              alt={details.image}
              className={style.img}
            />
          </div>
          <div className={style.detail}>
            <p>Id: {details.id}</p>
            <p>
              Types:{" "}
              {details.types &&
                details.types
                  ?.map((data) => data.name)
                  .toString()
                  .replace(/,/g, " && ")}
            </p>
            <p>Hp: {details.hp}</p>
            <p>Attack: {details.attack}</p>
            <p>Defense: {details.defense}</p>
            <p>Speed: {details.speed}</p>
            <p>Height: {details.height}</p>
            <p>Weight: {details.weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
