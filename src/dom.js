import Task from "./tasks.js"
import { Project, Profile } from "./projects.js"
import { hannah } from "./index.js"

class Modal {
    constructor() {
        this.dialog = document.querySelector("dialog");
        this.header = document.querySelector("#modal-header");
        this.form = document.querySelector("#form");
        this.title = document.querySelector("#title");
        this.color = document.querySelector("#color");
        this.description = document.querySelector("#description");
        this.dueDate = document.querySelector("#dueDate");
        this.priority = document.querySelector("#priority");
        this.cancelButton = document.querySelector("#cancel");
        this.addButton = document.querySelector("#add");
        this.projectSpecificDiv = document.querySelector("#project-specific");
        this.taskSpecificDiv = document.querySelector("#task-specific");

        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    openModal() {
        this.dialog.showModal();
    }

    closeModal() {
        this.form.reset();
        this.dialog.close();
    }

    showProjectForm() {
        this.taskSpecificDiv.style.display = "none";
        this.projectSpecificDiv.style.display = "block";
    }

    showTaskForm() {
        this.taskSpecificDiv.style.display = "block";
        this.projectSpecificDiv.style.display = "none";
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.projectSpecificDiv.style.display === "block") {
            this.addProject();
        } else if (this.taskSpecificDiv.style.display === "block") {
            this.addTask();
        }
    }

    addProject() {
        const title = this.title.value;
        const color = this.color.value;
        if (!title || !color) {
            console.log("can't create empty project");
            return;
        }
        const newProject = new Project(title, color);
        hannah.addProject(newProject);
        renderSidebar();
        this.closeModal();
    }

    addTask() {
        const title = this.title.value;
        const description = this.description.value;
        const dueDate = this.dueDate.value;
        const priority = this.priority.value;
        
        const newTask = new Task(title, description, dueDate, priority);
        const project = hannah.getProject(selectedProject);
        project.addTask(newTask);
        renderMain(selectedProject);
        this.closeModal();
    }
}

const modal = new Modal();
let selectedProject = "personal";


const renderSidebar = () => {
    const sidebar = document.querySelector("#sidebar");
    sidebar.textContent = "";

    const view = document.createElement("h2");
    view.textContent = "view";

    const all = document.createElement("button");
    all.textContent = "all";

    const important = document.createElement("button");
    important.textContent = "important";

    all.addEventListener("click", () => {
        renderMain("all");
    })

    important.addEventListener("click", () => {
        renderMain("important");
    })

    const projectsHeader = document.createElement("h2");
    projectsHeader.textContent = "projects";

    const projects = document.createElement("div");
    projects.classList.add("projects");

    // render project names as buttons that navigate to each project page
    const projectButtons = [];

    for (const p of hannah.getAllProjects()) {
        const projectButton = document.createElement("button");
        projectButton.textContent = p.getTitle();
        projectButton.style.color = p.getColor();
        projects.appendChild(projectButton);
        projectButtons.push(projectButton);
    }
    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;
            renderMain(buttonText);
            selectedProject = buttonText;
        });
    });

    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+ add project";
    addProjectButton.addEventListener("click", () => {
        modal.openModal();
        modal.showProjectForm();
    });

    sidebar.append(view, all, important, projectsHeader, projects, addProjectButton);
}

const renderMain = (projectTitle = "") => {
    const showTasks = (task) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const taskCircle = document.createElement("button");
        taskCircle.textContent = "";
        taskCircle.classList.add("circle");

        const taskTitle = document.createElement("p");
        taskTitle.textContent = task.getTitle();

        taskDiv.append(taskCircle, taskTitle);
        tasks.appendChild(taskDiv);
    }

    const main = document.querySelector("#main");
    main.textContent = "";

    const mainHeader = document.createElement("h1");
    if (projectTitle == "important") {
        mainHeader.textContent = "important";
    } else if (projectTitle) {
        mainHeader.textContent = projectTitle;
    } else {
        mainHeader.textContent = "all";
    }
    

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");

    const allProjects = hannah.getAllProjects();

    // render tasks based on selected project
    if (projectTitle === "" || projectTitle == "all") {
        allProjects.forEach((project) => {
            project.getTasks().forEach((task) => {
                showTasks(task);
            });
        });
    } else if (projectTitle == "important") {
        allProjects.forEach((project) => {
            project.getTasks().forEach((task) => {
                if (task.getPriority() == 1) {
                    showTasks(task);
                }
            });
        });
    } else { // render all tasks
        const project = hannah.getProject(projectTitle);
        project.getTasks().forEach((task) => {
            showTasks(task);
        });
    };

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "+ add task";
    addTaskButton.classList.add("addTaskButton");
    addTaskButton.addEventListener("click", () => {
        modal.openModal();
        modal.showTaskForm();
    });

    main.append(mainHeader, tasks, addTaskButton);
}

modal.cancelButton.addEventListener("click", () => {
    modal.closeModal();
});

export { renderSidebar, renderMain };