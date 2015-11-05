Unicycle.createStore('Todo', {
    state: {
        todos: [
            'test'
        ]
    },
    actions: {
        addTodo: function(action) {
            Unicycle.waitFor('OtherStore');
            this.state.todos.push(action.text);
        }
    }
});

var TodoContainer = React.createClass({
    componentDidMount() {
        Unicycle.Stores['Todo'].listen(this.onChange);
    },
    componentWillUnmount() {
        Unicycle.Stores['Todo'].mute(this.onChange);
    },
    getInitialState() {
        return Unicycle.Stores['Todo'].getState();
    },
    render() {

        var todos = this.state.todos.map(todo => <p key={todo}>{todo}</p>)

        return (
            <div>
                {todos}
            </div>
        )
    },
    onChange(state) {
        this.setState(state);
    }
});

React.render(<TodoContainer/>, document.body);

Unicycle.dispatch({
    type: 'addTodo',
    text: 'wee'
})