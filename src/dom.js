import { hannah } from "./index.js"
import { Modal } from "./modal.js"
import Trash from "./trash-outline.svg"
import Plus from "./add.svg"

const modal = new Modal();
let selectedProject = "personal";

const createTrash = () => {
    const trashIconButton = document.createElement("button");
    const trashIcon = document.createElement("img");
    trashIcon.src = Trash;
    trashIconButton.classList.add("trash-icon");
    trashIconButton.appendChild(trashIcon);
    return trashIconButton;
}

const renderSidebar = () => {
    const sidebar = document.querySelector("#sidebar");

    const all = sidebar.querySelector("button");
    all.addEventListener("click", () => {
        renderMain("all");
        selectedProject = "personal";
    });

    const important = sidebar.querySelectorAll("button")[1];
    important.addEventListener("click", () => {
        renderMain("important");
        selectedProject = "personal";
    });

    const projectsHeaderDiv = sidebar.querySelector(".projects-header");
    const addProjectButton = projectsHeaderDiv.querySelector("button");
    addProjectButton.textContent = "";

    const plusIcon = document.createElement("img");
    plusIcon.src = Plus;
    plusIcon.classList.add("plus-icon");
    addProjectButton.appendChild(plusIcon);

    addProjectButton.addEventListener("click", () => {
        modal.openModal();
        modal.showProjectForm();
    });

    renderProjects();
}

const renderProjects = () => {
    const projects = document.querySelector(".projects");
    projects.textContent = "";

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
}

const renderMain = (projectTitle) => {
    const project = hannah.getProject(projectTitle);

    const showTasks = (task) => {
        const taskDiv = document.createElement("button");
        taskDiv.classList.add("task");

        const showTaskDetails = (task) => {
            const taskDetails = document.createElement("dialog");
            taskDetails.style.width = "400px";
            taskDetails.innerHTML = `
                <strong>${task.getTitle()}</strong> <br>
                ${task.getDescription()} <br>
                due date: ${task.getDueDate()} <br>
                priority: ${task.getPriority()}
            `;

            document.body.appendChild(taskDetails);
            taskDetails.showModal();

            const closeTaskDetails = (event) => {
                if (taskDetails.contains(event.target)) {
                    taskDetails.close();
                    document.removeEventListener("click", closeTaskDetails);
                }
            };

            document.addEventListener("click", closeTaskDetails);
        }

        taskDiv.addEventListener("click", (event) => {
            event.stopPropagation();
            showTaskDetails(task);
        });

        const taskCircle = document.createElement("button");
        taskCircle.textContent = "";
        taskCircle.classList.add("circle");

        taskCircle.addEventListener("click", (event) => {
            event.stopImmediatePropagation();
            if (task.getCompleted() === false) {
                taskDiv.style.textDecoration = "line-through";
                task.setCompleted(true);
            } else {
                taskDiv.style.textDecoration = "none";
                task.setCompleted(false);
            }
        });

        const taskTitle = document.createElement("p");
        taskTitle.textContent = task.getTitle();
        taskTitle.classList.add("task-text");

        const taskTrash = createTrash();
        if (projectTitle === "all" || projectTitle === "important") {
            taskTrash.style.display = "none";
        } else {
            taskTrash.addEventListener("click", (event) => {
                event.stopPropagation();
                project.removeTask(task);
                renderMain(projectTitle);
            });
        }

        taskDiv.append(taskCircle, taskTitle, taskTrash);
        tasks.appendChild(taskDiv);
    }


    const main = document.querySelector("main");

    const mainHeader = main.querySelector("h1");
    if (projectTitle === "important") {
        mainHeader.textContent = "important";
    } else if (projectTitle === "all") {
        mainHeader.textContent = "all";
    } else {
        mainHeader.style.color = project.getColor();
        mainHeader.textContent = projectTitle;
    }

    const tasks = main.querySelector(".tasks");
    tasks.textContent = "";

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
        project.getTasks().forEach((task) => {
            showTasks(task);
        });
    };

    const addTaskButton = main.querySelector(".addTaskButton");
    addTaskButton.addEventListener("click", () => {
        modal.openModal();
        modal.showTaskForm();
    });
}

modal.cancelButton.addEventListener("click", () => {
    modal.closeModal();
});

export { renderSidebar, renderMain , selectedProject};