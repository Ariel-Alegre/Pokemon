import style from "./Pagination.module.css";

const Pagination = ({ pokemonPerpage, allpokemon, pagination }) => {
  const paginado = [];

  for (let i = 1; i < Math.ceil(allpokemon / pokemonPerpage); i++) {
    paginado.push(i);
  }

  return (
    <div className={style.paginationContainer}>
      {paginado &&
        paginado.map((num) => (
          <span key={num}>
            <button className={style.btn} onClick={() => pagination(num)}>
              {num}
            </button>
          </span>
        ))}
    </div>
  );
};

export default Pagination;
