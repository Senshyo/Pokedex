import React,{useState,useEffect} from "react";
import axios from "axios"
import "./Pokedex.css"

export default function Pokedex(){
    const [pokemons,setPokemons] = useState([])
    const [filter,setFilter] = useState("")
    const Capitalize = (str) => str.at(0).toUpperCase() + str.slice(1)
    const [Favorites,setFavorites] = useState([])

    useEffect(() => {
        async function fetchData(){
            var endpoints = Array.from({length : 151} , (_,i) => `https://pokeapi.co/api/v2/pokemon/${i + 1}/`)
            const data = await axios.all(endpoints.map((end) => axios.get(end)))
            setPokemons(data.map((dat) => dat.data))
        }
        fetchData()
    },[])

    const toggleFavorite = (e,id) => {
        e.stopPropagation()
        const foundPoke = pokemons.find((poke) => poke.id === id)
        if(foundPoke){
            if(Favorites.some((poke) => poke.id === id)){
                setFavorites(Favorites.filter((poke) => poke.id !== id))
            }
            else{
                setFavorites([...Favorites,foundPoke])
            }
        }
    }

    const pokeCard = ({name,types,id,sprites}) => {
        const isFavorite = Favorites.some((poke) => poke.id === id)
        return (
            <div className="pokeDiv" key={id}>
                <div className="Upper">
                    <span className="Ball"></span>
                    <span className="Id">#{id.toString().padStart(3,"0")}</span>
                </div>
                <span className={isFavorite ? "Favorite Active" : "Favorite"} onClick={(e) => toggleFavorite(e,id)}>{isFavorite ? "❤️" : "🤍"}</span>
                <h2>{Capitalize(name)}</h2>
                <div className="imgContainer">
                    <img src={sprites.versions["generation-v"]["black-white"].animated.front_default} alt={name} />
                </div>
                <div className="Types">
                    {types.map(({type}) => <span className="Type" key={type.name}>{Capitalize(type.name)}</span>)}
                </div>
            </div>
        )
    }

    const pokefilter = filter.length > 0 ? pokemons.filter((poke) => poke.name.toUpperCase().includes(filter.toUpperCase())) : ""

    const pokeDiv = () => {
        return pokemons.map((poke) => pokeCard(poke))
    }

    return(
        <div className="Main">
            <div className="Content">
                <div className="Nav">
                    <label htmlFor="pesqPoke">Pesquisar: </label>
                    <input type="text" placeholder="Nome ou ID" value={filter} onChange={(e) => setFilter(e.target.value)}/>
                </div>
                <div className="App">
                    {pokeDiv()}
                </div>
            </div>
            <div className="Pagination">

            </div>
        </div>
    )
}