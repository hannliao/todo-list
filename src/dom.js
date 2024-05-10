import { format } from "date-fns"
import { hannah } from "./index.js"
import { Modal } from "./modal.js"
import Trash from "./trash-outline.svg"
import Plus from "./add.svg"
import Ellipsis from "./ellipsis.svg"

const modal = new Modal();
let selectedProject = "personal";

const formatDate = (date) => {
    return format(date, "LLL dd");
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
            closeOptions();
        });
    });
}

const getFlagColor = (priority) => {
    if (priority === "high") {
        return "rgb(245, 94, 127)";
    } else if (priority === "medium") {
        return "rgb(255, 194, 207)";
    } else {
        return "transparent";
    }
}

const showTask = (task, project) => {
    const taskDiv = document.createElement("button");
    taskDiv.classList.add("task");

    taskDiv.addEventListener("click", (event) => {
        showTaskDetails(task);
    });

    const taskCircle = document.createElement("button");
    taskCircle.textContent = "";
    taskCircle.classList.add("circle");

    taskCircle.addEventListener("click", (event) => {
        event.stopPropagation();
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

    const taskDate = document.createElement("div");
    taskDate.textContent = formatDate(task.getDueDate());
    taskDate.classList.add("task-date");

    const svgFlag = `<svg id="flag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M80 480a16 16 0 01-16-16V68.13a24 24 0 0111.9-20.72C88 40.38 112.38 32 160 32c37.21 0 78.83 14.71 115.55 27.68C305.12 
        70.13 333.05 80 352 80a183.84 183.84 0 0071-14.5 18 18 0 0125 16.58v219.36a20 20 0 01-12 18.31c-8.71 3.81-40.51 16.25-84 
        16.25-24.14 0-54.38-7.14-86.39-14.71C229.63 312.79 192.43 304 160 304c-36.87 0-55.74 5.58-64 9.11V464a16 16 0 01-16 16z"/></svg>`;

    const taskFlag = document.createElement("div");
    taskFlag.innerHTML = svgFlag.trim();
    const flagElement = taskFlag.querySelector("#flag");
    flagElement.setAttribute("fill", getFlagColor(task.getPriority()));
    taskFlag.classList.add("flag-icon");

    const taskTrash = document.createElement("button");
    const trashIcon = document.createElement("img");
    trashIcon.src = Trash;
    taskTrash.appendChild(trashIcon);
    taskTrash.classList.add("trash-icon");

    if (project.getTitle() === "all" || project.getTitle() === "important") {
        taskTrash.style.display = "none";
    } else {
        taskTrash.addEventListener("click", (event) => {
            event.stopPropagation();
            project.removeTask(task);
            renderMain(project.getTitle());
        });
    }

    if (task.getCompleted() === true) {
        taskDiv.style.textDecoration = "line-through";
    }

    taskDiv.append(taskCircle, taskTitle, taskDate, taskFlag, taskTrash);
    return taskDiv;
}

const showTaskDetails = (task) => {
    const taskDetails = document.createElement("dialog");
    taskDetails.style.width = "370px";
    taskDetails.innerHTML = `
        <strong>${task.getTitle()}</strong> <br><br>
        ${task.getDescription()} <br><br>
        due date: ${formatDate(task.getDueDate())} &emsp;&emsp; priority: ${task.getPriority()}
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

const toggleOptions = () => {
    const options = document.querySelector(".options");
    const computedStyle = window.getComputedStyle(options);
    options.style.display = computedStyle.display === "none" ? "block" : "none";
}

const closeOptions = () => {
    document.querySelector(".options").style.display = "none";
}

const renderMain = (projectTitle) => {
    const main = document.querySelector("main");
    const project = hannah.getProject(projectTitle);

    const mainHeaderDiv = document.querySelector(".main-header");
    const mainHeader = main.querySelector("h1");
    mainHeader.style.color = "black";
    const ellipsisButton = mainHeaderDiv.querySelector(".ellipsis-icon");
    ellipsisButton.style.display = "none";

    if (projectTitle === "important") {
        mainHeader.textContent = "important";
    } else if (projectTitle === "all") {
        mainHeader.textContent = "all";
    } else {
        mainHeader.style.color = project.getColor();
        mainHeader.textContent = projectTitle;

        ellipsisButton.style.display = "block";
        ellipsisButton.textContent = "";
        const ellipsisIcon = document.createElement("img");
        ellipsisIcon.src = Ellipsis;
        ellipsisButton.appendChild(ellipsisIcon);

        ellipsisButton.addEventListener("click", toggleOptions);

        const edit = mainHeaderDiv.querySelector(".edit");
        edit.addEventListener("click", () => {
            modal.openModal();
            modal.showProjectForm();
            document.querySelector("#title").value = project.getTitle();
            document.querySelector("#color").value = project.getColor();

            const submitButton = document.querySelector("#submit");
            submitButton.textContent = "edit";

            closeOptions();
        });
    }

    const del = mainHeaderDiv.querySelector(".del");
    del.addEventListener("click", () => {
        hannah.removeProject(project);
        renderSidebar();
        renderMain("all");
        closeOptions();
    });

    const tasks = main.querySelector(".tasks");
    tasks.textContent = "";

    const allProjects = hannah.getAllProjects();

    // render tasks based on selected project
    if (projectTitle === "" || projectTitle == "all") {
        allProjects.forEach((project) => {
            project.getTasks().forEach((task) => {
                tasks.appendChild(showTask(task, project));
            });
        });
    } else if (projectTitle == "important") {
        allProjects.forEach((project) => {
            project.getTasks().forEach((task) => {
                if (task.getPriority() == "high") {
                    tasks.appendChild(showTask(task, project));
                }
            });
        });
    } else { // render all tasks
        project.getTasks().forEach((task) => {
            tasks.appendChild(showTask(task, project));
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

export { renderSidebar, renderMain, selectedProject };