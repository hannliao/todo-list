import { profile, localToday } from "./index.js"
import { renderProjects, renderMain, submitButton, selectedTask } from "./dom.js"
import Task from "./tasks.js"
import { Project } from "./projects.js"

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
        
    }

    addProject() {
        const title = this.title.value;
        const color = this.color.value;

        const newProject = new Project(title, color);
        profile.addProject(newProject);

        renderProjects();
        this.closeModal();
    }

    addTask() {
        const title = this.title.value;
        const description = this.description.value;
        const dueDate = this.dueDate.value ? this.dueDate.value : localToday;
        const priority = this.priority.value;

        let projectTitle = document.querySelector("#main-title").textContent;
        let project = profile.getProject(projectTitle);

        const newTask = new Task(title, description, dueDate, priority, project);
        project.addTask(newTask);

        renderMain(projectTitle);
        this.closeModal();
    }

    editProject() {
        let projectTitle = document.querySelector("#main-title").textContent;
        let project = profile.getProject(projectTitle);

        const title = this.title.value;
        const color = this.color.value;
        project.setTitle(title);
        project.setColor(color);

        renderProjects();
        renderMain(title);
        this.closeModal();
    }

    editTask() {
        let pageTitle = document.querySelector("#main-title").textContent;

        const allTasks = profile.getAllTasks();
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
        this.closeModal();
    }
}

export default Modal;