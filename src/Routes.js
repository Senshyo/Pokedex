import React from "react";
import {Routes,Route} from "react-router-dom"

import Pokedex from "./Pages/Pokedex"

export default function Rotas(){
    return(
        <Routes>
            <Route path="/" element={<Pokedex></Pokedex>}></Route>
        </Routes>
    )
}