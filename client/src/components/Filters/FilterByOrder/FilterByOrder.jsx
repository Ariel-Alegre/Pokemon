import { useDispatch } from "react-redux";
import { orderBy } from "../../../redux/action";
import style from "./FilterByOrder.module.css";

const FilterByOrder = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const hendleChange = (e) => {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
  };
  return (
    <div className={style.selectContainer}>
      <select className={style.select} onChange={hendleChange}>
        <option value="all">Order by..</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
        <option value="asc-attack">ATTACK MIN</option>
        <option value="desc-attack">ATTACK MAX</option>
      </select>
    </div>
  );
};

export default FilterByOrder;
