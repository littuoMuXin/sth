declare namespace Hje {
    /**
     * The children context of component.
     */
    class ComponentChildren {
        private __innerStore;
        /**
         * Initializes a new instance of the ComponentChildren class.
         * @param element The element reference.
         * @param engine The render engine.
         * @param lifecycle The lifecycle handlers of the component.
         * @param key The key of the current component.
         * @param keyed The store for managing component by key.
         * @param callback The handler which occurs when the children context is initialized.
         */
        constructor(element: any, engine: IComponentRenderEngine, key?: string | null, options?: IComponentRenderingOptions, callback?: (init: (component: BaseComponent, dispose: () => void) => null | (() => void)) => void);
        /**
         * Gets the reference of parent element.
         */
        get parent(): any;
        /**
         * Gets all keys.
         */
        get keys(): string[];
        /**
         * Gets the length of children.
         */
        get length(): number;
        /**
         * Gets a specific child item.
         * @param index The index or key of the child item.
         */
        get(index: number | string): BaseComponent | undefined;
        /**
         * Gets the index of the given child item.
         * @param child The item to test.
         * @returns The index; or -1, if non-exists.
         */
        indexOf(child: BaseComponent): number;
        /**
         * Gets the indexof the last occurrence of  of the given child item.
         * @param child The item to test.
         * @returns The index; or -1, if non-exists.
         */
        lastIndexOf(child: BaseComponent): number;
        /**
         * Checks if has the index or contains the child context key.
         * @param key The index of child, or the key of child declared in description.
         */
        contain(key: number | string | BaseComponent): boolean;
        /**
         * Gets or sets the children to text content.
         * @param text Optional. The text content to set. Skip to get only.
         * @returns The new text content; or null, if its child is not a text node.
         */
        text(text?: string | number | null): string | undefined;
        /**
         * Sets the child items.
         * @param models The models to set.
         * @returns The count of items added.
         */
        set(models: (DescriptionContract | null | undefined)[] | null | string | number): number | undefined;
        /**
         * Sets the child items.
         * @param models The models to set.
         * @returns The count of items added.
         */
        setRange(...models: DescriptionContract[]): number | undefined;
        /**
         * Appends the child items.
         * @param models The models to append.
         * @returns The count of items added.
         */
        append(...models: (DescriptionContract | undefined)[]): number;
        /**
         * Inserts the child items at the specific position.
         * @param index The index to insert.
         * @param models The models to insert.
         * @returns The count of items inserted.
         */
        insert(index: number, ...models: DescriptionContract[]): number | undefined;
        /**
         * Remove a specific child item.
         * @param index The index of child.
         * @returns true if the item has removed; otherwise, false. Not exists also returns false.
         */
        remove(index: number | BaseComponent): boolean;
        /**
         * Replaces an existed child item by given one.
         * @param index The index of child.
         * @param model The description model of new item.
         * @returns The component; or undefined, if the index is out of range.
         */
        replace(index: number, model: DescriptionContract): BaseComponent | undefined;
        /**
         * Updates a specific child item by given patch.
         * @param index The index or key of child.
         * @param patch The patch data.
         * @returns true if update successfully; otherwise, false. Not exists also returns false.
         */
        update(index: number | string, patch: {
            props?: IDeltaObject;
            children?: DescriptionContract["children"];
            style?: DescriptionContract["style"];
            className?: IClassNameSetValue;
            data?: IDeltaObject;
            appendChildren?: boolean | number;
            overrideStyle?: boolean;
        }): boolean;
        /**
         * Clears all child items.
         */
        clear(): void;
        /**
         * Gets all child components.
         * @returns
         */
        items(): BaseComponent[];
    }
    /**
     * The store for managing components by key.
     */
    class ComponentKeyedStore {
        private __innerStore;
        /**
         * Gets the component by key.
         * @param key The key of component.
         * @returns The component instance; or undefined if not exists.
         */
        get(key: string): BaseComponent | undefined;
        /**
         * Sets the component by a specific key.
         * @param key The key of component.
         * @param value The component instance.
         */
        set(key: string | DescriptionContract, value: BaseComponent): void;
        /**
         * Clears the mapping of key and components.
         * Any component instance stored in the keyed store will not be cleared by this method; but will be removed from the store.
         */
        reset(): void;
    }
    class ComponentDataUpdateInfo<T = Record<string, any>> {
        private __innerStore;
        constructor(delta: Partial<T>, old: T);
        get delta(): Partial<T>;
        get<P extends keyof T>(key: P): T[P];
        typeOf<P extends keyof T>(key: P): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
        oldValue<P extends keyof T>(key: P): T[P];
        info(key: string, value?: any): any;
    }
}
declare namespace Hje {
    /**
     * The data handler result.
     */
    interface DataHanlderResult {
        /**
         * The key of data.
         */
        key: string;
        /**
         * A value indicating whether the property of data exists and is the type of function.
         */
        handler: boolean;
        /**
         * The result of the function.
         */
        result?: any;
    }
    /**
     * The base component.
     */
    export class BaseComponent {
        private __innerStore;
        /**
         * Initializes a new instance of the BaseComponent class.
         * @param args The intialization arguments.
         */
        constructor(args: Object);
        /**
         * Gets the accessor of children.
         */
        protected get childrenAccess(): ComponentChildren;
        /**
         * Gets the original tag name set.
         */
        get originalTagName(): string | undefined;
        /**
         * Gets the reference of element.
         */
        get element(): any;
        /**
         * Accesses the additional information.
         */
        get info(): {
            get(key: string): any;
            set(key: string, value: any): void;
            remove(key: string | string[]): void;
            contain(key: string): boolean | "";
            keys(): string[];
        };
        /**
         * Gets the count of child items.
         */
        get childrenCount(): number;
        /**
         * Gets the count of child items.
         */
        get childrenKeys(): string[];
        /**
         * Adds a disposable instance to maintain.
         * @param items  The disposable instance to add.
         */
        pushDisposable(...items: DisposableContract[]): number;
        /**
         * Removes a specific disposable instance.
         * @param items  The disposable instance to remove.
         */
        removeDisposable(...items: DisposableContract[]): number;
        /**
         * Checks whether the element is still in the document.
         */
        alive(): any;
        /**
         * Gets a specific child item.
         * @param index The index or key of the child item.
         * @returns The child item component; or undefined, if does not exist.
         */
        getChild(index: number | string): BaseComponent | undefined;
        /**
         * Gets the specific child item if it is an element component.
         * @param index The index or key of the child item.
         * @returns The child item element component; or undefined, if does not exist, or it is not an element component.
         */
        getChildAsElementComponent(index: number | string): ElementComponent | undefined;
        /**
         * Checks if has the index or contains the child context key.
         * @param key The index of child, or the key of child declared in description.
         */
        containChild(key: number | string | BaseComponent | ComponentChildren): boolean;
        /**
         * Checks if the specific component is the parent of the current component.
         * @param component The component to test.
         * @returns true if the specific component is the parent of the current component; otherwise, false.
         */
        isParent(component: BaseComponent | ComponentChildren): boolean;
        /**
         * Gets or sets the property of the element.
         * @param key The property key.
         * @param value The value of property; or undefined, if remove the property.
         * @returns The value of the property; or undefined, if does not exist.
         */
        prop(key: string, value?: any): any;
        /**
         * Sets properties batch with delta object.
         * @param obj The new properties object, or the function to set properties.
         * @param remove true if remove all rest properties out of the given; false if keep rest; a string array if remove the specific property keys.
         */
        patchProps(obj: IDeltaObject, remove?: boolean | string[]): void;
        /**
         * Gets or sets the class name list of the style.
         * @param value Optional. To get only if no such parameter. The new class name list of the style, if set.
         * @returns The class name list of the style.
         */
        className(value?: IClassNameSetValue): string[];
        /**
         * Gets or sets the inline style.
         * @param value The style object.
         * @returns The inline style.
         */
        style(value?: Partial<CSSStyleDeclaration>): Partial<CSSStyleDeclaration>;
        /**
         * Patches the inline style.
         * @returns The inline style.
         */
        patchStyle(value: Partial<CSSStyleDeclaration>): void;
        /**
         * Adds an event listener.
         * @param event The event key.
         * @param handler The event handler.
         */
        on(event: string, handler: IComponentEventHandler): DisposableContract;
        /**
         * Removes an event listener.
         * @param event The event key.
         * @param handler The event handler.
         */
        off(event: string, handler: IComponentEventHandler): void;
        /**
         * Removes all event listeners.
         */
        protected offAll(): void;
        /**
         * Gets data.
         * @param key The property key of data.
         * @returns The data.
         */
        protected getData(key?: string): any;
        /**
         * Sets data batch with delta object.
         * @param obj The new properties object, or the function to set properties.
         * @param remove true if remove all rest properties out of the given; false if keep rest; a string array if remove the specific property keys.
         */
        protected setDataByDelta(obj: any): void;
        protected dataObservable(key: string, subKey?: string): ObservableCompatibleContract;
        /**
         * Occurs when the component is unloaded.
         */
        protected onUnload(): void;
    }
    /**
     * The base component with data driven.
     */
    export class DataComponent<TData extends Record<string, any> = Record<string, any>, TInternal extends Record<string, any> = Record<string, any>> extends BaseComponent {
        private __innerStore2;
        /**
         * Initializes a new instance of the BaseComponent class.
         * @param args The intialization arguments.
         */
        constructor(args: Object);
        /**
         * Gets the internal context.
         */
        protected get internal(): TInternal;
        /**
         * Gets the data copied.
         * @param key The property key of data.
         * @returns The value of the data property; or undefined, if does not exist.
         */
        data(): TData;
        /**
         * Gets the data property bound.
         * @param key The property key of data.
         * @returns The value of the data property; or undefined, if does not exist.
         */
        data<P extends keyof TData>(key: P): TData[P];
        /**
         * Gets the data copied with the specific properties.
         * @param key The property keys of data.
         * @returns All the value of the data property in the object.
         */
        data<P extends keyof TData>(key: P[]): Record<P, TData[P]>;
        /**
         * Sets the data property bound.
         * @param key The property key of data.
         * @param value The value of data property; or undefined, if remove the property.
         * @returns The value of the data property; or undefined, if does not exist.
         */
        data<P extends keyof TData>(key: P, value: any): TData[P];
        patchData(obj: IDeltaObject<TData>): void;
        patchData(obj: IDeltaObject<TData>, remove: boolean): void;
        patchData<P extends keyof TData>(obj: IDeltaObject<TData>, remove: P[]): void;
        /**
         * Calls the method which is the specific property in data, substituting another object for the current object.
         * @param key The property key of data.
         * @param thisArg The object to be used as the current object.
         * @param argArray A list of arguments to be passed to the method.
         * @returns The result of the method; or undefined, if no such method, or the result is undefined.
         */
        callDataHandler<P extends keyof TData>(key: P, thisArg: any, ...argArray: any[]): DataHanlderResult;
        /**
         * Calls the function which is the specific property in data, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
         * @param key The property key of data.
         * @param thisArg The object to be used as the this object.
         * @param argArray A set of arguments to be passed to the function.
         * @returns The result of the function; or undefined, if no such function, or the result is undefined.
         */
        applyDataHandler<P extends keyof TData>(key: P, thisArg: any, argArray?: any): DataHanlderResult;
        /**
         * Occurs when the data changes.
         * @param delta The changed and current data.
         */
        protected onDataChange(info: ComponentDataUpdateInfo<TData>): void;
        /**
         * Occurs when initialize to access the internal context object.
         * @returns The object created for internal context.
         */
        protected onInitInternal(): TInternal;
    }
    /**
     * Creates a component instance with the given element and description model.
     * @param element The element reference.
     * @param model The description model.
     * @param engine The render engine.
     * @param keyed The keyed component record to store the created component with key.
     * @returns The component instance created; or undefined if fails.
     */
    export function render(element: any, model: DescriptionContract, engine?: IComponentRenderEngine, options?: IComponentRenderingOptions): BaseComponent | undefined;
    export {};
}
declare namespace Hje {
    /**
     * Internal injection pool.
     */
    const InternalInjectionPool: {
        /**
         * Gets or sets the HitTask class from DataSense library.
         * @param value The HitTask class.
         */
        hittask(value?: any): any;
    };
    function errorDisposable(message?: string): {
        error: boolean;
        message: string | undefined;
        dispose(): void;
    };
    /**
     * A container for store and manage a number of disposable object.
     * @param items  The objects to add.
     */
    class DisposableArray {
        private _list;
        /**
         * Adds disposable objects so that they will be disposed when this instance is disposed.
         * @param items  The objects to add.
         */
        push(...items: DisposableContract[]): number;
        /**
         * Adds disposable objects so that they will be disposed when this instance is disposed.
         * @param items  The objects to add.
         */
        pushDisposable(...items: DisposableContract[]): number;
        /**
         * Removes the ones added here.
         * @param items  The objects to remove.
         */
        remove(...items: DisposableContract[]): number;
        /**
         * Removes the ones added here.
         * @param items  The objects to remove.
         */
        removeDisposable(...items: DisposableContract[]): number;
        /**
         * Gets the count.
         */
        count(): number;
        /**
         * Disposes the instance.
         */
        dispose(): void;
    }
}
declare namespace Hje {
    /**
     * The component for element.
     */
    class ElementComponent extends DataComponent<Record<string, any>> {
        /**
         * Initializes a new instance of the ElementComponent class.
         * @param args The intialization arguments.
         */
        constructor(args: Object);
        /**
         * Gets or sets the children to text content.
         * @param text Optional. The text content to set. Skip to get only.
         * @returns The new text content; or null, if its child is not a text node.
         */
        text(text?: string | number | null): string | undefined;
        /**
         * Sets the child items.
         * @param models The models or text to set.
         * @returns The count of items added.
         */
        setChildren(models: DescriptionContract[] | null | string | number): void;
        /**
         * Sets the child items.
         * @param model The model to set.
         * @returns The count of items added.
         */
        setChildItems(...model: DescriptionContract[]): void;
        /**
         * Appends the child items.
         * @param models The models to append.
         * @returns The count of items added.
         */
        appendChild(...models: DescriptionContract[]): number;
        /**
         * Inserts the child items at the specific position.
         * @param index The index to insert.
         * @param models The models to insert.
         * @returns The count of items inserted.
         */
        insertChild(index: number, ...models: DescriptionContract[]): number | undefined;
        /**
         * Remove a specific child item.
         * @param key The index of child.
         * @returns true if the item has removed; otherwise, false. Not exists also returns false.
         */
        removeChild(key: number): boolean;
        /**
         * Replaces an existed child item by given one.
         * @param index The index of child.
         * @param model The description model of new item.
         * @returns The component; or undefined, if the index is out of range.
         */
        replaceChild(index: number, model: DescriptionContract): BaseComponent | undefined;
        /**
         * Updates a specific child item by given patch.
         * @param index The index or key of child.
         * @param patch The patch data.
         * @returns true if update successfully; otherwise, false. Not exists also returns false.
         */
        updateChild(index: number | string, patch: {
            props?: IDeltaObject;
            children?: DescriptionContract["children"];
            style?: DescriptionContract["style"];
            className?: IClassNameSetValue;
            data?: IDeltaObject;
            appendChildren?: boolean | number;
            overrideStyle?: boolean;
        }): boolean;
        /**
         * Clears all child items.
         */
        clearChildren(): void;
        /**
         * Performs the specified action for each element in children.
         * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each component in the children.
         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        forEachChild(callbackfn: (value: BaseComponent, index: number, array: BaseComponent[]) => void, thisArg?: any): void;
    }
}
declare namespace Hje {
    interface IComponentRenderEngine<T = any> {
        alive(target: T): boolean;
        get(element: any): T | undefined;
        text(target: T, text: string): void;
        setChildren(parent: T, child: DescriptionContract[], old: BaseComponent[]): T[];
        append(parent: T, child: DescriptionContract[], old: BaseComponent[]): T[];
        insert(parent: T, index: number, child: DescriptionContract[], old: BaseComponent[]): T[];
        remove(parent: T, index: number, item: BaseComponent): boolean;
        move(parent: T, newIndex: number, oldIndex: number): void;
        props(target: T, set: Record<string, any>): void;
        style(target: T, changes: {
            oldStyle?: Record<string, any>;
            newStyle?: Record<string, any>;
            oldClassName?: string[];
            newClassName?: string[];
        }): void;
        on(target: T, event: string, handler: (ev: any) => void): void;
        off(target: T, event: string, handler: (ev: any) => void): void;
    }
}
declare namespace Hje {
    function regComponent(key: string, type: typeof BaseComponent | undefined | null): void;
    function getComponentType(model: DescriptionContract): typeof BaseComponent;
    function defaultRenderEngine(): IComponentRenderEngine<any>;
    function setDefaultRenderEngine(value: IComponentRenderEngine): void;
}
declare namespace Hje {
    /**
     * Removes an item from an array.
     * @param list The array.
     * @param item The item to remove.
     * @returns The index of item in the array; or -1, if not exists.
     */
    function removeFromArray(list: any[], item: any): number;
    /**
     * Schedules a handler to execute in the next wave of event loop.
     * @param handler The handler to process.
     */
    function nextWave(handler: () => void): void;
    /**
     * Converts a text or string array into the description models.
     * @param line The text or each line.
     * @param arr true if always returns an array; otherwise, false.
     * @returns The description model item or array.
     */
    function toSpan(line: string | number | boolean | Hje.DescriptionContract | (string | number | boolean | Hje.DescriptionContract)[], arr?: boolean): (Hje.DescriptionContract | Hje.DescriptionContract[] | undefined);
    /**
     * Appends an element to a specific parent element.
     * @param parent The parent to append child.
     * @param tag The element tag.
     * @returns The element created to append.
     */
    function appendChild(parent: HTMLElement | null, tag?: string): HTMLElement;
    /**
     * Tests if the specific value is in the array.
     * @param test The value to test.
     * @param arr The array.
     * @returns true if exists; otherwise, false.
     */
    function inArray<T>(test: T, arr: T | T[] | ObservableCompatibleContract<T>): boolean;
    function setClassName(oldClassName: string[], value?: IClassNameSetValue, callback?: (obs: ObservableCompatibleContract<string[] | string | null | undefined>) => void): string[];
    function stringArray(arr: string | number | (string | number)[] | null | undefined): string[] | undefined;
    function observeIfIs<T = any>(value: T | ObservableCompatibleContract<T>, subscription: (newValue: T) => void, thisArg?: any): SubscriberCompatibleResultContract | undefined;
    function mapObservable(obj: Record<string, any>, disposable: DisposableArray, subscribers: Record<string, SubscriberCompatibleResultContract>, callback: (key: string, newValue: any) => void, thisArg?: any): Record<string, any>;
    function subscribeNewValue<T>(obs: ObservableCompatibleContract<T>, callback: (nv: T) => void, thisArg?: any): SubscriberCompatibleResultContract;
    function tryUnsubscribe(subscriber: SubscriberCompatibleResultContract | undefined): void;
    function unwrapObservableProp(container: Record<string, any>, key: string, subKey?: string): any;
    function unwrapObservableObject(data: any, subKey?: string): any;
    /**
     * Generates info store.
     * @returns An instance of info store.
     */
    function genDataInfo(): {
        get(key: string): any;
        set(key: string, value: any): void;
        remove(key: string | string[]): void;
        contain(key: string): boolean | "";
        keys(): string[];
    };
}
declare namespace Hje {
    class HtmlRenderEngine implements IComponentRenderEngine<Element> {
        defaultTagName: string;
        get(element: any): any;
        alive(target: HTMLElement): boolean;
        text(target: HTMLElement, text: string): void;
        setChildren(parent: HTMLElement, child: DescriptionContract[], old: BaseComponent[]): Element[];
        append(parent: HTMLElement, child: DescriptionContract[], old: BaseComponent[]): Element[];
        insert(parent: HTMLElement, index: number, child: DescriptionContract[], old: BaseComponent[]): Element[];
        remove(parent: HTMLElement, index: number, item: BaseComponent): boolean;
        move(parent: HTMLElement, newIndex: number, oldIndex: number): void;
        props(target: Element, set: Record<string, any>): void;
        style(target: HTMLElement, changes: {
            oldStyle?: Record<string, any>;
            newStyle?: Record<string, any>;
            oldClassName?: string[];
            newClassName?: string[];
        }): void;
        on(target: HTMLElement, event: string, handler: (ev: any) => void): void;
        off(target: HTMLElement, event: string, handler: (ev: any) => void): void;
        removeStart(parent: HTMLElement, index: number): ChildNode[];
        createElement(tagName: string, tagNamespace?: string): Element;
        createEmptyElementFromDescription(item: DescriptionContract, parent?: HTMLElement): Element | undefined;
    }
    /**
     * Converts an HTML element to a description model.
     * @param element The element to parse.
     * @returns The description model.
     */
    function from(element: Element | string): {
        tagName: Hje.DescriptionContract["tagName"];
        props: Record<string, any>;
        className: Hje.DescriptionContract["className"];
        data?: Hje.DescriptionContract["data"];
        children?: Hje.DescriptionContract["children"];
    } | undefined;
}
declare namespace Hje {
    type EventHandlerContract<T> = (ev: T) => void;
    type ChangeActionContract = "add" | "remove" | "update" | "delta" | "none" | "invalid" | "unknown";
    type IDeltaObject<T = Record<string, any>> = Partial<T> | {
        key: keyof T;
        value: any;
        skip?: boolean;
    }[] | ((old: T) => T | undefined);
    type IClassNameSetValue = string | string[] | null | {
        add?: string | string[] | null;
        remove?: string | string[] | boolean | null;
        disable?: boolean;
    } | ObservableCompatibleContract<string[] | string | null | undefined>;
    /**
     * The options on rendering.
     */
    interface IComponentRenderingOptions {
        /**
         * Occurs on initialization.
         * @param component  The component.
         */
        oninit?(component: BaseComponent): void;
        /**
         * Occurs on load completed.
         * @param context  The context.
         */
        onload?(component: BaseComponent): void;
        /**
         * Occurs on load completed.
         * @param context  The context.
         */
        onunload?(): void;
        /**
         * Gets or sets the property.
         */
        [property: string]: any;
    }
    interface IComponentEventHandlerInstance {
        process(ev: any, options: {
            key: string;
            occur: Date;
            info: any;
            context: BaseComponent;
            off(): void;
        }): void;
        disable?: boolean;
        thisArg: any;
        delay?: boolean | number;
        info?: any;
        [property: string]: any;
    }
    type IComponentEventHandler = ((ev: any) => void) | IComponentEventHandlerInstance | null;
    /**
     * The view description model.
     */
    interface DescriptionContract {
        /**
         * The preferred tag name.
         */
        tagName?: string;
        /**
         * The key.
         */
        key?: string;
        /**
         * The component type to initialize this instance.
         */
        component?: typeof BaseComponent;
        /**
         * The class name of style.
         */
        className?: string[] | string | ObservableCompatibleContract<string[] | string | null | undefined>;
        /**
         * Inline style.
         */
        style?: any;
        /**
         * Properties (attributes).
         */
        props?: {
            [property: string]: string | any;
        };
        /**
         * The events.
         */
        on?: {
            [property: string]: IComponentEventHandler;
        };
        /**
         * Child models.
         */
        children?: DescriptionContract[] | string | number | null;
        /**
         * Data bound.
         */
        data?: any;
        /**
         * The lifecycle of the component.
         */
        lifecycle?: {
            /**
             * Occurs on initialization.
             * @param context  The context.
             */
            init?(context: BaseComponent): void;
            /**
             * Occurs on load completed.
             * @param context  The context.
             */
            load?(context: BaseComponent): void;
            /**
             * Occurs on the element is removed.
             * @param context  The context.
             */
            unload?(): void;
        };
    }
}
declare namespace Hje {
    type IListComponentItemGenerator<T> = (model: T) => DescriptionContract | undefined;
    export interface IListComponentData<T = any> {
        source?: T[];
        item?: IListComponentItemGenerator<T>;
    }
    interface IListComponentInternal<T> {
        source: {
            model: T;
            info?: any;
        }[];
    }
    /**
     * The list component.
     */
    export class ListComponent<T = any> extends DataComponent<IListComponentData<T>, IListComponentInternal<T>> {
        /**
         * Initializes a new instance of the ListComponent class.
         * @param args The intialization arguments.
         */
        constructor(args: Object);
        /**
         * Gets the index of the given child item model.
         * @param model The item model to test.
         * @returns The index; or -1, if does not exist.
         */
        indexOf(model: T | BaseComponent): number;
        /**
         * Gets the index of the last occurrence of of the given child item model.
         * @param model The item model to test.
         * @returns The index; or -1, if does not exist.
         */
        lastIndexOf(model: T | BaseComponent): number;
        /**
         * Appends new model items to the end of the content list.
         * @param items New items to add.
         */
        push(...items: T[]): void;
        /**
         * Removes a specific item.
         * @param model The item to remove.
         * @returns A value indicating whether remove succeeded; or false, if does not exist.
         */
        remove(model: T | BaseComponent): boolean;
        /**
         * Removes an item by given index.
         * @param index The index of item to remove.
         * @returns A value indicating whether remove succeeded; or false, if does not exist.
         */
        removeAt(index: number): boolean;
        toDescription(model: T): DescriptionContract | undefined;
        forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
        /**
         * Gets the item model of the specific index.
         * @param index The index to get model.
         * @returns The model item; or undefined, if the index is out of range.
         */
        get(index: number): T | undefined;
        first(): T | undefined;
        last(): T | undefined;
        protected onDataChange(info: ComponentDataUpdateInfo<IListComponentData<T>>): void;
        protected onInitInternal(): {
            source: never[];
        };
    }
    export {};
}
declare namespace Hje {
    /**
     * Gets the module name.
     * @returns The name of module.
     */
    function name(): string;
}
declare namespace Hje {
    /**
     * The relative path info.
     */
    class RelativePathInfo {
        private _info;
        /**
         * Initializes a new instance of the RelativePathInfo class.
         * @param path The current path.
         */
        constructor(path: string);
        /**
         * Gets the relative path.
         */
        get value(): string;
        /**
         * Gets the query and hash string in the path, including the mark.
         */
        get queryAndHash(): string;
        /**
         * Gets the path started from the directory marked.
         */
        get childPath(): string;
        /**
         * Gets the post generator of target to describe the path.
         */
        get parentLevel(): number;
        /**
         * Gets a value indicating whether current path is absolute.
         */
        get isAbsolute(): string | boolean;
        /**
         * Gets an array about the path.
         * @param onlyChildPathName true if only return the path name without upper information; otherwise, false.
         * @returns An array of each directory name in the path.
         */
        toPathArray(onlyChildPathName?: boolean): string[];
        /**
         * Creates a specific relative path info.
         * @param path The path relatived with this one.
         * @returns A new relative path info of the specific.
         */
        relative(path: string | RelativePathInfo | null | undefined): RelativePathInfo;
        /**
         * Converts to a string.
         * @returns A string about this path.
         */
        toString(): string;
        /**
         * Converts to a JSON.
         * @returns A JSON converted.
         */
        toJSON(): string;
    }
    /**
     * Gets a specific cookie value.
     * @param key The cookie key.
     * @returns The value of cookie; or empty string, if not found.
     */
    function getCookie(key: string): string;
    /**
     * Gets the location search (query) in an array.
     * @returns The key-value pair of query in an array.
     */
    function queryArray(): (string | {
        key: string;
        value: string;
    })[];
    /**
     * Gets the specific query value.
     * @param name The query name.
     * @param options Additional options to control resolving.
     * @returns The value of the query.
     */
    function getQuery(name: string, options?: {
        notToDecode?: boolean;
        fallback?: string | null | undefined;
    }): string | null | undefined;
    /**
     * Gets the value with a specific key from a key-value pairs.
     * @param arr The key-value pairs.
     * @param key The key.
     * @returns The value.
     */
    function getValueFromKeyedArray(arr: (string | {
        key: string;
        value: string;
    })[], key: string): string | undefined;
}
declare namespace Hje {
    /**
     * Disposable instance.
     */
    interface DisposableContract {
        /**
         * Disposes the instance.
         */
        dispose(): void;
    }
    /**
     * The subscriber.
     */
    type SubscriberCompatibleResultContract = DisposableContract & (() => void);
    /**
     * The subscriber.
     */
    type SubscriberResultContract = DisposableContract | (() => void) | SubscriberCompatibleResultContract;
    /**
     * The additional information which will pass to the event handler argument.
     */
    interface FireInfoContract {
        /**
         * An additional message.
         */
        message?: string;
        /**
         * Sender source string.
         */
        source?: string;
        /**
         * The additional data.
         */
        addition?: any;
    }
    /**
     * The changed information.
     */
    interface ChangedInfoContract<T> {
        /**
         * The property key; or null or undefined for the object itself.
         */
        key?: string;
        /**
         * The change state.
         */
        action: ChangeActionContract;
        /**
         * The current value changed.
         */
        value: T;
        /**
         * The old value before changing.
         */
        oldValue: T;
        /**
         * A value request to change. This value might be changed to set.
         */
        valueRequested: T;
        /**
         * true if change succeeded; or false if failed; or undefined if it is still pending to change.
         */
        success: boolean | undefined;
        /**
         * The error information.
         */
        error?: any;
    }
    /**
     * The observable for data value.
     */
    interface ObservableCompatibleContract<T = any> {
        /**
         * Gets the value.
         */
        get?(): T;
        /**
         * Registers an event listener on the value has been changed.
         * @param h  The handler or handlers of the event listener.
         * @param thisArg  this arg.
         * @param options  The event listener options.
         * @param disposableArray  An additional disposable array instance for push current event handler.
         */
        onChanged?(h: EventHandlerContract<ChangedInfoContract<T>>, thisArg?: any, options?: any): DisposableContract;
        /**
         * Subscribes for what the value has been changed.
         * @param h  The callback.
         * @param thisArg  this arg.
         */
        subscribe?(h: (newValue: T) => void, thisArg?: any): SubscriberCompatibleResultContract;
        /**
         * Sets value.
         * @param value  The value of the property to set.
         * @param message  A message for the setting event.
         */
        set?(value: T, message?: FireInfoContract | string): boolean;
        /**
         * Sets value.
         * @param value  The value of the property to set.
         * @param message  A message for the setting event.
         */
        next?(value: T): void;
    }
    /**
      * Gesture handlers options.
      */
    interface GestureActionOptionsContract {
        /**
          * The mininum horizontal value to active related gesture handlers.
          */
        minX?: number | ObservableCompatibleContract<number>;
        /**
          * The mininum vertical value to active related gesture handlers.
          */
        minY?: number | ObservableCompatibleContract<number>;
        /**
          * The handler rasied on turning up. The element and distance will be provided.
          */
        turnUp?: Action2<HTMLElement | Window | Document, number>;
        /**
          * The handler rasied on turning right. The element and distance will be provided.
          */
        turnRight?: Action2<HTMLElement | Window | Document, number>;
        /**
          * The handler rasied on turning down. The element and distance will be provided.
          */
        turnDown?: Action2<HTMLElement | Window | Document, number>;
        /**
          * The handler rasied on turning left. The element and distance will be provided.
          */
        turnLeft?: Action2<HTMLElement | Window | Document, number>;
        /**
          * The handler rasied before moving. The element will be provided.
          */
        moveStart?: Action1<HTMLElement | Window | Document>;
        /**
          * The handler rasied after moving. The element and distance will be provided.
          */
        moveEnd?: Action2<HTMLElement | Window | Document, PlaneCoordinate>;
        /**
          * The handler rasied on moving. The element and distance will be provided.
          */
        moving?: Action2<HTMLElement | Window | Document, PlaneCoordinate>;
    }
    /**
      * 2D coordinate.
      */
    interface PlaneCoordinate {
        /**
          * X for horizontal.
          */
        x: number;
        /**
          * Y for vertical.
          */
        y: number;
    }
    /**
      * 3D coordinate.
      */
    interface StereoscopicCoordinate extends PlaneCoordinate {
        /**
          * Z for height.
          */
        z: number;
    }
    /**
      * Action without parameter.
      */
    interface Action {
        (): void;
    }
    /**
      * Action with a parameter.
      */
    interface Action1<T> {
        (arg: T): void;
    }
    /**
      * Action with 2 parameters.
      */
    interface Action2<T1, T2> {
        (arg1: T1, arg2: T2): void;
    }
    /**
      * Action with 3 parameters.
      */
    interface Action3<T1, T2, T3> {
        (arg1: T1, arg2: T2, arg3: T3): void;
    }
    /**
      * Action with 4 parameters.
      */
    interface Action4<T1, T2, T3, T4> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4): void;
    }
    /**
      * Action with 5 parameters.
      */
    interface Action5<T1, T2, T3, T4, T5> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): void;
    }
    /**
      * Action with 6 parameters.
      */
    interface Action6<T1, T2, T3, T4, T5, T6> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6): void;
    }
    /**
      * Action with 7 parameters.
      */
    interface Action7<T1, T2, T3, T4, T5, T6, T7> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7): void;
    }
    /**
      * Action with 8 parameters.
      */
    interface Action8<T1, T2, T3, T4, T5, T6, T7, T8> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8): void;
    }
    /**
      * Function without parameter.
      */
    interface Func<T> {
        (): T;
    }
    /**
      * Function with a parameter.
      */
    interface Func1<T, TResult> {
        (arg: T): TResult;
    }
    /**
      * Function with 2 parameters.
      */
    interface Func2<T1, T2, TResult> {
        (arg1: T1, arg2: T2): TResult;
    }
    /**
      * Function with 3 parameters.
      */
    interface Func3<T1, T2, T3, TResult> {
        (arg1: T1, arg2: T2, arg3: T3): TResult;
    }
    /**
      * Function with 4 parameters.
      */
    interface Func4<T1, T2, T3, T4, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4): TResult;
    }
    /**
      * Function with 5 parameters.
      */
    interface Func5<T1, T2, T3, T4, T5, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): TResult;
    }
    /**
      * Function with 6 parameters.
      */
    interface Func6<T1, T2, T3, T4, T5, T6, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6): TResult;
    }
    /**
      * Function with 7 parameters.
      */
    interface Func7<T1, T2, T3, T4, T5, T6, T7, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7): TResult;
    }
    /**
      * Function with 8 parameters.
      */
    interface Func8<T1, T2, T3, T4, T5, T6, T7, T8, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8): TResult;
    }
}
