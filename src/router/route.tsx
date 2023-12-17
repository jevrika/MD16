import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutProject from "../pages/AboutProject/AboutProject";
import AllMovies from "../pages/AllMovies/AllMovies";
import AboutAuthor from "../pages/AboutAuthor/AboutAuthor";
import NotFound from "../pages/NotFound/NotFound";
import NavBar from "../Components/Navbar/Navbar";
import MovieCard from "../Components/MovieCard/MovieCard";

const RouterProvider = () => {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/about_project' element={<AboutProject />} />
        <Route path='/movies' element={<AllMovies />} />
        <Route path='/movies/:id' element={<MovieCard />} />
        <Route path='/about_author' element={<AboutAuthor />} />
        <Route path='*' element={<NotFound />} />
        {/* <Route path='/movies/:id' element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default RouterProvider;