import { getPokemonName } from "../../redux/action";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./Search.module.css";
import { BiSearchAlt } from "react-icons/bi";

const Search = () => {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.value === e) {
      alert("no se encontro");
    } else {
      dispatch(getPokemonName(pokemon));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPokemon(e.target.value);
  };

  return (
    <div className={style.searchContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={pokemon}
          className={style.input}
          autoComplete="off"
          placeholder="Search pokemon..."
          name="name"
        />
        <div className={style.btnContainer}>
          <button className={style.btn} type="submit">
            <BiSearchAlt />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
