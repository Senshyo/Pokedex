import React from "react";

export default function ProgressBar({base_stat,stat}){
    return(
        <div className="progressBar">
            <h3>{stat.name}</h3>
            <div className="fill" style={{width: base_stat}}>{base_stat}</div>
        </div>
    )
}