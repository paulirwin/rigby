var TodoStore = Rigby.createStore('Todo', {

    state: { todos: [] },

    actions: {
        addTodo(action) {
            this.state.todos.push(action.text);
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
        var todos = this.state.todos.map((todo, index) => <p key={index}>{todo}</p>)

        return (
            <div>
                {todos}
                <TodoCreator/>
            </div>
        )
    },

    onChange(state) {
        this.setState(state);
    }

});

var TodoCreator = React.createClass({
    render() {
        return (
            <div>
                <input type="text" ref="newTodo"/>
                <button onClick={this.addTodo}>Add</button>
            </div>
        )
    },

    addTodo() {
        Rigby.dispatch({
            type: 'addTodo',
            text: ReactDOM.findDOMNode(this.refs.newTodo).value
        });
    }
});


ReactDOM.render(<TodoContainer/>, document.body);


