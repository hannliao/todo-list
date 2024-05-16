import { renderProjects, renderMain, submitButton, selectedTask } from "./dom.js"
import Task from "./tasks.js"
import { projects, Project } from "./projects.js"

// set minimum due date to today's local date
const getLocalToday = () => {
    const localDateTime = new Date();
    const localDate = localDateTime.toISOString().split("T")[0];
    return localDate;
}
const localToday = getLocalToday();
document.getElementById("dueDate").setAttribute("min", localToday);

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

        if (submitButton.textContent === "add") {
            if (this.projectSpecificDiv.style.display === "block") {
                this.addProject();
            } else {
                this.addTask();
            }
        } else {
            if (this.projectSpecificDiv.style.display === "block") {
                this.editProject();
            } else {
                this.editTask();
            }
        }
        this.closeModal();
    }

    addProject() {
        const title = this.title.value;
        const color = this.color.value;

        const newProject = new Project(title, color);
        projects.addProject(newProject);

        renderProjects();
    }

    addTask() {
        const title = this.title.value;
        const description = this.description.value;
        const dueDate = this.dueDate.value ? this.dueDate.value : null;
        const priority = this.priority.value;

        let projectTitle = document.querySelector("#main-title").textContent;
        let project = projects.getProject(projectTitle);

        const newTask = new Task(title, description, priority, dueDate);
        project.addTask(newTask);

        renderMain(projectTitle);
    }

    editProject() {
        let projectTitle = document.querySelector("#main-title").textContent;
        let project = projects.getProject(projectTitle);

        const title = this.title.value;
        const color = this.color.value;
        project.setTitle(title);
        project.setColor(color);

        renderProjects();
        renderMain(title);
    }

    editTask() {
        let pageTitle = document.querySelector("#main-title").textContent;

        const allTasks = projects.allProjects.flatMap(project => project.getTasks());
        let task = allTasks.find(t => t.getTitle() == selectedTask);

        const title = this.title.value;
        const description = this.description.value;
        const dueDate = this.dueDate.value;
        const priority = this.priority.value;

        task.setTitle(title);
        task.setDescription(description);
        task.setDueDate(dueDate);
        task.setPriority(priority);

        renderMain(pageTitle);
    }
}

export default Modal;