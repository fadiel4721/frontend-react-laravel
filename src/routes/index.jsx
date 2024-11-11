import { Routes, Route } from 'react-router-dom'    
 
import Home from '../views/home.jsx'
 
import PostIndex from '../views/posts/index.jsx'
 
import PostCreate from '../views/posts/create.jsx'
 
import PostEdit from '../views/posts/edit.jsx'

import PostIndexPokemon from '../views/pokemons/index.jsx'
 
import PostCreatePokemon from '../views/pokemons/create.jsx'
 
import PostEditPokemon from '../views/pokemons/edit.jsx'
 
function RoutesIndex() {
    return (
        <Routes>
 
            <Route path="/" element={<Home />} />
 
            <Route path="/posts" element={<PostIndex />} />
 
            <Route path="/posts/create" element={<PostCreate />} />
 
            <Route path="/posts/edit/:id" element={<PostEdit />} />

            <Route path="/pokemons" element={<PostIndexPokemon />} />
 
            <Route path="/pokemons/create" element={<PostCreatePokemon />} />
 
            <Route path="/pokemons/edit/:id" element={<PostEditPokemon />} />
           
        </Routes>
    )
}
 
export default RoutesIndex