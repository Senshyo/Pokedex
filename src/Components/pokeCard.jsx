import Colors from "../Components/Colors"
export default function pokeCard ({name,types,id,sprites},Favorites,Modal,toggleFavorite){
    const isFavorite = Favorites.some((poke) => poke.id === id)
    const Capitalize = (str) => str.at(0).toUpperCase() + str.slice(1)
    return (
        <div className="pokeDiv" key={id} onClick={() => Modal(id)}>
            <div className="Upper">
                <span className="Ball" style={{backgroundColor: Colors(types[0].type.name)}}></span>
                <span className="Id">#{id.toString().padStart(3,"0")}</span>
            </div>
            <span className={isFavorite ? "Favorite Active" : "Favorite"} onClick={(e) => toggleFavorite(e,id)}>{isFavorite ? "❤️" : "🤍"}</span>
            <h2>{Capitalize(name)}</h2>
            <div className="imgContainer">
                <img src={sprites.versions["generation-v"]["black-white"].animated.front_default} alt={name} />
            </div>
            <div className="Types">
                {types.map(({type}) => <span className="Type" style={{backgroundColor: Colors(type.name)}} key={type.name}>{Capitalize(type.name)}</span>)}
            </div>
        </div>
    )
}