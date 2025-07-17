import { createContext } from "react";
import { initialMoviesContext } from "./initialMoviesContext.js";

export const MoviesContext = createContext(initialMoviesContext);
