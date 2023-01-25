import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByType, orderBytype } from "../../../redux/action";
import style from "./FilterByType.module.css";

const FilterByType = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.typePokemons);

  useEffect(() => {
    dispatch(filterByType());
  }, [dispatch]);

  const handlerChange = (e) => {
    e.preventDefault();
    dispatch(orderBytype(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <select className={style.select} onChange={handlerChange}>
        <option value="all">Order by type</option>
        {types &&
          types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FilterByType;
