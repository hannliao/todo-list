const projects = {
    allProjects: [],

    addProject(project) {
        this.allProjects.push(project);
    },

    removeProject(title) {
        this.allProjects = this.allProjects.filter(project => project.getTitle() !== title);
    },

    getProject(title) {
        return this.allProjects.find(p => p.getTitle() == title);
    },

    getProjectByIndex(index) {
        return this.allProjects.find(p => p.getIndex() == index);
    },

    getAllTasks() {
        return this.allProjects.flatMap(project => project.getTasks());
    },

    saveProjects() {
        localStorage.setItem("projects", JSON.stringify(this.allProjects));
    }
}

class Project {
    constructor(title, color, tasks = []) {
        this.title = title;
        this.color = color;
        this.tasks = tasks;
        this.index = 0;
    }

    getTitle = () => this.title;
    setTitle = (title) => this.title = title;
    getColor = () => this.color;
    setColor = (color) => this.color = color;
    getIndex = () => this.index;
    setIndex = (index) => this.index = index;
    getTasks = () => this.tasks;
    setTasks = (tasks) => this.tasks = tasks;

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(t => t !== task);
    }

    findTask(taskTitle) {
        return this.tasks.find(t => t.getTitle() == taskTitle);
    }
}

export { projects, Project };