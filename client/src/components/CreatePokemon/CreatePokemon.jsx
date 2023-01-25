import style from "./CreatePokemon.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { filterByType, postPokemon, getallPokemon } from "../../redux/action";
import { useHistory, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.typePokemons);
  const allpokemons = useSelector((state) => state.allpokemons);
  const history = useHistory();

  const [createPokemon, setCreatePokemon] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });
  const [errors, setErrors] = useState({});

  let noEmpty = /\S+/;
  let validateName = /^[a-z]+$/i;

  const validate = (input) => {
    let errors = {};
    if (!input.name.length) {
      errors.name = "The name is required";
    }
    if (!noEmpty.test(input.name) || !validateName.test(input.name)) {
      errors.name = "only letters are accepted";
    }
    if (!input.image.length) {
      errors.image = "The image url is required";
    }
    if (input.hp < 0) {
      errors.hp = "The standard of living cannot be less than a negative number";
    }

    if (input.hp > 100) {
      errors.hp = "The standard of living cannot be higher than 100";
    }
    if (input.attack < 0) {
      errors.attack = "Attack level cannot be a negative number.";
    }
    if (input.attack > 100) {
      errors.attack = "El nivel de ataque no puede ser mayor a 100";
    }
    if (input.defense < 0) {
      errors.defense = "Attack level cannot be higher than 100";
    }
    if (input.defense > 100) {
      errors.defense = "Defense level cannot be higher than 100";
    }
    if (input.speed < 0) {
      errors.speed = "Speed level cannot be a negative number";
    }
    if (input.speed > 100) {
      errors.speed = "The speed level cannot be higher than 100";
    }
    if (input.height < 0) {
      errors.height = "Height cannot be a negative number";
    }
    if (input.height > 100) {
      errors.height = "Height cannot be greater than 100";
    }
    if (input.weight < 0) {
      errors.weight = "Weight cannot be a negative number";
    }
    if (input.weight > 100) {
      errors.weight = "Weight cannot be greater than 100";
    }

    if (!input.types.length) {
      errors.types = "type is required";
    }

    return errors;
  };

  useEffect(() => {
    dispatch(filterByType());
    dispatch(getallPokemon());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const same = allpokemons.filter((same) => same.name === createPokemon.name);

    if (same.length !== 0) {
      alert("El pokemon ya existe");
    } else {
      let error = Object.keys(validate(createPokemon));
      if (
        error.length !== 0 ||
        !createPokemon.name.length ||
        !createPokemon.image.length ||
        !createPokemon.types.length ||
        createPokemon.hp === 0 ||
        createPokemon.attack === 0 ||
        createPokemon.defense === 0 ||
        createPokemon.speed === 0 ||
        createPokemon.height === 0 ||
        createPokemon.weight === 0
      ) {
        alert("llene los campos correctamente");
      } else {
        dispatch(postPokemon(createPokemon));
        setCreatePokemon({
          name: "",
          image: "",
          hp: 0,
          attack: 0,
          defense: 0,
          speed: 0,
          height: 0,
          weight: 0,
          types: [],
        });
        alert("Pokemon creado correctamente");
        history.push("/home");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCreatePokemon((prev) => ({ ...prev, [e.target.name]: e.target.value })); // esta es la clave yel codigo mas importante para hacer el post
    setErrors(
      validate({
        ...createPokemon,
        [e.target.name]: [e.target.value],
      })
    );
  };

  const handleType = (e) => {
    e.preventDefault();
    setCreatePokemon({
      ...createPokemon,
      types: [...createPokemon.types, e.target.value],
    });
  };

  const handleDelete = (e) => {
    setCreatePokemon({
      ...createPokemon,
      types: createPokemon.types.filter((type) => type !== e),
    });
  };

  return (
    <div>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.boxCreate}>
          <Link to="/home">
            <button className={style.home}>
              <AiFillHome />
            </button>
          </Link>
          <div className={style.title}>
            <h1>
              <strong>Create Pokemon!</strong>
            </h1>
            <div className={style.botones}>
              <button className={style.btnCreate} type="submit">
                Create
              </button>
              <Link to="/home">
                <button className={style.btnCancel} type="submit">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
          <div className={style.orderInput}>
            <div className={style.styleInput}>
              <strong>Name: </strong>
              <input
                autoComplete="off"
                type="text"
                name="name"
                onChange={handleChange}
                value={createPokemon.name}
              />
              <strong className={style.error}>{errors.name}</strong>
            </div>
            <div className={style.styleInput}>
              <strong>Image: </strong>
              <input
                type="text"
                name="image"
                onChange={handleChange}
                value={createPokemon.image}
              />
              <strong className={style.error}>{errors.image}</strong>
            </div>
            <div className={style.styleInput}>
              <strong>Type:</strong>
              <select onChange={handleType}>
                <option value="all">Types..</option>
                {types &&
                  types.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
              </select>
              <strong className={style.error}>{errors.types}</strong>
              {createPokemon.types.map((p) => (
                <div>
                  <div>{p}</div>
                  <button onClick={() => handleDelete(p)} key={p} value={p}>
                    <span>X</span>
                  </button>
                </div>
              ))}
              <div className={style.styleInput}>
                <strong>Hp:</strong>
                <input
                  type="number"
                  name="hp"
                  onChange={handleChange}
                  value={createPokemon.hp}
                />
                <strong className={style.error}>{errors.hp}</strong>
              </div>
              <div className={style.styleInput}>
                <strong>Attack:</strong>
                <input
                  type="number"
                  name="attack"
                  onChange={handleChange}
                  value={createPokemon.attack}
                />
                <strong className={style.error}>{errors.attack}</strong>
              </div>
              <div className={style.styleInput}>
                <strong>Defense:</strong>
                <input
                  type="number"
                  name="defense"
                  onChange={handleChange}
                  value={createPokemon.defense}
                />
                <strong className={style.error}>{errors.defense}</strong>
              </div>
              <div className={style.styleInput}>
                <strong>Speed:</strong>
                <input
                  type="number"
                  name="speed"
                  onChange={(e) => handleChange(e)}
                  value={createPokemon.speed}
                />
                <strong className={style.error}>{errors.speed}</strong>
              </div>
              <div className={style.styleInput}>
                <strong>Height:</strong>
                <input
                  type="number"
                  name="height"
                  onChange={(e) => handleChange(e)}
                  value={createPokemon.height}
                />
                <strong className={style.error}>{errors.height}</strong>
              </div>
              <div className={style.styleInput}>
                <strong>Weight:</strong>
                <input
                  type="number"
                  name="weight"
                  onChange={handleChange}
                  value={createPokemon.weight}
                />
                <strong className={style.error}>
                  <p>{errors.weight}</p>
                </strong>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePokemon;
