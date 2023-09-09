import React,{useState,useEffect} from "react";
import axios from "axios"
import "./Pokedex.css"

import logoImg from "../Images/pokeapi_256.png"
import { useNavigate } from "react-router-dom"
import pokeCard from "../Components/pokeCard";

export default function Pokedex(){
    const [pokemons,setPokemons] = useState([])
    const [filter,setFilter] = useState("")
    const Capitalize = (str) => str.at(0).toUpperCase() + str.slice(1)
    const [Favorites,setFavorites] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const pokePerPage = 10
    const [isModal,setModal] = useState(false)
    const [selectPoke,setSelectPoke] = useState(null)
    const Navigate = useNavigate()

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

    

    const setPage = (page) =>{
        setCurrentPage(page)
    }

    const pokefilter = filter.length > 0 ?
    isNaN(filter) ? 
    pokemons.filter((poke) => poke.name.toUpperCase().includes(filter.toUpperCase())) 
    : 
    pokemons.filter((poke) => poke.id.toString().includes(filter))
    :
    ""

    const pokeDiv = () => {
        const lastIndexPoke = currentPage * pokePerPage
        const firstIndexPoke = lastIndexPoke - pokePerPage
        const currentPoke = pokefilter.length > 0 ? pokefilter.slice(firstIndexPoke,lastIndexPoke) : pokemons.slice(firstIndexPoke,lastIndexPoke)
        return currentPoke.map((poke) => pokeCard(poke,Favorites,Modal,toggleFavorite))
    }

    const Modal = (id) => {
        setSelectPoke(pokemons.find((poke) => poke.id === id))
        setModal(true)
    }

    return(
        <div className="Main">
            <div className="Content">
                <div className="Nav">
                    <div>
                        <img src={logoImg} alt="pokeApi" className="logoImg"/>
                    </div>
                    <label htmlFor="pesqPoke">Pesquisar: </label>
                    <input type="text" placeholder="Nome ou ID" value={filter} onChange={(e) => {setFilter(e.target.value) ; setCurrentPage(1)}}/>
                </div>
                {
                    isModal && (
                        <div className="Modal">
                            <div className="Modal-Content">
                                {pokeCard(selectPoke,Favorites,Modal,toggleFavorite)}
                                <button onClick={() => Navigate(`/Pokemon/${selectPoke.id}`)}>Exibir Info.</button>
                                <button onClick={() => setModal(false)}>Fechar</button>
                                
                            </div>
                        </div>
                    )
                }
                <div className="App">
                    {pokeDiv()}
                    {console.log(pokemons)}
                </div>
            </div>
            {
                Favorites.length > 0 ? 
                (
                <div className="Favoritos">
                    <h2 className="FavName">Favoritos</h2>
                    {Favorites.map((fav) =>  <div className="Fav" key={fav.id} onClick={() => Modal(fav.id)}>
                    <div className="C">
                    <img src={fav.sprites.versions["generation-v"]["black-white"].animated.front_default}  alt={fav.name} />
                    <h3>{Capitalize(fav.name)}</h3>
                    </div>
                    <button onClick={(e) => toggleFavorite(e,fav.id)}>Remover</button>
                    </div>)}
                </div>
                )
                :
                ""
            }
            <div className="Pagination">
                {Array.from({length: Math.ceil(pokefilter.length > 0 ? pokefilter.length / pokePerPage : pokemons.length / pokePerPage)} ,(_ ,i) => <button className={currentPage === i + 1 ? "Pages ActivePage" : "Pages"} onClick={() => setPage(i + 1)} key={i + 1}>{i + 1}</button>)}
            </div>
        </div>
    )
}