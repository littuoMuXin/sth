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
}
declare namespace PageCtrl {
    function updateMenuText(): void;
}
