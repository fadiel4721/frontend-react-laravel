import { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function PostIndexPokemon() {
  const [pokemons, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/pokemons");
      setPosts(response.data.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await api.delete(`/api/pokemons/${id}`);
      fetchDataPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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
        {loading ? (
          <div className="col-12 text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : pokemons.length > 0 ? (
          pokemons.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              deletePost={deletePost}
            />
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
      <div
        className="card border-0 rounded shadow"
        style={{ minHeight: "450px", height: isExpanded ? "auto" : "450px" }}
      >
        <img
          className="card-img-top"
          src={pokemon.image}
          alt={pokemon.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
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
          <div>
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
    </div>
  );
}
