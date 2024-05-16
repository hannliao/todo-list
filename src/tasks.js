class Task {
    constructor(title, description, priority, dueDate = null, completed = false) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = completed;
        this.projectIndex = 0;
    }

    getTitle = () => this.title;
    setTitle = (title) => this.title = title;
    getDescription = () => this.description;
    setDescription = (description) => this.description = description;
    getPriority = () => this.priority;
    setPriority = (priority) => this.priority = priority;
    getDueDate = () => this.dueDate;
    setDueDate = (dueDate) => this.dueDate = dueDate;
    getCompleted = () => this.completed;
    setCompleted = (completed) => this.completed = completed;
    getProjectIndex = () => this.projectIndex;
    setProjectIndex = (projectIndex) => this.projectIndex = projectIndex;
}

export default Task;