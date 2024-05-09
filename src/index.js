import "./style.css"
import Task from "./tasks.js"
import { Profile, Project } from "./projects.js"
import * as dom from "./dom.js"


const hannah = new Profile();

// add some projects and tasks manually
const personal = new Project("personal", "rgb(50, 140, 145)");
const groceries = new Project("groceries", "rgb(86, 142, 64)");
const travel = new Project("travel", "rgb(59, 146, 213)");

hannah.addProject(personal);
hannah.addProject(groceries);
hannah.addProject(travel);

const personalTask1 = new Task("shop for socks", "need new running socks (feetures elite ultra light size M", "06-01-24", 3);
const groceriesTask1 = new Task("buy strawberries", "king soopers", "05-01-24", 2);
const groceriesTask2 = new Task("buy cheddar cheese", "shredded", "05-02-24", 2);
const groceriesTask3 = new Task("finish milk in fridge", "before it expires", "05-04-24", 1);
const travelTask1 = new Task("book hotel for LA", "check if friend booked, which hotel, address", "05-12-24", 1);
const travelTask2 = new Task("make packing list", "remember lots of sunscreen", "06-17-24", 3);

personal.addTask(personalTask1);
groceries.addTask(groceriesTask1);
groceries.addTask(groceriesTask2);
groceries.addTask(groceriesTask3);
travel.addTask(travelTask1);
travel.addTask(travelTask2);

dom.renderSidebar();
dom.renderMain("personal");

export { hannah };