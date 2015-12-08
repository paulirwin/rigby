(function(){

    var Unicycle = Unicycle || {};

    Unicycle.Stores = Unicycle.Stores || {};

    Unicycle.Store = {

        actions: {},

        state: {},

        callbacks: [],

        emitChange: function() {
            this.callbacks.forEach(function(callback){
                callback(this.state);
            }, this);
        },

        getState: function() {
            return this.state;
        },

        handle: function(action) {
            if(action.type in this.actions) {
                this.actions[action.type].call(this, action);
            }
        },

        listen: function(callback) {
            return this.callbacks.push(callback);
        },

        mute: function(index) {
            this.callbacks.splice(index, 1);
        }

    };

    Unicycle.dispatch = function(action) {

        for(var key in Unicycle.Stores) {
            Unicycle.Stores[key].handle(action);
        }

    };

    Unicycle.createStore = function(name, store) {
        Unicycle.Stores[name] = Object.assign(Object.create(Unicycle.Store), store);
    };

    window.Unicycle = Unicycle;

})();