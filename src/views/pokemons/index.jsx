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
            <div className="col-md-4 mb-4" key={index}>
              <div className="card border-0 rounded shadow">
                <img
                  className="card-img-top"
                  src={pokemon.image}
                  alt={pokemon.name}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{pokemon.name}</h5>
                  <p className="card-text">
                    <strong>Ability:</strong> {pokemon.ability}
                  </p>
                  <p className="card-text">{pokemon.desc}</p>
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
