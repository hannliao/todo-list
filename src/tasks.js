class Task {
    constructor(title, description, dueDate, priority, project, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.completed = completed;
    }

    getTitle = () => this.title;
    setTitle = (title) => this.title = title;
    getDescription = () => this.description;
    setDescription = (description) => this.description = description;
    getDueDate = () => this.dueDate;
    setDueDate = (dueDate) => this.dueDate = dueDate;
    getPriority = () => this.priority;
    setPriority = (priority) => this.priority = priority;
    getProject = () => this.project;
    setProject = (project) => this.project = project;
    getCompleted = () => this.completed;
    setCompleted = (completed) => this.completed = completed;
}

export default Task;