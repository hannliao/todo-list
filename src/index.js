import "./style.css"
import Task from "./tasks.js"
import { Profile, Project } from "./projects.js"
import * as dom from "./dom.js"

const getLocalToday = () => {
    const localDateTime = new Date();
    const localDate = localDateTime.toISOString().split("T")[0];
    return localDate;
}

const hannah = new Profile();

// add some projects and tasks manually
const personal = new Project("personal", "#328c91");
const groceries = new Project("groceries", "#568e40");
const travel = new Project("travel", "#3b92d5");

hannah.addProject(personal);
hannah.addProject(groceries);
hannah.addProject(travel);

const personalTask1 = new Task("shop for socks", "need new running socks (feetures elite ultra light size M", "2024-06-01", "medium");
const groceriesTask1 = new Task("finish milk in fridge", "before it expires", "2024-05-09", "high");
const groceriesTask2 = new Task("prep strawberries", "wash thoroughly, brunoise, and add honey so that they can be added to matcha lattes", "2024-05-13", "medium");
const groceriesTask3 = new Task("buy manchego and prosciutto", "trader joe's", "2024-05-13", "low");
const travelTask1 = new Task("book hotel for LA", "look up nearby cafes", "2024-06-04", "high");
const travelTask2 = new Task("make packing list", "remember lots of sunscreen!", "2024-06-17", "low");

personal.addTask(personalTask1);
groceries.addTask(groceriesTask1);
groceries.addTask(groceriesTask2);
groceries.addTask(groceriesTask3);
travel.addTask(travelTask1);
travel.addTask(travelTask2);

dom.renderSidebar();
dom.renderMain("personal");

// set minimum due date to today's local date
const localToday = getLocalToday();
document.getElementById("dueDate").setAttribute("min", localToday);

export { hannah, localToday };