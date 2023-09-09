import React,{useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

export default function Pokemon(){
    const {id} = useParams()
    const Navigate = useNavigate()
    const [pokemon,setPokemon] = useState([])
    

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            const data = response.data
            console.log(data)
            setPokemon(data)
        }
        fetchData()
    },[])

    return(
        <div className="Main2">
            
            {id}
            <button onClick={() => Navigate("/")}>Voltar</button>
        </div>
    )
}