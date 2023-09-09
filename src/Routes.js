import React from "react";
import {Routes,Route} from "react-router-dom"

import Pokedex from "./Pages/Pokedex"
import Pokemon from "./Pages/Pokemon"

export default function Rotas(){
    return(
        <Routes>
            <Route path="/" element={<Pokedex></Pokedex>}></Route>
            <Route path="/Pokemon/:id" element={<Pokemon></Pokemon>}></Route>
        </Routes>
    )
}