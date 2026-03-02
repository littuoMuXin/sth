declare class Chart {
    constructor(element: HTMLElement, options: {
        type: string;
        data: any;
        options?: any;
        [property: string]: any;
    });
}