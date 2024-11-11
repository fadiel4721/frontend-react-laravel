import { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function PostIndexPokemon() {
  const [pokemons, setPosts] = useState([]);

  const fetchDataPosts = async () => {
    await api.get("/api/pokemons").then((response) => {
      setPosts(response.data.data.data);
    });
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  const deletePost = async (id) => {
    await api.delete(`/api/pokemons/${id}`).then(() => {
      fetchDataPosts();
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <Link
        to="/pokemons/create"
        className="btn btn-md btn-success rounded shadow border-0 mb-3"
      >
        ADD NEW POKEMON
      </Link>
      <div className="row">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} deletePost={deletePost} />
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-danger text-center">
              Data Belum Tersedia
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PokemonCard({ pokemon, deletePost }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded shadow" style={{ maxHeight: isExpanded ? "100%" : "450px" }}>
        <img
          className="card-img-top"
          src={pokemon.image}
          alt={pokemon.name}
          style={{
            width: "100%",
            height: "200px", // Set height sesuai kebutuhan
            objectFit: "cover",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{pokemon.name}</h5>
          <p className="card-text">
            <strong>Ability:</strong> {pokemon.ability}
          </p>
          <p className="card-text">
            {isExpanded ? pokemon.desc : `${pokemon.desc.slice(0, 100)}... `}
            <span
              onClick={toggleExpand}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {isExpanded ? "Sembunyikan" : "Lihat Selengkapnya"}
            </span>
          </p>
          <Link
            to={`/pokemons/edit/${pokemon.id}`}
            className="btn btn-primary me-2"
          >
            EDIT
          </Link>
          <button
            onClick={() => deletePost(pokemon.id)}
            className="btn btn-danger"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
