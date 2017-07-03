
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

export class StoreStatic {

    static dispatch: Dispatch;

    static createStore: StoreCreator;

}

export default class Store<TState> extends StoreStatic {

    constructor(name: string);

    emitChange(): void;

    getState(): TState;

    handle(type: string, args: any[]): void;

    listen(callback: StoreCallback): number;

    mute(id: number): void;

}

export const createStore: StoreCreator;

export const dispatch: Dispatch;
