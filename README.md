# rigby

####React is great, but... y'know

#####Installation

[npm install rigby](https://www.npmjs.com/package/rigby)

#####Usage

```javascript

Rigby.createStore('YourStoreName', {
    state: {
        data: [
          'Your Data Goes Here'
        ]
    },
    actions: {
        doThingsWithData: function(text) {
            this.state.data.push(text);
            this.emitChange();
        }
    }
});

```

#####Why

Less boilerplate when creating Stores and a more fluent API for doing so.

#####Plans

This is a thought experiment, and there are plans for versions that allow for using RxJS or move in the direction of things like Cycle and Yolk.
