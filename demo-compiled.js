'use strict';

Unicycle.createStore('Todo', {

    state: {

        todos: ['test']

    },

    actions: {

        addTodo: function addTodo(action) {
            debugger;
            this.state.todos.push(action.text);
            this.emitChange();
        }

    }
});

var TodoContainer = React.createClass({
    displayName: 'TodoContainer',

    componentDidMount: function componentDidMount() {
        Unicycle.Stores['Todo'].listen(this.onChange);
    },

    componentWillUnmount: function componentWillUnmount() {
        Unicycle.Stores['Todo'].mute(this.onChange);
    },

    getInitialState: function getInitialState() {
        return Unicycle.Stores['Todo'].getState();
    },

    render: function render() {

        var todos = this.state.todos.map(function (todo) {
            return React.createElement(
                'p',
                { key: todo },
                todo
            );
        });

        return React.createElement(
            'div',
            null,
            todos
        );
    },

    onChange: function onChange(state) {
        this.setState(state);
    }

});

React.render(React.createElement(TodoContainer, null), document.body);

Unicycle.dispatch({
    type: 'addTodo',
    text: 'wee'
});

//# sourceMappingURL=demo-compiled.js.map