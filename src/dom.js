import { format } from "date-fns"
import { profile } from "./index.js"
import Modal from "./modal.js"
import Trash from "./img/trash-outline.svg"
import Plus from "./img/add.svg"
import Ellipsis from "./img/ellipsis.svg"

const modal = new Modal();
let selectedProject = "personal";
let submitButton = document.querySelector("#submit");

function formatDate(date) {
    return format(date, "LLL dd");
}

function createIcon(className, source) {
    const iconButton = document.createElement("button");
    const icon = document.createElement("img");
    icon.src = source;
    iconButton.appendChild(icon);
    iconButton.classList.add(className);
    return iconButton;
}

function renderSidebar() {
    const sidebar = document.querySelector("#sidebar");

    const all = sidebar.querySelector("button");
    all.addEventListener("click", () => {
        renderMain("all");
    });

    const important = sidebar.querySelectorAll("button")[1];
    important.addEventListener("click", () => {
        renderMain("important");
    });

    const projectsHeaderDiv = sidebar.querySelector(".projects-header");
    const addProjectButton = createIcon("plus-icon", Plus);

    addProjectButton.addEventListener("click", () => {
        submitButton.textContent = "add";
        modal.openModal();
        modal.showProjectForm();
    });

    projectsHeaderDiv.appendChild(addProjectButton);

    renderProjects();
}

function renderProjects() {
    const projects = document.querySelector(".projects");
    projects.textContent = "";

    const projectButtons = [];

    for (const p of profile.getAllProjects()) {
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

function getFlagColor(priority) {
    if (priority === "high") {
        return "#f55e7f";
    } else if (priority === "medium") {
        return "#ffc2cf";
    } else {
        return "transparent";
    }
}

function showTask(task) {
    const taskDiv = document.createElement("button");
    taskDiv.classList.add("task");

    taskDiv.addEventListener("click", (event) => {
        showTaskDetails(task);
    });

    const taskCircle = document.createElement("button");
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

    const taskTrash = createIcon("trash-icon", Trash);

    taskTrash.addEventListener("click", (event) => {
        event.stopPropagation();
        const project = task.getProject();
        project.removeTask(task);
        renderMain(project.getTitle());
    });

    if (task.getCompleted() === true) {
        taskDiv.style.textDecoration = "line-through";
    }

    taskDiv.append(taskCircle, taskTitle, taskDate, taskFlag, taskTrash);
    return taskDiv;
}

function showTaskDetails(task) {
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

function toggleOptions() {
    const options = document.querySelector(".options");
    const computedStyle = window.getComputedStyle(options);
    options.style.display = computedStyle.display === "none" ? "block" : "none";
}

function closeOptions() {
    document.querySelector(".options").style.display = "none";
}

function renderMain(projectTitle) {
    const main = document.querySelector("main");
    const project = profile.getProject(projectTitle);

    const mainHeaderDiv = document.querySelector(".main-header");
    const mainHeader = mainHeaderDiv.querySelector("h1");
    mainHeader.textContent = projectTitle;
    mainHeader.style.color = "black";

    const ellipsisButton = document.querySelector(".ellipsis-icon");
    const ellipsisIcon = document.createElement("img");
    ellipsisIcon.src = Ellipsis;
    ellipsisButton.textContent = "";
    ellipsisButton.appendChild(ellipsisIcon);
    ellipsisButton.style.display = "none";

    const addTaskButton = main.querySelector(".addTaskButton");

    if (projectTitle === "important" || projectTitle === "all") {
        addTaskButton.style.display = "none";        
    } else {
        mainHeader.style.color = project.getColor();
        ellipsisButton.style.display = "block";
        ellipsisButton.addEventListener("click", toggleOptions);
        
        addTaskButton.style.display = "block";
        addTaskButton.addEventListener("click", () => {
            submitButton.textContent = "add";
            modal.openModal();
            modal.showTaskForm();
        });
    }

    const edit = main.querySelector(".edit");
    edit.addEventListener("click", () => {
        submitButton.textContent = "edit";

        modal.openModal();
        modal.showProjectForm();
        document.querySelector("#title").value = project.getTitle();
        document.querySelector("#color").value = project.getColor();
        closeOptions();
    });

    const del = main.querySelector(".del");
    del.addEventListener("click", () => {
        profile.removeProject(selectedProject);
        renderProjects();
        renderMain("all");
        closeOptions();
    });

    const tasks = main.querySelector(".tasks");
    tasks.textContent = "";

    const allProjects = profile.getAllProjects()
    const allTasks = allProjects.flatMap(project => project.getTasks());

    const tasksToShow = () => {
        if (projectTitle === "all") {
            return allTasks;
        } else if (projectTitle == "important") {
            return allTasks.filter((task) => task.getPriority() == "high");
        } else {
            return project.getTasks();
        };
    }
    tasksToShow().forEach((task) => tasks.appendChild(showTask(task)));
}

modal.cancelButton.addEventListener("click", () => {
    modal.closeModal();
});

export { renderSidebar, renderProjects, renderMain, submitButton };