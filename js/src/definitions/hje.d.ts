declare namespace Hje {
    /**
     * The base component that you can extend customized business logic
     * by a) updating constructor to set new model and refreshing;
     * b) adding methods to update specific child model and refreshing.
     */
    class BaseComponent {
        private readonly _inner;
        private _context;
        /**
         * Initializes a new instance of the BaseComponent class.
         * @param element The element.
         * @param options The options.
         */
        constructor(element: any, options?: ComponentOptionsContract<any>);
        /**
         * Gets the generating context of the current instance.
         */
        protected get currentContext(): ViewGeneratingContextContract<any>;
        /**
         * Gets the view model of the current instance.
         */
        protected get currentModel(): DescriptionContract;
        /**
         * Sets the view model of the current instance.
         * @param value The view model.
         */
        protected set currentModel(value: DescriptionContract);
        /**
         * Gets the generating context of a specific child.
         * @param key The child key.
         */
        protected childContext(key: string): ViewGeneratingContextContract<any>;
        /**
         * Gets the control of a specific child.
         * @param key The child key.
         */
        protected childControl<T extends BaseComponent = BaseComponent>(key: string): T;
        /**
         * Gets or sets the view model of the current instance.
         * @param key The child key.
         * @param value The optional view model to override by setting its properties. The original reference will not replace but keep.
         * @param clearOriginal true if clear all properties of the original view model before set; otherwise, false.
         */
        protected childModel(key: string, value?: DescriptionContract, clearOriginal?: boolean): DescriptionContract;
        /**
         * Gets a disposable array attached in this component
         * which will dispose automatically when the component is disposed.
         */
        protected get disposableStore(): DisposableArray;
        /**
         * Gets the data bound in this component.
         */
        protected get data(): any;
        /**
         * Refreshes a specific child by key.
         * @param key The child key; or null for updating the current component.
         * @param handler An optional handler to process before refreshing.
         */
        protected refreshChild(key?: string | boolean, handler?: ((context: ViewGeneratingContextContract<any>) => void) | boolean): void;
        /**
         * Gets or sets the child property.
         * @param childKey The child key; or null for the current component.
         * @param propKey The property key.
         * @param v An opitonal value to set.
         */
        protected childProps(childKey: string, propKey: string | number | string[] | any, v?: any): any;
        /**
         * Gets the data of model.
         * @param childKey The child key; or null for the current component.
         * @returns The data in the specific model.
         */
        protected childModelData(childKey: string): any;
        /**
         * Gets or sets the style information of the specific child.
         * @param childKey The child key; or null for the current component.
         * @param style The inner style object.
         * @param styleRefs The style class reference name list.
         */
        protected childStyle(childKey: string, style?: any, styleRefs?: string[] | string | boolean | {
            subscribe(h: any): any;
            [property: string]: any;
        }): {
            inline: any;
            refs: string[] | undefined;
        };
        /**
         * Sets the style references of the specific child.
         * @param childKey The child key; or null for the current component.
         * @param value The style class reference name list.
         */
        protected childStyleRefs(childKey: string, value: string[]): {
            inline: any;
            refs: string[] | undefined;
        };
        /**
         * Gets a value indicating whether the component is disposed.
         */
        get isDisposed(): boolean;
        /**
         * Adds disposable objects so that they will be disposed when this instance is disposed.
         * @param items  The objects to add.
         */
        pushDisposable(...items: DisposableContract[]): number;
        /**
         * Removes the disposable objects added in this instance.
         * @param items  The objects to remove.
         */
        removeDisposable(...items: DisposableContract[]): number;
        /**
         * Appends an element to the end.
         * @param childKey The child key; or null for the current component.
         * @param model The description of model to append.
         * @returns true if append succeeded; otherwise, false.
         */
        appendChild(childKey: string, model: Hje.DescriptionContract): boolean;
        /**
         * Gets or sets a property.
         * @param key The property key.
         * @param value The optional value of the property if need set.
         */
        prop<T = any>(key: string | any, value?: T | any): any;
        /**
         * Adds an event listener.
         * @param key The event key.
         * @param handler The handler of the event to add.
         */
        on(key: string, handler: any): DisposableContract;
        /**
         * Gets or sets the style information.
         * @param value The inner style object.
         * @param refs The style class reference name list.
         */
        style(value?: any, refs?: string[] | string | boolean | {
            subscribe(h: any): any;
            [property: string]: any;
        }): {
            inline: any;
            refs: string[] | undefined;
        };
        /**
         * Sets the style references.
         * @param value The style class reference name list.
         */
        styleRefs(value: string[]): {
            inline: any;
            refs: string[] | undefined;
        };
        /**
         * Tests if the child has the specific class name.
         * @param key The child key.
         * @param test The class name to test.
         * @returns true if has; otherwise, false.
         */
        childHasStyleRef(key: string, test: string): boolean;
        /**
         * Tests if has the specific class name.
         * @param test The class name to test.
         * @returns true if has; otherwise, false.
         */
        hasStyleRef(test: string): boolean;
        /**
         * Gets the raw element.
         */
        element(): any;
        /**
         * Disposeses this instance and remove the element from the tree.
         */
        dispose(): void;
    }
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
     * Converts a text or string array into the description models.
     * @param line The text or each line.
     * @param arr true if always returns an array; otherwise, false.
     * @returns The description model item or array.
     */
    function toSpan(line: string | number | boolean | Hje.DescriptionContract | (string | number | boolean | Hje.DescriptionContract)[], arr?: boolean): (Hje.DescriptionContract | Hje.DescriptionContract[]);
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
    function inArray<T>(test: T, arr: T | T[] | {
        subscribe(h: any): any;
        [property: string]: any;
    }): boolean;
}
declare namespace Hje {
    /**
     * View generator for HTML element.
     */
    class HtmlGenerator implements ViewGeneratorContract<HTMLElement> {
        defaultTagName: string;
        initView(context: ViewGeneratingContextContract<HTMLElement>, tagName: string): HTMLElement;
        alive(element: HTMLElement): boolean;
        unmount(element: HTMLElement): void;
        append(parent: HTMLElement, child: HTMLElement): void;
        setProp(context: ViewGeneratingContextContract<HTMLElement>, key: string, value: any): void;
        getProp(context: ViewGeneratingContextContract<HTMLElement>, key: string): any;
        setStyle(context: ViewGeneratingContextContract<HTMLElement>, style: any, styleRefs: string[]): void;
        getStyle(context: ViewGeneratingContextContract<HTMLElement>): {
            inline: any;
            refs: string[];
            computed(pseudoElt?: string): any;
        };
        setTextValue(context: ViewGeneratingContextContract<HTMLElement>, value: string): void;
        bindProp(context: ViewGeneratingContextContract<HTMLElement>, keys: BindPropKeyInfoContract): void;
        onInit(context: ViewGeneratingContextContract<HTMLElement>): void;
        on(context: ViewGeneratingContextContract<HTMLElement>, key: string, handler: (ev: any) => void): {
            dispose(): void;
        };
    }
    /**
     * Converts an HTML element to a description model.
     * @param element The element to parse.
     * @returns The description model.
     */
    function from(element: Element | string): DescriptionContract;
}
declare namespace Hje {
    type EventHandlerContract<T> = (ev: T) => void;
    type ChangeActionContract = "add" | "remove" | "update" | "delta" | "none" | "invalid" | "unknown";
    /**
     * Disposable instance.
     */
    interface DisposableContract {
        /**
         * Disposes the instance.
         */
        dispose(): void;
    }
    interface SubscriberCompatibleResultContract extends DisposableContract {
        (): void;
        unsubscribe(): void;
    }
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
    interface ObservableCompatibleContract<T = any> extends DisposableContract {
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
declare namespace Hje {
    /**
     * The options on rendering.
     */
    interface RenderingOptions {
        /**
         * true if append a new element to the target; otherwise, false.
         */
        appendMode?: boolean;
        /**
         * Occurs on initialization.
         * @param context  The context.
         */
        onInit?(context: ViewGeneratingContextContract<any>): void;
        /**
         * Occurs on load completed.
         * @param context  The context.
         */
        onLoad?(context: ViewGeneratingContextContract<any>): void;
        /**
         * Gets or sets the property.
         */
        [property: string]: any;
    }
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
         * The control type to initialize.
         */
        control?: typeof BaseComponent;
        /**
         * The class name of style.
         */
        styleRefs?: string[] | string | {
            subscribe(h: any): any;
            [property: string]: any;
        };
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
            [property: string]: ((ev: any) => void) | {
                process(ev: any, context: ViewGeneratingContextContract<any>): void;
                thisArg: any;
                [property: string]: any;
            };
        };
        /**
         * Childrens.
         */
        children?: DescriptionContract[] | string | number;
        /**
         * Data bound.
         */
        data?: any;
        /**
         * Occurs on initialization.
         * @param context  The context.
         */
        onInit?(context: ViewGeneratingContextContract<any>): void;
        /**
         * Occurs on load completed.
         * @param context  The context.
         */
        onLoad?(context: ViewGeneratingContextContract<any>): void;
    }
    /**
     * The view context during rendering.
     */
    interface ViewGeneratingContextContract<T> {
        /**
         * Gets the source element.
         */
        element(): T;
        /**
         * Gets the source description model of view.
         */
        model(): DescriptionContract;
        /**
         * Gets the control created if has.
         */
        control(): BaseComponent | undefined;
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
         * Gets or sets the additional information.
         * @param key  The property key.
         */
        info: {
            /**
             * Gets or sets the additional information.
             * @param key  The property key.
             * @param value  The value of property to set.
             */
            <T = any>(key: string, value?: T): T;
            /**
             * Checks if contains the context information key.
             * @param key  The property key.
             */
            contain(key: string): boolean;
            /**
             * Gets all keys.
             */
            keys(): string[];
        };
        /**
         * Gets the child context by specific key.
         */
        childContext: {
            /**
             * Gets the child context by specific key.
             * @param key  The key of child declared in description.
             */
            (key: string): ViewGeneratingContextContract<T> | undefined;
            /**
             * Checks if contains the child context key.
             * @param key  The key of child declared in description.
             */
            contain(key: string): boolean;
            /**
             * Gets all keys.
             */
            keys(): string[];
            /**
             * Remove a specific child context.
             * @param key  The key of child declared in description.
             */
            remove(key: string | string[]): void;
        };
        /**
         * Gets the model of a specific child by specific key.
         */
        childModel: {
            /**
             * Gets the model of a specific child by specific key.
             * @param key  The key of context cached; or the zero-based index of child.
             */
            (key: string | number): DescriptionContract | undefined;
            /**
             * Gets the prop of a specific child by specific key.
             * @param key  The key of context cached; or the zero-based index of child.
             * @param propKey  The additional property key.
             */
            prop(key: string | number, propKey?: string | undefined | null): any;
            /**
             * Gets the style of a specific child by specific key.
             * @param key  The key of context cached; or the zero-based index of child.
             */
            style(key: string | number): any;
            /**
             * Gets the class name of the style of a specific child by specific key.
             * @param key  The key of context cached; or the zero-based index of child.
             */
            styleRefs(key: string | number): string | string[] | {
                subscribe(h: any): any;
                [property: string]: any;
            } | undefined;
            /**
             * Gets the data of a specific child by specific key.
             * @param key  The key of context cached; or the zero-based index of child.
             */
            data(key: string | number): any;
            /**
             * Gets the children of a specific child by specific key.
             * @param key  The key of context cached; or the zero-based index of child.
             * @param index  The additional zero-base index, if gets the child of the children.
             */
            children(key: string | number): DescriptionContract[] | string | number | undefined;
            /**
             * Gets the children of a specific child by specific key.
             * @param key  The key of context cached; or the zero-based index of child.
             * @param index  The additional zero-base index, if gets the child of the children.
             */
            children(key: string | number, index: number): DescriptionContract | undefined;
        };
        /**
         * Checks whether the element is still in the document.
         */
        alive(): boolean;
        /**
         * Refreshes.
         */
        refresh(): void;
    }
    interface BindPropKeyInfoContract {
        keys(): string[];
        length(): number;
        get(key: string): any;
        reg(key: string, then: ((setter: ((value: any) => boolean)) => void)): void;
        contain(key: string): boolean;
        on(key: string, handler: (ev: any) => void): void;
    }
    /**
     * The view generator.
     */
    interface ViewGeneratorContract<T> {
        /**
         * Gets the default tag name.
         */
        defaultTagName: string;
        /**
         * Creates or initializes a element.
         * @param context  The context.
         * @param tagName  The preferred tag nam.
         */
        initView(context: ViewGeneratingContextContract<T>, tagName: string): T;
        /**
         * Checks whether the element is still in the document.
         * @param element  The element to check.
         */
        alive(element: T): boolean;
        /**
         * Removes a specific element from document and clear its children.
         * @param element  The element to remove.
         */
        unmount(element: T): void;
        /**
         * Appends an element into a container.
         * @param parent  The parent container element.
         * @param child  The element to add.
         */
        append(parent: T, child: T): void;
        /**
         * Sets a property (or an attribute).
         * @param context  The context.
         * @param key  The property (attribute) key.
         * @param value  The value to set.
         */
        setProp(context: ViewGeneratingContextContract<T>, key: string, value: any): void;
        /**
         * Gets a property (or an attribute).
         * @param context  The context.
         * @param key  The property (attribute) key.
         * @param value  The value to set.
         */
        getProp(context: ViewGeneratingContextContract<T>, key: string): any;
        /**
         * Sets the styles.
         * @param context  The context.
         * @param style  The style.
         * @param styleRefs  The class name list of style.
         */
        setStyle(context: ViewGeneratingContextContract<T>, style: any, styleRefs: string[]): void;
        /**
         * Gets the style.
         * @param context  The context.
         */
        getStyle(context: ViewGeneratingContextContract<T>): {
            inline: any;
            refs: string[] | undefined;
        };
        /**
         * Sets the text into element.
         * @param context  The context.
         * @param value  The text value.
         */
        setTextValue(context: ViewGeneratingContextContract<T>, value: string): void;
        /**
         * Processes additional customized logic for attributes (props) to bind.
         * @param context  The context.
         * @param keys  The key will bind.
         */
        bindProp?(context: ViewGeneratingContextContract<T>, keys: BindPropKeyInfoContract): void;
        /**
         * Occurs when the view is initialized.
         * @param context  The context
         */
        onInit(context: ViewGeneratingContextContract<T>): void;
        /**
         * Binds an event handler.
         * @param context  The context.
         * @param key  The event key.
         * @param handler  The event handler to raise.
         */
        on(context: ViewGeneratingContextContract<T>, key: string, handler: (ev: any) => void): DisposableContract;
    }
    /**
     * THe model about the control is creating.
     */
    interface CreatingBagContract<T> {
        /**
         * The element.
         */
        element: T;
        /**
         * The key references.
         */
        keyRefs: any;
        /**
         * A value indicating whether inherit the key references from parent.
         */
        inheritRefs: boolean;
        /**
         * The description model.
         */
        model: DescriptionContract;
        /**
         * The additional information.
         */
        info: any;
        /**
         * The control created if has.
         */
        c: BaseComponent;
        /**
         * Disposes this instance.
         */
        dispose(): void;
    }
    /**
     * The options to initialize a component.
     */
    interface ComponentOptionsContract<T = any> {
        /**
         * The data bound in this component.
         */
        data?: T;
        /**
         * The description models of children.
         */
        children?: DescriptionContract[] | string | number;
        /**
         * Occurs to get the context of view.
         * @param context
         */
        contextRef?(context: ViewGeneratingContextContract<any>): void;
        [property: string]: unknown;
    }
}
declare namespace Hje {
    function viewGenerator<T = any>(h?: ViewGeneratorContract<T>): ViewGeneratorContract<any>;
    /**
     * Gets the children by tag name.
     * @param model The model.
     * @param key The tag name.
     */
    function getChildrenByTagName(model: DescriptionContract, ...key: string[]): any;
    /**
     * Gets the first child by tag name.
     * @param model The model.
     * @param key The tag name.
     */
    function getChildByTagName(model: DescriptionContract, ...key: string[]): any;
    /**
     * Registers the component type with a specific key.
     * @param name The key to reference in factory to the component type. It should be unique.
     * @param component The component type.
     */
    function registerComponentType(name: string, component: typeof BaseComponent): void;
    /**
     * Renders.
     * @param target  The target element to present the view.
     * @param model  The instance of view description.
     * @param options  Additional options.
     */
    function render<T = any>(target: T, model: DescriptionContract, options?: RenderingOptions | "html"): (ViewGeneratingContextContract<T> | undefined);
}
declare namespace Hje {
    interface MemoryJsonSourceContract {
        tagName: string;
        parent?: MemoryJsonSourceContract;
        props: any;
        handlers: any;
        style: any;
        styleRefs: string[];
        children: MemoryJsonSourceContract[];
    }
    /**
     * View generator for mock in memory.
     */
    export class MemoryJsonGenerator implements ViewGeneratorContract<MemoryJsonSourceContract> {
        defaultTagName: string;
        initView(context: ViewGeneratingContextContract<MemoryJsonSourceContract>, tagName: string): MemoryJsonSourceContract;
        alive(element: MemoryJsonSourceContract): boolean;
        unmount(element: MemoryJsonSourceContract): void;
        append(parent: MemoryJsonSourceContract, child: MemoryJsonSourceContract): void;
        setProp(context: ViewGeneratingContextContract<MemoryJsonSourceContract>, key: string, value: any): void;
        getProp(context: ViewGeneratingContextContract<MemoryJsonSourceContract>, key: string): any;
        setStyle(context: ViewGeneratingContextContract<MemoryJsonSourceContract>, style: any, styleRefs: string[]): void;
        getStyle(context: ViewGeneratingContextContract<MemoryJsonSourceContract>): {
            inline: any;
            refs: string[];
            computed(pseudoElt?: string): any;
        };
        setTextValue(context: ViewGeneratingContextContract<MemoryJsonSourceContract>, value: string): void;
        bindProp(context: ViewGeneratingContextContract<MemoryJsonSourceContract>, keys: BindPropKeyInfoContract): void;
        onInit(context: ViewGeneratingContextContract<MemoryJsonSourceContract>): void;
        on(context: ViewGeneratingContextContract<MemoryJsonSourceContract>, key: string, handler: (ev: any) => void): {
            dispose(): void;
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
        relative(path: string | RelativePathInfo): RelativePathInfo;
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
    }): string;
    /**
     * Gets the value with a specific key from a key-value pairs.
     * @param arr The key-value pairs.
     * @param key The key.
     * @returns The value.
     */
    function getValueFromKeyedArray(arr: (string | {
        key: string;
        value: string;
    })[], key: string): string;
}
