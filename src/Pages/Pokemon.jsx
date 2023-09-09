import React,{useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import Colors from "../Components/Colors";
import ProgressBar from "../Components/ProgressBar";
import "./Pokemon.css"

export default function Pokemon(){
    const {id} = useParams()
    const Navigate = useNavigate()
    const [pokemon,setPokemon] = useState([])
    const Capitalize = (str) => str.at(0).toUpperCase() + str.slice(1)
    

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            setPokemon(response)
        }
        fetchData()
    },[])

    const pokeInter = ({data}) => {
        if (!data) return null; // Verifica se data existe
        const { name, id, types, sprites, stats } = data;
        return(
        <div className="Container">
            <div className="Left">

                <div className="pokeDiv leftone" key={id}>
                <div className="Upper">
                    <span className="Ball" style={{backgroundColor: Colors(types[0].type.name)}}></span>
                    <span className="Id">#{id.toString().padStart(3,"0")}</span>
                </div>
                <h2>{Capitalize(name)}</h2>
                <div className="imgContainer">
                    <img src={sprites.versions["generation-v"]["black-white"].animated.front_default} alt={name} />
                </div>
                <div className="Types">
                    {types.map(({type}) => <span className="Type" style={{backgroundColor: Colors(type.name)}} key={type.name}>{Capitalize(type.name)}</span>)}
                </div>
                </div>
            </div>

            <div className="Right">
                <div className="Stats">
                    {stats.map((stat) => ProgressBar(stat.base_stat,stat.stat.name))}
                </div>
            </div>
        </div>)
    }


    return(
        <div className="Main2">
            {pokeInter(pokemon)}
            <button onClick={() => Navigate("/")}>Voltar</button>
        </div>
    )
}