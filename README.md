# rigby

####React is great, but... y'know

#####Installation

[npm install rigby](https://www.npmjs.com/package/rigby)

#####Creating a Store

```javascript

Rigby.createStore('YourStoreName', {
  state: {
    todos: [
      { 
        text: 'Your Data Goes Here',
        complete: false
      }
    ]
  },
  actions: {
    addTodo: function(text, complete) {
      this.state.todos.push({ text: text, complete: complete });
      this.emitChange();
    }
  }
});

```

Or with ES6:

```javascript
import Store from "rigby";

class YourStore extends Store {
  constructor() {
    super("YourStoreName");

    this.state.todos = [ 
      { text: "Your Data Goes Here", complete: false }
    ];
  }

  addTodo(text, complete) {
      this.state.todos.push({ text, complete });
      this.emitChange();
  }
}

```

#####Dispatching Actions

```javascript
import Rigby from "rigby";

Rigby.dispatch("addTodo", "Your New Todo", false);
```

#####Why

Less boilerplate when creating Stores and a more fluent API for doing so.

#####Plans

This is a thought experiment, and there are plans for versions that allow for using RxJS or move in the direction of things like Cycle and Yolk.
