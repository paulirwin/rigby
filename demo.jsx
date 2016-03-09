
Unicycle.createStore('Todo', {

    state: { todos: [] },

    actions: {
        addTodo: function(action) {
            this.state.todos.push(action.text);
            this.emitChange();
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
    render: function() {
        return (
            <div>
                <input type="text" ref="newTodo"/>
                <button onClick={this.addTodo}>Add</button>
            </div>
        )
    },

    addTodo() {
        Unicycle.dispatch({
            type: 'addTodo',
            text: React.findDOMNode(this.refs.newTodo).value
        });
    }
});


React.render(<TodoContainer/>, document.body);


