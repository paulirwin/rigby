'use strict';

Unicycle.createStore('Todo', {

    state: { todos: [] },

    actions: {
        addTodo: function addTodo(action) {
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

        //bad hat
        var todos = this.state.todos.map(function (todo, index) {
            return React.createElement(
                'p',
                { key: index },
                todo
            );
        });

        return React.createElement(
            'div',
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
    displayName: 'TodoCreator',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement('input', { type: 'text', ref: 'newTodo' }),
            React.createElement(
                'button',
                { onClick: this.addTodo },
                'Add'
            )
        );
    },

    addTodo: function addTodo() {
        Unicycle.dispatch({
            type: 'addTodo',
            text: React.findDOMNode(this.refs.newTodo).value
        });
    }
});

React.render(React.createElement(TodoContainer, null), document.body);

//# sourceMappingURL=demo-compiled.js.map