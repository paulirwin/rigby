
const Stores = {};

export default class Store {
    
    constructor(name) {
        this.actions = {};
        this.state = {};
        this.callbacks = [];
        
        Stores[name] = this;
    }
    
    static dispatch(action) {
        for(var key in Stores) {
            Stores[key].handle(action);
        }
    }
    
    static createStore(name, store) {
        return Object.assign(new Store(name), store);
    }
    
    emitChange() {
        this.callbacks.forEach(function(callback){
            callback(this.state);
        }, this);
    }

    getState() {
        return this.state;
    }

    handle(action) {
        if(action.type in this.actions) {
            this.actions[action.type].call(this, action);
        }
    }

    listen(callback) {
        return this.callbacks.push(callback);
    }

    mute(index) {
        this.callbacks.splice(index, 1);
    }
    
}

const createStore = Store.createStore;
const dispatch = Store.dispatch;

export { createStore, dispatch }

window.Unicycle = Store;