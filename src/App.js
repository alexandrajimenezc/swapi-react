import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getPeople, getCharacter, searchCharacter } from "./API/people";

function App() {
  //1recuperar de la api
  const [people, setPeople] = useState([]);
  //2lanzar error
  const [errorState, setErrorState] = useState({ hasError: false });
  //3 recuperar detalles del personaje(el id)
  const [currentCharacter, setCurrentCharacter] = useState(1);
  //4 recuperar detalles del personaje(el personaje)
  const [detailedCharacter, setDetailedCharacter] = useState({});
  //5 buscar personaje
  const inputSearch = useRef(null);
  const [textSearch, setTextSearch] = useState("")
  //6 paginacion del
  const [page, setPage] = useState(1)



  //1recuperar de la api y 6 paginacion
  useEffect(() => {
    getPeople(page).then((data) => {
      console.log(data);
      setPeople(data).catch(handleError);
    });
  }, [page]);

  //3 recuperar detalles del personaje
  useEffect(() => {
    getCharacter(currentCharacter).then(setDetailedCharacter).catch(handleError)
  }, [currentCharacter]);

  //2manejar error
  const handleError = (err) => {
    setErrorState({ hasError: true, message: err.message });
  };
  //3 recuperar detalles del personaje
  const showDetail = (character) => {

    const id = Number(character.url.split("/").slice(-2)[0]);
    console.log("🚀 ~ file: App.js ~ line 40 ~ showDetail ~ id", id)
    setCurrentCharacter(id);
  };
  //5 buscar personaje
  const onChangeTextSearch = (event) => {
    event.preventDefault();
    const text = inputSearch.current.value
    setTextSearch(text);
  }
  const onSearchSubmit = (event) => {
    if (event.key !== 'Enter') return
    inputSearch.current.value = ''
    setDetailedCharacter({})
    searchCharacter(textSearch).then(setPeople).catch(handleError)
  }

  //6 paginacion 

  const onChangePage = (next) => {

    if (!people.previous && page + next <= 0) return
    if (!people.next && page + next >= 9) return
    setPage(page + next)
  }


  return (
    <div>
      <input
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
        ref={inputSearch}
        type="text"
        placeholder="buscar personaje" />
      <ul>
        {errorState.hasError && <div> {errorState.message} </div>}
        {people?.results?.map((character) => (
          <li onClick={() => showDetail(character)} key={character.name}>
            {character.name}
          </li>
        ))}
      </ul>


      <section>
        <button onClick={() => onChangePage(-1)} >prev</button>| {page} |
        <button onClick={() => onChangePage(1)} > next</button>
      </section>

      {detailedCharacter && (
        <div>
          {detailedCharacter.name}
          <ul>
            <li>height:{detailedCharacter.height}</li>
            <li>mass:{detailedCharacter.mass}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
