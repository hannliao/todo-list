class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    getTitle = () => this.title;
    setTitle = (title) => this.title = title;
    getDescription = () => this.description;
    setDescroption = (description) => this.description = description;
    getDueDate = () => this.dueDate;
    setDueDate = (dueDate) => this.dueDate = dueDate;
    getPriority = () => this.priority;
    setPriority = (priority) => this.priority = priority;
}

export default Task;