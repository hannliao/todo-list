import "./style.css"
import { renderSidebar, renderMain } from "./dom.js"
import initializeProjects from "./storage.js";

initializeProjects();
renderSidebar();
renderMain("all");