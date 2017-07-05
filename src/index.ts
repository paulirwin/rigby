import "core-js/fn/object/assign";

interface StoresMap {
    [name: string]: HandleDispatch;
}

const Stores: StoresMap = {};

export interface StoreCreatorOptions<TState> {
    state?: TState;
    actions?: any;
}

export interface StoreCreator {
    <TState>(name: string, store: StoreCreatorOptions<TState>): Store<TState>;
}

export interface Dispatch {
    (type: string, ...args: any[]): void;
}

export interface StoreCallback {
    <TState>(state: TState): void;
}

interface CallbackMap {
    [id: number]: StoreCallback;
}

export interface HandleDispatch {
    handle(type: string, args: any[]): void;
}

export default class Store<TState> implements HandleDispatch {

    state: TState;
    private callbacks: CallbackMap = {};
    private callbackId = 0;

    constructor(name: string) {
        this.state = <TState>{};
        this.callbacks = {};
        
        Stores[name] = this;
    }
    
    static dispatch(type: string, ...args: any[]): void {
        for (var key in Stores) {
            if (Stores.hasOwnProperty(key)) {
                Stores[key].handle(type, args);
            }
        }
    }
    
    static createStore<TState>(name: string, store: StoreCreatorOptions<TState>): Store<TState> {
        let s = new Store<TState>(name);
        Object.assign(s.state, store.state || {});
        Object.assign(s, store.actions || {});
        return s;
    }
    
    emitChange(): void {
        for (let i in this.callbacks) {
            if (this.callbacks.hasOwnProperty(i)) {
                this.callbacks[i](this.state);
            }
        }
    }

    getState(): TState {
        return this.state;
    }

    handle(type: string, args: any[]): void {
        if (type in this) {
            this[type].apply(this, args);
        }
    }
    
    listen(callback: StoreCallback): number {
        let id = this.callbackId++;
        this.callbacks[id] = callback;
        return id;
    }

    mute(id: number): void {
        delete this.callbacks[id];
    }

    // HACK.PI: this is needed for the handle function
    [name: string]: any;
}

const createStore: StoreCreator = Store.createStore;
const dispatch: Dispatch = Store.dispatch;

export { createStore, dispatch }

declare global {
    interface Window {
        Rigby: any;
    }
}

window.Rigby = Store;
