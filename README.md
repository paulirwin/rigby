# rigby

####React is great, but... y'know

#####Usage

```javascript

Unicycle.createStore('YourStoreName', {
    state: {
        data: [
          'Your Data Goes Here'
        ]
    },
    actions: {
        doThingsWithData: function(action) {
            this.state.data.push(action.text);
            this.emitChange();
        }
    }
});

```

#####Why

Less boilerplate when creating Stores and a more fluent API for doing so.

#####Plans

This is a thought experiment, and there are plans for versions that allow for using RxJS or move in the direction of things like Cycle and Yolk.
