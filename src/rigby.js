
const Stores = {};

export default class Store {
    
    constructor(name) {
        this.state = {};
        this.callbacks = [];
        
        Stores[name] = this;
    }
    
    static dispatch(type, ...args) {
        for(var key in Stores) {
            Stores[key].handle(type, args);
        }
    }
    
    static createStore(name, store) {
        let s = new Store(name);
        Object.assign(s.state, store.state || {});
        Object.assign(s, store.actions || {});
        return s;
    }
    
    emitChange() {
        this.callbacks.forEach(function(callback){
            callback(this.state);
        }, this);
    }

    getState() {
        return this.state;
    }

    handle(type, args) {
        if (type in this) {
            this[type].call(this, args);
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

window.Rigby = Store;