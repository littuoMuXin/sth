declare namespace DeepX.MdBlogs {
    export const hooks: {
        renderMd: ((element: HTMLElement, md: string) => void);
        fetchList: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>);
    };
    export function showElements(show: string[], hide: string[]): void;
    export function codeElements(element: HTMLElement): HTMLElement[];
    export function generateMenu(params: (ArticleInfo | string)[], options?: IArticleMenuOptions): Hje.DescriptionContract;
    /**
     * Generates the description model of the specific articles.
     * @param articles The URL or promise object to fetch articles.
     * @param filter The handler to filter the articles to display.
     * @param options Additional options.
     * @returns A promise object of description model. It is a `ul` element.
     */
    export function generateMenuPromise(articles: Promise<Articles> | string, filter: "blogs" | "blog" | "docs" | "wiki" | ((articles: Articles) => (ArticleInfo | string)[]), options?: IArticleMenuOptions): Promise<Hje.DescriptionContract>;
    export function generateMenuItem(article: ArticleInfo, level: number, path?: string | ((original: string, article: ArticleInfo) => string), click?: (ev: Event, article: ArticleInfo) => void, options?: ILocalePropOptions): Hje.DescriptionContract;
    export function generateCdnScript(name: string, ver: string, url: string, path: string): {
        tagName: string;
        styleRefs: string;
        children: {
            tagName: string;
            children: ({
                tagName: string;
                styleRefs: string;
                children: string;
            } | {
                tagName: string;
                children: string;
                styleRefs?: undefined;
            })[];
        }[];
    };
    interface IButtonListItem {
        styleRefs?: string[] | string | {
            subscribe(h: any): any;
            [property: string]: any;
        };
        style?: any;
        text?: string;
        url?: string;
        title?: string;
        click?(ev: Event): void;
    }
    export function buttonList(config: {
        styleRefs?: string[] | string | {
            subscribe(h: any): any;
            [property: string]: any;
        };
        style?: any;
        groupStyleRefs?: string[] | string | {
            subscribe(h: any): any;
            [property: string]: any;
        };
        data?: any;
        props?: Record<string, unknown>;
        text?: string;
        item?: boolean | IButtonListItem;
        list?: (IButtonListItem | string | number | boolean)[];
        click?(ev: Event): void;
    }): Hje.DescriptionContract;
    export {};
}
declare namespace DeepX.MdBlogs {
    class Articles {
        private _inner;
        constructor(data: IArticleCollection, options: {
            path?: string | Hje.RelativePathInfo;
            fetch?: (url: Hje.RelativePathInfo) => Promise<string>;
        });
        get name(): any;
        get description(): any;
        get options(): {
            disableName?: boolean;
            disableAuthors?: boolean;
            disableMenu?: boolean;
            linksTitle?: string;
        };
        defs(key: string): any;
        blogsInfo(options?: {
            mkt?: string | boolean;
        }): {
            name: any;
            count: number;
            dir: any;
            further: any;
        };
        getName(options?: ILocalePropOptions<string>): any;
        getDescription(optional?: ILocalePropOptions<string>): any;
        home(options?: IArticleLocaleOptions): ArticleInfo;
        blogs(options?: IArticleLocaleOptions): ArticleInfo[];
        docs(options?: IArticleLocaleOptions): (string | ArticleInfo)[];
        hiddenArticles(options?: IArticleLocaleOptions): ArticleInfo[];
        links(options?: {
            mkt?: string | boolean;
        }): {
            name: any;
            url: any;
            newWindow: boolean;
        }[];
        addBlog(article: IArticleInfo): ArticleInfo;
        addDocs(article: IArticleInfo | string | IArticleLabelInfo): any;
        addHiddenArticle(article: IArticleInfo): ArticleInfo;
        clearBlogs(): void;
        clearDocs(): void;
        clearHiddenArticles(): void;
        toJSON(): IArticleCollection;
        loadMoreBlogs(): Promise<boolean>;
        get(name: string, options?: {
            mkt?: string | boolean;
        }): ArticleInfo;
        genInfo(article: IArticleInfo, list?: ArticleInfo[] | any[]): ArticleInfo;
        relative(path: string | Hje.RelativePathInfo): Hje.RelativePathInfo;
        some(callback: (item: ArticleInfo, index: number) => boolean, thisArg?: any, options?: {
            mkt?: string | boolean;
        }): boolean;
        nextArticle(current: ArticleInfo, options?: {
            mkt?: string | boolean;
        }): ArticleInfo;
        previousArticle(current: ArticleInfo, options?: {
            mkt?: string | boolean;
        }): ArticleInfo;
        parentArticle(current: ArticleInfo, options?: {
            mkt?: string | boolean;
        }): ArticleInfo;
    }
    /**
     * Loads the collection and config of articles.
     * @param url The URL of article collection and config.
     * @param fetchHandler An additional handler to fetch markdown file of article.
     * @returns A promise object of article collection and config.
     */
    function fetchArticles(url: string, fetchHandler?: ((url: Hje.RelativePathInfo) => Promise<string>)): Promise<Articles>;
}
declare namespace DeepX.MdBlogs {
    class ArticleInfo {
        private _inner;
        constructor(data: IArticleInfo, options: IArticleInfoOptions);
        get id(): string;
        get name(): string;
        get subtitle(): string;
        get keywords(): NameValueModel[];
        get intro(): string;
        get notes(): string[];
        get authors(): ContributorCollection;
        get contentCache(): string;
        get dateObj(): {
            year: number;
            month: number;
            date: number;
        };
        get dateString(): string;
        get location(): string | INameValueModel;
        get data(): any;
        get disableMenu(): boolean;
        get disableAuthors(): boolean;
        get bannerImage(): string | {
            name?: string;
            url: string;
            maxHeight?: number;
            cover?: boolean;
        };
        defs(key: string): any;
        getRoutePath(options?: {
            mkt?: string | boolean;
        }): string;
        is(name: string, options?: {
            mkt?: string | boolean;
        }): boolean;
        getPath(options?: ILocalePropOptions<string>): Hje.RelativePathInfo;
        getName(options?: ILocalePropOptions<string>): string;
        getSubtitle(options?: ILocalePropOptions<string>): string;
        getIntro(options?: ILocalePropOptions<string>): string;
        getNotes(options?: ILocalePropOptions<string>): string[];
        getThumb(kind?: "square" | "common" | "wide" | "tall"): string | Hje.RelativePathInfo;
        getContent(options: IArticleLocaleOptions): Promise<string>;
        relative(path: string): Hje.RelativePathInfo;
        related(options?: {
            mkt?: string | boolean;
        }): (IArticleRelatedLinkItemInfo | string)[];
        children(options?: IArticleLocaleOptions): ArticleInfo[];
        hasKeyword(test: string): boolean;
        isKind(test: string): boolean;
        toJSON(): IArticleInfo;
        protected getDirPath(options?: ILocalePropOptions<string>): string;
    }
}
declare namespace DeepX.MdBlogs {
    type IArticleYearConfig = boolean | "y" | "year" | "m" | "month" | "d" | "date" | "day" | undefined;
    type INameValueModelValue = (INameValueModel | string)[];
    type INameValueModelDefinitions = INameValueModel[] | Record<string, INameValueModel | string | boolean>;
    type IContributorsInfo = string | (string | IContributorInfo)[] | Record<string, string | (string | IContributorInfo)[]>;
    interface IContributorInfo {
        /**
         * Nickname.
         */
        name: string;
        /**
         * Personal website.
         */
        url?: string;
        /**
         * Email address.
         */
        email?: string;
        /**
         * Avatar URL.
         */
        avatar?: string;
        [property: string]: any;
    }
    interface IRoleContributorInfo {
        role: NameValueModel;
        members: IContributorInfo[];
    }
    interface IArticleLocaleOptions {
        reload?: boolean;
        mkt?: string | boolean;
    }
    interface IArticleRelatedLinkItemInfo {
        /**
         * The display name.
         */
        name: string;
        /**
         * The subtitle.
         */
        subtitle?: string;
        /**
         * The link URL.
         */
        url: string | {
            type: string;
            value: string;
        };
        /**
         * A flag indicating opens in a new window or tab.
         */
        newWindow?: boolean;
        /**
         * Addtional data for reference.
         */
        data?: any;
    }
    interface IArticleLabelInfo {
        name: string;
        disable: "label" | "header";
        [property: string]: unknown;
    }
    interface IArticleMenuOptions {
        select?: ArticleInfo;
        deep?: boolean | number;
        mkt?: string | boolean;
        arr?: Hje.DescriptionContract[];
        path?: string | ((original: string, article: ArticleInfo) => string);
        styleRefs?: string | string[];
        click?(ev: Event, article: ArticleInfo): void;
        render?(model: Hje.DescriptionContract, article: ArticleInfo, options: {
            level: number;
            mkt: string | boolean;
            path: string;
            select: boolean;
        }): void;
    }
    /**
     * The settings and markdown URL of article.
     */
    interface IArticleInfo {
        /**
         * The identifier. Should be a UUID/GUID.
         */
        id?: string;
        /**
         * The name of article.
         */
        name: string;
        /**
         * A flag indicate whether disable this article.
         */
        disable?: boolean;
        /**
         * The subtitle of the article.
         */
        subtitle?: string;
        /**
         * The introduction of the article.
         */
        intro?: string;
        /**
         * The relative URL of the article thumbnail.
         */
        thumb?: string | {
            /**
             * The relative URL of the article thumbnail in square (1:1) ratio.
             */
            square?: string;
            /**
             * The relative URL of the article thumbnail in common (4:3 or 3:2) ratio.
             */
            common?: string;
            /**
             * The relative URL of the article thumbnail in wide (16:9 or 16:10) ratio.
             */
            wide?: string;
            /**
             * The relative URL of the article thumbnail in tall (3:4 or 9:16) ratio.
             */
            tall?: string;
        };
        /**
         * The relative directory path with the article markdown file.
         */
        dir?: string;
        /**
         * The file name of the article markdown file.
         */
        file?: string | boolean;
        /**
         * The keywords.
         */
        keywords?: INameValueModelValue;
        /**
         * The publish date in YYYYMMDD format.
         */
        date?: string;
        /**
         * The article authors.
         */
        author?: IContributorsInfo;
        /**
         * The city where the article publishes.
         */
        location?: string | INameValueModel;
        /**
         * The related links (display in section see also).
         */
        related?: (IArticleRelatedLinkItemInfo | {
            disable?: boolean;
            [property: string]: any;
        } | IArticleLabelInfo | string)[];
        /**
         * The mark of end comment in markdown.
         */
        end?: boolean | string | {
            /**
             * The mark of start comment in markdown.
             */
            start?: boolean | string;
            /**
             * The mark of end comment in markdown.
             */
            end?: boolean | string;
            /**
             * The replacement of URLS in markdown.
             */
            urls?: {
                /**
                 * The original text to replace.
                 */
                old: string;
                /**
                 * The new text used to replace with.
                 */
                by: string;
            }[];
        };
        /**
         * The additional notes of the article to display at the end of content.
         */
        notes?: string[];
        /**
         * The child articles.
         */
        children?: IArticleInfo[];
        /**
         * Addtional data for reference.
         */
        data?: any;
        /**
         * The options of the article.
         */
        options?: {
            /**
             * A flag to indicate whether need hide the contents in article.
             */
            disableMenu?: boolean;
            /**
             * A flag to indicate whether need hide the authors and publish date in article.
             */
            disableAuthors?: boolean;
            /**
             * The banner image URL or info.
             */
            banner: string | {
                /**
                 * The alt name of banner image.
                 */
                name?: string;
                /**
                 * The URL of banner.
                 */
                url: string;
                /**
                 * The max height of banner image.
                 */
                maxHeight?: number;
                /**
                 * A flag indicating whether fit cover.
                 */
                cover?: boolean;
            };
            /**
             * The additional kind of article for filter.
             */
            kind: string[] | string;
        };
        [property: string]: any;
    }
    /**
     * The config of blogs.
     */
    interface IArticleBlogsConfig {
        /**
         * The optional name of blogs.
         */
        name?: string;
        /**
         * The maximum count to display.
         */
        count?: number;
        /**
         * The collection of blog.
         */
        list: IArticleInfo[];
        /**
         * The relative path of root directory of blog articles.
         */
        dir?: string;
        /**
         * The relative paths of all rest articles in pages.
         */
        further?: string[];
        /**
         * The root display path mode.
         */
        year?: IArticleYearConfig & string;
        /**
         * A flag to indicate whether reverse the article list to diplay.
         *
         * The blog articles in `list` should order by publish `date` ascending (earliest to latest).
         * Sets this field to `true` if the list is sort descending (latest to earlist).
         * Default is `false`.
         */
        reverse?: boolean;
        [property: string]: any;
    }
    interface IArticlesPartData {
        mkt?: string | boolean;
        banner?: Hje.DescriptionContract;
        supplement?: Hje.DescriptionContract;
        lifecycle?: IArticlesLifecycle;
        articles?: string | Articles;
        select?: string;
        store?: any;
        onselect(ev: {
            children: Hje.DescriptionContract[];
            article: ArticleInfo;
            mkt: string | boolean | undefined;
            store: any;
            defs(key: string): any;
            insertChildren(position: "last" | "end" | "start" | number | undefined, ...models: Hje.DescriptionContract[]): void;
        }): void;
        onhome(ev: {
            model: Hje.DescriptionContract;
            mkt: string | boolean | undefined;
            store: any;
            defs(key: string): any;
        }): void;
        onfetch?(ev: {
            articles: Articles;
            mkt: string | boolean | undefined;
            store: any;
        }): void;
    }
    interface IArticleInfoOptions {
        rela: Hje.RelativePathInfo;
        year?: IArticleYearConfig;
        fetch?: ((url: Hje.RelativePathInfo) => Promise<string>);
        definitions?: IArticlesDefinitions;
    }
    interface IArticlesDefinitions {
        /**
         * All keywords information.
         */
        keywords?: INameValueModelDefinitions;
        /**
         * All roles information.
         */
        roles?: INameValueModelDefinitions;
        /**
         * All contributors.
         */
        contributors?: IContributorInfo[];
        [property: string]: any;
    }
    /**
     * The model of previous blog articles in page.
     */
    interface IArticlePagingModel {
        /**
         * A flag indicating whether this page is disabled.
         */
        disable?: boolean;
        /**
         * All blog articles.
         */
        blog: IArticleInfo[];
        /**
         * Options of this paging model.
         */
        options?: {
            /**
             * A flag to indicate whether reverse the article list to diplay.
             *
             * The blog articles in `list` should order by publish `date` ascending (earliest to latest).
             * Sets this field to `true` if the list is sort descending (latest to earlist).
             * Default is `false`.
             */
            reverse?: boolean;
        };
    }
    /**
     * The model of blog and docs.
     */
    interface IArticleCollection {
        /**
         * The website name.
         */
        name?: string;
        /**
         * The description of the website.
         */
        description?: string;
        /**
         * The relative URL of home markdown file.
         */
        home?: string;
        /**
         * All blogs info.
         */
        blog?: IArticleInfo[] | IArticleBlogsConfig;
        /**
         * The docs or wiki with tree articles.
         */
        docs?: (IArticleInfo | IArticleLabelInfo | string)[];
        /**
         * The additional articles which hide in menu of all articles.
         */
        hiddenArticles?: IArticleInfo[];
        /**
         * The mapping of route.
         */
        redir?: {
            [alias: string]: string;
        };
        /**
         * The additional links. They will display under the list of docs and blog.
         */
        links?: {
            /**
             * The display name.
             */
            name: string;
            /**
             * The link URL.
             */
            url: string;
            /**
             * A flag indicating opens in a new window or tab.
             */
            newWindow?: boolean;
            [property: string]: any;
        }[];
        /**
         * The additional options of website.
         */
        options?: {
            /**
             * A flag indicating whether hide website name.
             */
            disableName?: boolean;
            /**
             * A flag to indicate whether need hide the authors and publish date in article.
             */
            disableAuthors?: boolean;
            /**
             * A flag to indicate whether need hide the contents in article.
             */
            disableMenu?: boolean;
            /**
             * The title of links.
             */
            linksTitle?: string;
        };
        /**
         * The definitions.
         */
        "$defs"?: IArticlesDefinitions;
        [property: string]: any;
    }
    interface IArticlesLifecycle {
        disable?: boolean;
        oninit?(instance: ArticlesPart): void;
        onselect?(instance: ArticlesPart, article: ArticleInfo): void;
        onhome?(instance: ArticlesPart): void;
    }
    interface IHeadingLevelInfo {
        level: number;
        text: string;
        scroll(): void;
    }
    interface INameValueModel {
        /**
         * The name.
         */
        name?: string;
        /**
         * The value.
         */
        value: string;
        [property: string]: any;
    }
    interface ILocalePropOptions<T = any> {
        mkt?: string | boolean;
        fallback?: T;
    }
}
declare namespace DeepX.MdBlogs {
    /**
     * Renders a markdown blogs UX.
     * @param element The element to render.
     * @param data The URL of articles config or the collection of articles.
     * @param options The options.
     * @returns The view generating context.
     */
    function render(element: any, data: string | Articles, options?: {
        title?: string | boolean;
        banner?: Hje.DescriptionContract;
        supplement?: Hje.DescriptionContract;
        onfetch?(ev: {
            articles: Articles;
            mkt: string | boolean | undefined;
            store: any;
        }): void;
        onselect?(ev: Parameters<IArticlesPartData["onselect"]>[0]): void;
        onhome?(ev: Parameters<IArticlesPartData["onhome"]>[0]): void;
    }): Hje.ViewGeneratingContextContract<any>;
}
declare namespace DeepX.MdBlogs {
    const en: {
        name: string;
        publisher: string;
        author: string;
        dev: string;
        contentCreator: string;
        refresh: string;
        keywords: string;
        status: string;
        available: string;
        timeout: string;
        invalid: string;
        article: string;
        articles: string;
        articleMenu: string;
        architecture: string;
        website: string;
        officialWebsite: string;
        log: string;
        blog: string;
        blogs: string;
        home: string;
        about: string;
        game: string;
        games: string;
        video: string;
        videos: string;
        screenshot: string;
        screenshots: string;
        photo: string;
        photos: string;
        pic: string;
        pics: string;
        file: string;
        files: string;
        lib: string;
        libs: string;
        package: string;
        packages: string;
        tool: string;
        tools: string;
        book: string;
        books: string;
        comment: string;
        comments: string;
        docs: string;
        search: string;
        settings: string;
        tutorial: string;
        work: string;
        works: string;
        events: string;
        seeMore: string;
        learnMore: string;
        back: string;
        goHome: string;
        recomm: string;
        ok: string;
        cancel: string;
        continue: string;
        open: string;
        close: string;
        new: string;
        add: string;
        modify: string;
        remove: string;
        delete: string;
        on: string;
        off: string;
        enable: string;
        disable: string;
        enabled: string;
        disabled: string;
        unknown: string;
        empty: string;
        notFound: string;
        loading: string;
        seeAlso: string;
        error: string;
        loadFailed: string;
        renderFailed: string;
        today: string;
        thisYear: string;
        top: string;
        next: string;
        previous: string;
        projects: string;
        archiveProjects: string;
        features: string;
        installation: string;
        sourceCode: string;
        community: string;
        link: string;
        otherLinks: string;
        relatedLinks: string;
        xp: string;
        experience: string;
        page: string;
        more: string;
        details: string;
        getDetails: string;
    };
    export function getLocaleString(key: keyof typeof en, mkt?: string | boolean | undefined): any;
    export function setElementText(element: HTMLElement | string, key: keyof typeof en): any;
    export {};
}
declare namespace DeepX.MdBlogs {
    let roles: Record<string, NameValueModel>;
    class NameValueModel {
        private _model;
        constructor(m: INameValueModel | string);
        get name(): string;
        get value(): string;
        getName(options: ILocalePropOptions<string>): any;
    }
    class ContributorCollection {
        private _model;
        private _defaultRole;
        private _keys;
        constructor(list: IContributorsInfo, contributors: IContributorInfo[], roles: INameValueModelDefinitions, defaultRole: string | string[]);
        list(role: string): IRoleContributorInfo;
        filter(role?: string | string[]): IRoleContributorInfo[];
        priorityList(): IRoleContributorInfo[];
        roles(): string[];
        all(): IRoleContributorInfo[];
    }
    function toMembers(list: IRoleContributorInfo[]): IContributorInfo[];
    function nameValueModels(list: INameValueModelValue, defs?: INameValueModelDefinitions): NameValueModel[];
}
declare namespace DeepX.MdBlogs {
    /**
     * Gets the module name.
     * @returns The name of module.
     */
    function name(): string;
}
declare namespace DeepX.MdBlogs {
    class ArticlesPart extends Hje.BaseComponent {
        readonly __inner: {
            select?: ArticleInfo;
            info?: Articles;
            mkt?: string | boolean;
            lifecycle?: IArticlesLifecycle;
            title?: string;
        };
        constructor(element: any, options?: Hje.ComponentOptionsContract<IArticlesPartData>);
        get title(): string;
        set title(value: string);
        get mkt(): string | boolean;
        set mkt(value: string | boolean);
        defs(key: string): any;
        home(): void;
        select(article?: ArticleInfo | string): ArticleInfo;
        next(): ArticleInfo;
        previous(): ArticleInfo;
        parent(): ArticleInfo;
        protected initRender(articles: Articles, select: string, lifecycle: IArticlesLifecycle): void;
        protected refreshMenu(): void;
        protected createLocaleOptions(): {
            mkt: string | false;
        };
        protected lifecycle(): IArticlesLifecycle;
        protected genMenu(arr: Hje.DescriptionContract[], params: (ArticleInfo | string)[], deep?: boolean | number): Hje.DescriptionContract;
    }
}
declare namespace DeepX.MdBlogs {
    function setElementProp(element: HTMLElement | string, key: string | null, value: any): void;
    function batchSetElementProp(list: {
        element: HTMLElement | string;
        key?: string | null;
        value: any;
    }[]): void;
    function firstQuery(): string;
    function filterFirst<T>(arr: T[], predicate: (item: T, index?: number) => boolean): T;
    function getLocaleProp<T = any>(obj: T, key?: keyof (T) | null, options?: {
        mkt?: string | boolean;
        fallback?: any;
        bind?: any;
    }): any;
}
