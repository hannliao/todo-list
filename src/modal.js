import * as dom from "./dom.js"
import Task from "./tasks.js"
import { Project } from "./projects.js"
import { hannah } from "./index.js"

export class Modal {
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

        dom.renderSidebar();
        this.closeModal();
    }

    addTask() {
        const title = this.title.value;
        const description = this.description.value;
        const dueDate = this.dueDate.value;
        const priority = this.priority.value;
        
        const newTask = new Task(title, description, dueDate, priority);
        const project = hannah.getProject(dom.selectedProject);
        project.addTask(newTask);

        dom.renderMain(dom.selectedProject);
        this.closeModal();
    }
}