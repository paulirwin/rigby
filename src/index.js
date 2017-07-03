const Stores = {};

export default class Store {

    constructor(name) {
        this.state = {};
        this.callbacks = {};
        
        Stores[name] = this;

        let _callbackId = 0;

        this.listen = (callback) => {
            let id = _callbackId++;
            this.callbacks[id] = callback;
            return id;
        };
    }
    
    static dispatch(type, ...args) {
        for (var key in Stores) {
            if (Stores.hasOwnProperty(key)) {
                Stores[key].handle(type, args);
            }
        }
    }
    
    static createStore(name, store) {
        let s = new Store(name);
        Object.assign(s.state, store.state || {});
        Object.assign(s, store.actions || {});
        return s;
    }
    
    emitChange() {
        for (let i in this.callbacks) {
            if (this.callbacks.hasOwnProperty(i)) {
                this.callbacks[i](this.state);
            }
        }
    }

    getState() {
        return this.state;
    }

    handle(type, args) {
        if (type in this) {
            this[type].apply(this, args);
        }
    }

    mute(id) {
        delete this.callbacks[id];
    }    
}

const createStore = Store.createStore;
const dispatch = Store.dispatch;

export { createStore, dispatch }

window.Rigby = Store;
