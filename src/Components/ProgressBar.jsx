import React from "react";
import "./ProgressBar.css"

export default function ProgressBar(base_stat,stat){
    const Capitalize = (str) => str.at(0).toUpperCase() + str.slice(1)
    const progressWidth = `${(base_stat / 255) * 100}%`;
    return(
        <div className="progressBar">
            <h3>{Capitalize(stat) + ": "}</h3>
            <div className="fill" style={{ "--progressWidth": progressWidth }} >{base_stat}</div>
        </div>
    )
}