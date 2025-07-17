import { createContext } from "react";
import { initialCommentsContext } from "./initialCommentsContext";

export const CommentsContext = createContext(initialCommentsContext);
