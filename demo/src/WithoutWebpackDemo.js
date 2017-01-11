var TodoStore = Rigby.createStore('Todo', {

    state: { todos: [] },

    actions: {
        addTodo(text) {
            this.state.todos.push(text);
            this.emitChange();
        }
    }
});

var TodoContainer = React.createClass({

    componentDidMount() {
        TodoStore.listen(this.onChange);
    },

    componentWillUnmount() {
        TodoStore.mute(this.onChange);
    },

    getInitialState() {
        return TodoStore.getState();
    },

    render() {

        //bad hat
        var todos = this.state.todos.map(function(todo, index) { return React.createElement("p", { key: index }, todo); });

        return React.createElement("div", null, todos, React.createElement(TodoCreator, null));
    },

    onChange(state) {
        this.setState(state);
    }

});

var TodoCreator = React.createClass({
    render() {
        return React.createElement("div", null, 
            React.createElement("input", { type: "text", ref: "newTodo" }),
            React.createElement("button", { onClick: this.addTodo }, "Add")
        );
    },

    addTodo() {
        Rigby.dispatch('addTodo', ReactDOM.findDOMNode(this.refs.newTodo).value);
    }
});


ReactDOM.render(React.createElement(TodoContainer, null), document.getElementById("mount"));