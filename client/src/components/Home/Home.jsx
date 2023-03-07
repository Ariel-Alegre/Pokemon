import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getallPokemon } from "../../redux/action";
import PokemonCards from "../PokemonCards/PokemonCards.";
import Search from "../Search/Search";
import style from "./Home.module.css";
import FilterByOrder from "../Filters/FilterByOrder/FilterByOrder";
import FilterByType from "../Filters/FilterByType/FilterByType";
import FilterByApi from "../Filters/FiltersByApi/FiltersByApi";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Home = () => {
  const dispatch = useDispatch();
  const allpokemon = useSelector((state) => state.allpokemons);
  const [show, setShow] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerpage = 12;
  const indexLastPokemon = pokemonPerpage * currentPage;
  const indexFirstPokemon = indexLastPokemon - pokemonPerpage;
  const pokemons = allpokemon.slice(indexFirstPokemon, indexLastPokemon);

  const pagination = (paginado) => {
    setCurrentPage(paginado);
  };

  useEffect(() => {
    dispatch(getallPokemon());
  }, [dispatch]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setShow((show) => !show);

    if (loading) {
      setTimeout(() => {
        setLoading(false);
      });
    }
  }, [loading]);

  return (
    <div className={style.appContainer}>
      <Link to="/">
        <button className={style.btnExit}>
          <MdExitToApp />
        </button>
      </Link>
      <div className={style.search}>
        <Search setCurrentPage={setCurrentPage} />
      </div>
      <div className={style.orderFilters}>
        <FilterByOrder setCurrentPage={setCurrentPage} />
        <FilterByType setCurrentPage={setCurrentPage} />
        <FilterByApi setCurrentPage={setCurrentPage} />
      </div>
      <div className={style.btnCreate}>
        <Link to="/create">
          <button className={style.btn}>Create Pokemon</button>
        </Link>
      </div>
      <ul className={style.orderList}>
        {pokemons === 0 && !show ? (
          <div></div>
        ) : pokemons.length > 0 ? (
          pokemons?.map((pokemon) => (
            <PokemonCards
              key={pokemon.id}
              pokemon={pokemon}
              setCurrentPage={setCurrentPage}
            />
          ))
        ) : (
          <h1 className={style.orderLoading}>
            <AiOutlineLoading3Quarters
              setLoading={setLoading}
              className={style.loading}
            />
          </h1>
        )}
      </ul>
      <Pagination
        allpokemon={allpokemon.length}
        pokemonPerpage={pokemonPerpage}
        pagination={pagination}
      />
    </div>
  );
};

export default Home;
