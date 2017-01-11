import Store from "rigby";

class TodoStore extends Store {
    constructor() {
        super("Todo");

        this.state.todos = [];
    }

    addTodo(text) {
        this.state.todos.push(text);
        this.emitChange();
    }
}

// singleton approach:
export default new TodoStore();