"use strict";

var TodoStore = Rigby.createStore('Todo', {

    state: { todos: [] },

    actions: {
        addTodo: function addTodo(text) {
            this.state.todos.push(text);
            this.emitChange();
        }
    }
});

var TodoContainer = React.createClass({
    displayName: "TodoContainer",
    componentDidMount: function componentDidMount() {
        TodoStore.listen(this.onChange);
    },
    componentWillUnmount: function componentWillUnmount() {
        TodoStore.mute(this.onChange);
    },
    getInitialState: function getInitialState() {
        return TodoStore.getState();
    },
    render: function render() {

        //bad hat
        var todos = this.state.todos.map(function (todo, index) {
            return React.createElement(
                "p",
                { key: index },
                todo
            );
        });

        return React.createElement(
            "div",
            null,
            todos,
            React.createElement(TodoCreator, null)
        );
    },
    onChange: function onChange(state) {
        this.setState(state);
    }
});

var TodoCreator = React.createClass({
    displayName: "TodoCreator",
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", ref: "newTodo" }),
            React.createElement(
                "button",
                { onClick: this.addTodo },
                "Add"
            )
        );
    },
    addTodo: function addTodo() {
        Rigby.dispatch('addTodo', ReactDOM.findDOMNode(this.refs.newTodo).value);
    }
});

ReactDOM.render(React.createElement(TodoContainer, null), document.body);

//# sourceMappingURL=demo-compiled.js.map