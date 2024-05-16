import Task from "./tasks.js"
import { projects, Project } from "./projects.js"

function initializeProjects() {
    if (!localStorage.getItem("projects")) {
        // add some allProjects and tasks manually
        const personal = new Project("personal", "#328c91");
        const groceries = new Project("groceries", "#568e40");
        const travel = new Project("travel", "#3b92d5");

        const personalTask1 = new Task("shop for socks", "need new running socks (feetures elite ultra light size M", "medium");
        const groceriesTask1 = new Task("finish milk in fridge", "before it expires", "high", "2024-05-09");
        const groceriesTask2 = new Task("prep strawberries", "wash thoroughly, brunoise, and add honey so that they can be added to matcha lattes", "medium");
        const groceriesTask3 = new Task("buy manchego and prosciutto", "trader joe's", "low");
        const travelTask1 = new Task("book hotel for LA", "look up nearby cafes", "high", "2024-06-04");
        const travelTask2 = new Task("make packing list", "remember lots of sunscreen!", "low");

        personal.addTask(personalTask1);
        groceries.addTask(groceriesTask1);
        groceries.addTask(groceriesTask2);
        groceries.addTask(groceriesTask3);
        travel.addTask(travelTask1);
        travel.addTask(travelTask2);

        this.addProject(personal);
        this.addProject(groceries);
        this.addProject(travel);
    } else {
        // get local storage
        let savedProjects = JSON.parse(localStorage.getItem("projects"));

        projects.allProjects = savedProjects.map(projectData => {
            const project = new Project(projectData.title, projectData.color);
            projectData.tasks.forEach(taskData => {
                const task = new Task(
                    taskData.title,
                    taskData.description,
                    taskData.priority,
                    taskData.dueDate,
                    taskData.completed
                );
                project.addTask(task);
            });
            return project;
        })
    }
}

export default initializeProjects;