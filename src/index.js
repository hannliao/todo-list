import "./style.css"
import Task from "./tasks.js"
import { Profile, Project } from "./projects.js"
import { renderSidebar, renderMain } from "./dom.js"

const getLocalToday = () => {
    const localDateTime = new Date();
    const localDate = localDateTime.toISOString().split("T")[0];
    return localDate;
}

// set minimum due date to today's local date
const localToday = getLocalToday();
document.getElementById("dueDate").setAttribute("min", localToday);

const profile = new Profile();

// add some projects and tasks manually
const personal = new Project("personal", "#328c91");
const groceries = new Project("groceries", "#568e40");
const travel = new Project("travel", "#3b92d5");

profile.addProject(personal);
profile.addProject(groceries);
profile.addProject(travel);

const personalTask1 = new Task("shop for socks", "need new running socks (feetures elite ultra light size M", "2024-06-01", "medium", personal);
const groceriesTask1 = new Task("finish milk in fridge", "before it expires", "2024-05-09", "high", groceries);
const groceriesTask2 = new Task("prep strawberries", "wash thoroughly, brunoise, and add honey so that they can be added to matcha lattes", "2024-05-13", "medium", groceries);
const groceriesTask3 = new Task("buy manchego and prosciutto", "trader joe's", "2024-05-13", "low", groceries);
const travelTask1 = new Task("book hotel for LA", "look up nearby cafes", "2024-06-04", "high", travel);
const travelTask2 = new Task("make packing list", "remember lots of sunscreen!", "2024-06-17", "low", travel);

personal.addTask(personalTask1);
groceries.addTask(groceriesTask1);
groceries.addTask(groceriesTask2);
groceries.addTask(groceriesTask3);
travel.addTask(travelTask1);
travel.addTask(travelTask2);

// render initial page load
renderSidebar();
renderMain("personal");

export { profile, localToday };