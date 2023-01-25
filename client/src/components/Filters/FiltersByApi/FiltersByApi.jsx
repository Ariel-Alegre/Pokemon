import style from "./FIltersByApi.module.css";
import { useDispatch } from "react-redux";
import { filterByorigen, getallPokemon } from "../../../redux/action";

const FilterByApi = () => {
  const dispatch = useDispatch();

  const handelChange = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getallPokemon());
    } else {
      dispatch(filterByorigen(e.target.value));
    }
  };

  return (
    <div>
      <select
        className={style.select}
        onChange={(e) => {
          handelChange(e);
        }}
      >
        <option value="all">Filter by origen</option>
        <option value="api">Api</option>
        <option value="created">Created</option>
      </select>
    </div>
  );
};

export default FilterByApi;
