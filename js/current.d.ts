declare namespace PageCtrl {
    function appendDecadeCalendar(arr: IArticleRenderExtension, article: DeepX.MdBlogs.ArticleInfo): void;
}
declare namespace PageCtrl {
    function initHome(): void;
    function initBlog(): void;
}
declare namespace PageCtrl {
    interface IArticleRenderExtension {
        end: Hje.DescriptionContract[];
    }
}
declare namespace PageCtrl {
    const en: {
        name: string;
    };
    export function getLocaleString(key: keyof typeof en, options?: {
        mkt?: string | boolean;
    }): any;
    export {};
}
declare namespace PageCtrl {
    interface IAmountData {
        total: number;
        yoy?: number;
        fields?: Record<string, number>;
        "fields-yoy"?: Record<string, number>;
    }
    interface IAmountItem {
        revenue: IAmountData;
        profit: IAmountData;
        cost?: IAmountData;
    }
    interface IAccumulativeSet {
        year: number;
        total?: IAmountItem;
        items?: IAmountItem[];
    }
    class StatComponent extends Hje.BaseComponent {
        constructor(element: any, options: Hje.ComponentOptionsContract);
    }
    function totals(data: IAccumulativeSet[], mode?: "accumulative"): (IAmountItem & {
        year: number;
    })[];
    function initStat(element: string | HTMLElement): Promise<void>;
}
declare namespace PageCtrl {
    interface INumberScope {
        top: number;
        bottom: number;
        step: number;
    }
    interface ISize {
        width: number;
        height: number;
    }
    function scope(data: number[], count?: number): INumberScope;
    function standard(data: number[], height: number): {
        scope: INumberScope;
        list: number[];
    };
    function lineChart(data: number[], size: ISize): {
        children: {
            tagName: string;
            props: {
                xmlns: string;
                viewBox: string;
                width: string;
                height: string;
            };
            children: Hje.DescriptionContract[];
        }[];
    };
}
declare namespace PageCtrl {
    function updateMenuText(): void;
}
