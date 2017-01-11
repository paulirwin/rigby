import Rigby from "rigby";
import React from "react";
import ReactDOM from "react-dom";
import TodoStore from "./TodoStore";

class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = TodoStore.getState();
        this.onChangeHandler = this.onChange.bind(this);
    }

    componentDidMount() {
        TodoStore.listen(this.onChangeHandler);
    }

    componentWillUnmount() {
        TodoStore.mute(this.onChangeHandler);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {

        //bad hat
        var todos = this.state.todos.map((todo, index) => <p key={index}>{todo}</p>)

        return (
            <div>
                {todos}
                <TodoCreator/>
            </div>
        )
    }

}

class TodoCreator extends React.Component {
    addTodo() {
        Rigby.dispatch('addTodo', this.refs.newTodo.value);
    }

    render() {
        return (
            <div>
                <input type="text" ref="newTodo"/>
                <button onClick={this.addTodo.bind(this)}>Add</button>
            </div>
        )
    }
}


ReactDOM.render(<TodoContainer/>, document.getElementById("mount"));


