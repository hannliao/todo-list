class Profile {
    constructor() {
        this.allProjects = [];
    }

    getAllProjects = () => this.allProjects;

    getProject = (title) => this.allProjects.find(p => p.getTitle() == title);

    getAllTasks = () => this.allProjects.flatMap(project => project.getTasks());

    addProject(project) {
        this.allProjects.push(project);
    }

    removeProject(projectTitle) {
        this.allProjects = this.allProjects.filter(project => project.getTitle() !== projectTitle);
    }
}

class Project {
    constructor(title, color) {
        this.title = title;
        this.color = color;
        this.tasks = [];
    }

    getTitle = () => this.title;
    setTitle = (title) => this.title = title;
    getColor = () => this.color;
    setColor = (color) => this.color = color; 
    getTasks = () => this.tasks;

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

export { Profile, Project };