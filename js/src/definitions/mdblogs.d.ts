declare namespace DeepX.MdBlogs {
    export const hooks: {
        renderMd: undefined | ((element: HTMLElement, md: string) => void);
        fetchList: undefined | ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>);
    };
    export function showElements(show: string[], hide: string[]): void;
    export function codeElements(element: HTMLElement): HTMLElement[] | undefined;
    export function generateMenu(params: (ArticleInfo | string)[], options?: IArticleMenuOptions): Hje.DescriptionContract;
    /**
     * Generates the description model of the specific articles.
     * @param articles The URL or promise object to fetch articles.
     * @param filter The handler to filter the articles to display.
     * @param options Additional options.
     * @returns A promise object of description model. It is a `ul` element.
     */
    export function generateMenuPromise(articles: Promise<Articles> | string, filter: "blogs" | "blog" | "docs" | "wiki" | ((articles: Articles) => (ArticleInfo | string)[]), options?: IArticleMenuOptions & {
        onfetch?(ev: IArticlesPartDataFetchParams): void;
    }): Promise<Hje.DescriptionContract | undefined>;
    export function generateMenuItem(article: ArticleInfo, level: number, path?: string | ((original: string, article: ArticleInfo) => string), click?: (ev: Event, article: ArticleInfo) => void, options?: ILocalePropOptions): Hje.DescriptionContract;
    export function generateCdnScript(name: string, ver: string, url: string, path: string): {
        tagName: string;
        className: string;
        children: {
            tagName: string;
            children: ({
                tagName: string;
                className: string;
                children: string;
            } | {
                tagName: string;
                children: string;
                className?: undefined;
            })[];
        }[];
    } | undefined;
    interface IButtonListItem {
        className?: string[] | string | {
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
        className?: string[] | string | {
            subscribe(h: any): any;
            [property: string]: any;
        };
        style?: any;
        groupclassName?: string[] | string | {
            subscribe(h: any): any;
            [property: string]: any;
        };
        data?: any;
        props?: Record<string, unknown>;
        text?: string;
        item?: boolean | IButtonListItem;
        list?: (IButtonListItem | string | number | boolean)[];
        click?(ev: Event): void;
    }): Hje.DescriptionContract | undefined;
    export {};
}
declare namespace DeepX.MdBlogs {
    interface IImageGalleryPartInternalData {
        gallery: (IImageGalleryInfo | string | DeepX.MdBlogs.IArticleLabelInfo)[];
        items: Record<string, {
            items: IImageItemInfo[];
            rela?: string | Hje.RelativePathInfo;
        }>;
        rela: Hje.RelativePathInfo;
        blogRela: Hje.RelativePathInfo;
        mkt?: {
            mkt?: string | boolean;
        };
        mainStyle: string[];
        select?: IImageGalleryInfo;
        siteName?: string;
        defaultItemName?: string;
        needBack?: boolean;
        url?: string | boolean;
        before?: string;
        after?: string;
        selected?: (info: IImageGalleryInfo, component: ImageGalleryPart) => void;
    }
    export class ImageGalleryPart extends Hje.DataComponent<IImageGalleryPartData, IImageGalleryPartInternalData> {
        constructor(args: any);
        get blogRela(): Hje.RelativePathInfo;
        get before(): Hje.BaseComponent | undefined;
        get after(): Hje.BaseComponent | undefined;
        get gallery(): IImageGalleryInfo[];
        getGallery(id: string): IImageGalleryInfo | undefined;
        selectGalleryAsync(id: string | IImageGalleryInfo): Promise<IImageGalleryInfo | undefined>;
        selectGalleryInCache(value: IImageGalleryInfo): IImageGalleryInfo;
        relativePath(path: string | undefined): string;
        scrollContentIntoView(): false | undefined;
        scrollMenuIntoView(): false | undefined;
        getGalleryLinkInfo(value: IImageGalleryInfo): {
            title: string;
            url: string | undefined;
            kind: "route" | "link" | "func";
        };
        closeImage(ev?: MouseEvent): void;
        registerHistoryPop(): void;
        protected onSelect(info: IImageGalleryInfo): void;
        private refreshRelated;
        private genGalleryMenu;
    }
    export class ImageCollectionPart extends Hje.DataComponent<IImageCollectionPartData, {
        items: IImageItemInfo[];
        rela: Hje.RelativePathInfo;
        itemUrl(item: IImageItemInfo, options: IImageUrlResolveOptions): string | undefined;
        click?(data: IImageClickInfo, ev?: MouseEvent): void;
        close?(ev?: MouseEvent): void;
        mkt?: {
            mkt: string | boolean;
        };
        defaultName?: string;
        pageSize?: number;
        nextIndex: number;
        renderedCount: number;
    }> {
        constructor(args: any);
        get length(): IImageItemInfo[];
        setDefaultName(value: string): void;
        getItem(index: number | string): IImageItemInfo | undefined;
        pushWithoutRender(...items: IImageItemInfo[]): number;
        push(...items: IImageItemInfo[]): number;
        clear(): void;
        nextPage(): boolean;
        indexOf(item: string | IImageItemInfo): number;
        setImageRela(value: string | Hje.RelativePathInfo | null): void;
        imageRelative(url: string | undefined): string;
        openImage(item: IImageItemInfo | string, ev?: MouseEvent): undefined;
        closeImage(ev?: MouseEvent): void;
        private genItemModel;
    }
    export class RelatedInfoPart extends Hje.DataComponent {
        constructor(args: any);
        setData(links: DeepX.MdBlogs.IArticleRelatedLinkItemInfo[] | null | undefined, images: IImageItemInfo[] | null | undefined): number;
    }
    export function galleryList(col: IImageGalleryInfo[], imageRela: string | Hje.RelativePathInfo | ImageGalleryPart | ImageCollectionPart, link?: string, options?: {
        mkt?: string | boolean;
    }): {
        tagName: string;
        className: string;
        props: {
            href: string;
        };
        children: Hje.DescriptionContract[];
    }[] | null;
    export function getGallery(gallery: IImageGalleryInfo[], id: string): IImageGalleryInfo | undefined;
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
            disableSearch?: boolean;
            linksTitle?: string;
            galleryTitle?: string;
            galleryTips?: string;
            keywordsTitle?: string;
            contentCreatorTitle?: string;
            seeAlsoTitle?: string;
            otherLinksTitle?: string;
            search?: string;
            previous?: string;
            next?: string;
            back?: string;
            empty?: string;
        };
        defs(key: string): any;
        blogsInfo(options?: {
            mkt?: string | boolean;
        }): {
            name: any;
            count: number | undefined;
            dir: any;
            further: any;
        };
        getName(options?: ILocalePropOptions<string>): any;
        getDescription(optional?: ILocalePropOptions<string>): any;
        home(options?: IArticleLocaleOptions): ArticleInfo | undefined;
        blog(options?: IArticleLocaleOptions): ArticleInfo[];
        docs(options?: IArticleLocaleOptions): (string | ArticleInfo)[];
        hiddenArticles(options?: IArticleLocaleOptions): ArticleInfo[];
        gallery(): IImageGalleryInfo[] | undefined;
        links(options?: {
            mkt?: string | boolean;
        }): {
            [property: string]: any;
            name: string;
            url: string;
            newWindow?: boolean;
        }[];
        addBlog(article: IArticleInfo): ArticleInfo | undefined;
        addDocs(article: IArticleInfo | string | IArticleLabelInfo): any;
        addHiddenArticle(article: IArticleInfo): ArticleInfo | undefined;
        clearBlog(): void;
        clearDocs(): void;
        clearHiddenArticles(): void;
        toJSON(): IArticleCollection;
        loadMoreBlog(): Promise<boolean>;
        get(name: string, options?: {
            mkt?: string | boolean;
        }): ArticleInfo | undefined;
        search(q: string, options?: {
            mkt?: string | boolean;
        }): ArticleInfo[] | undefined;
        genInfo(article: IArticleInfo, list?: ArticleInfo[] | any[]): ArticleInfo | undefined;
        relative(path: string | Hje.RelativePathInfo): Hje.RelativePathInfo;
        some(callback: (item: ArticleInfo, index: number) => boolean, thisArg?: any, options?: {
            mkt?: string | boolean;
        }): boolean;
        nextArticle(current: ArticleInfo | undefined | null, options?: {
            mkt?: string | boolean;
        }): ArticleInfo | null | undefined;
        previousArticle(current: ArticleInfo | undefined | null, options?: {
            mkt?: string | boolean;
        }): ArticleInfo | null | undefined;
        parentArticle(current: ArticleInfo | undefined | null, options?: {
            mkt?: string | boolean;
        }): ArticleInfo | null | undefined;
        /**
         * Gets the string registered by given key.
         * @param key The key to get string.
         * @param options The options.
         * @returns A string; or undefined, if does not exist nor has no fallback value.
         */
        string(key: string, options?: {
            mkt?: string | boolean;
            fallback?: string;
        }): any;
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
        get id(): string | undefined;
        get name(): string;
        get subtitle(): string;
        get keywords(): NameValueModel[] | undefined;
        get intro(): string;
        get notes(): string[];
        get gallery(): IImageGalleryInfo[];
        get authors(): ContributorCollection;
        get contentCache(): string | undefined;
        get dateObj(): {
            year: number;
            month: number;
            date: number;
        } | undefined;
        get dateString(): string | undefined;
        get location(): string | INameValueModel | undefined;
        get data(): any;
        get disableMenu(): boolean | undefined;
        get disableAuthors(): boolean | undefined;
        get bannerImage(): string | {
            name?: string;
            url: string;
            maxHeight?: number;
            cover?: boolean;
        } | undefined;
        getOptions(key: string): string | boolean | string[] | {
            name?: string;
            url: string;
            maxHeight?: number;
            cover?: boolean;
        } | null | undefined;
        defs(key: string): any;
        hasGallery(value: string): boolean;
        getRoutePath(options?: {
            mkt?: string | boolean;
        }): string | undefined;
        is(name: string, options?: {
            mkt?: string | boolean;
        }): boolean;
        getPath(options?: ILocalePropOptions<string>): Hje.RelativePathInfo | undefined;
        getName(options?: ILocalePropOptions<string>): string;
        getSubtitle(options?: ILocalePropOptions<string>): string;
        getIntro(options?: ILocalePropOptions<string>): string;
        getNotes(options?: ILocalePropOptions<string>): string[];
        getThumb(kind?: "square" | "common" | "wide" | "tall"): string | Hje.RelativePathInfo | undefined;
        getContent(options?: IArticleLocaleOptions): Promise<string>;
        relative(path: string): Hje.RelativePathInfo;
        related(options?: {
            mkt?: string | boolean;
        }): (IArticleRelatedLinkItemInfo | string)[];
        children(options?: IArticleLocaleOptions): ArticleInfo[];
        hasKeyword(test: string): boolean;
        isKind(test: string): boolean;
        string(key: string, options?: {
            mkt?: string | boolean;
            fallback?: string;
        }): any;
        toJSON(): IArticleInfo;
        protected getDirPath(options?: ILocalePropOptions<string>): string;
    }
}
declare namespace DeepX.MdBlogs {
    type IImageRatio = "p" | "page" | "v" | "vertical" | "h" | "horizontal" | "s" | "square" | "w" | "wide";
    type ITitleCaseKind = "upper" | "lower" | "capital" | "small" | "normal" | "none" | null;
    export type IArticleYearConfig = boolean | "y" | "year" | "m" | "month" | "d" | "date" | "day" | undefined;
    export type INameValueModelValue = (INameValueModel | string)[];
    export type INameValueModelDefinitions = INameValueModel[] | Record<string, INameValueModel | string | boolean>;
    export type IContributorsInfo = string | (string | IContributorInfo)[] | Record<string, string | (string | IContributorInfo)[]>;
    export interface IImageUrlResolveOptions {
        kind: "thumb" | "source";
        rela: Hje.RelativePathInfo;
    }
    export interface IArticlesPartDataSelectParams {
        children: Hje.DescriptionContract[];
        article: ArticleInfo;
        mkt: string | boolean | undefined;
        store: any;
        defs(key: string): any;
        relative(path: string | Hje.RelativePathInfo): string;
        insertChildren(position: "last" | "end" | "start" | number | undefined, ...models: Hje.DescriptionContract[]): void;
    }
    export interface IArticlesPartDataHomeParams {
        model: Hje.BaseComponent;
        mkt: string | boolean | undefined;
        store: any;
        defs(key: string): any;
        relative(path: string | Hje.RelativePathInfo): string;
    }
    export interface IArticlesPartDataFetchParams {
        articles: Articles;
        mkt: string | boolean | undefined;
        store: any;
    }
    export interface IContributorInfo {
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
    export interface IRoleContributorInfo {
        role: NameValueModel;
        members: IContributorInfo[];
    }
    export interface IArticleLocaleOptions {
        reload?: boolean;
        mkt?: string | boolean;
    }
    export interface IArticleRelatedLinkItemInfo {
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
        url: string;
        /**
         * A flag indicating opens in a new window or tab.
         */
        newWindow?: boolean;
        /**
         * Addtional data for reference.
         */
        data?: any;
    }
    export interface IArticleLabelInfo {
        name: string;
        disable: "label" | "header";
        ref?: boolean | string;
        [property: string]: unknown;
    }
    export interface IArticleMenuOptions {
        select?: ArticleInfo;
        deep?: boolean | number;
        mkt?: string | boolean;
        arr?: Hje.DescriptionContract[];
        path?: string | ((original: string, article: ArticleInfo) => string);
        className?: string | string[];
        click?(ev: Event, article: ArticleInfo): void;
        render?(model: Hje.DescriptionContract, article: ArticleInfo, options: {
            level: number;
            mkt?: string | boolean;
            path: string;
            select: boolean;
        }): void;
    }
    /**
     * The gallery information.
     */
    export interface IImageGalleryInfo {
        /**
         * The identifier of the gallery.
         */
        id: string;
        /**
         * The additional alias.
         */
        alias?: string[] | null;
        /**
         * A value indicating whether the gallery item is disabled.
         */
        disable?: boolean;
        /**
         * The display name.
         */
        name: string;
        /**
         * The subtitle.
         */
        subtitle?: string;
        /**
         * The options.
         */
        options?: {
            /**
             * The string case of display name.
             */
            nameCase?: ITitleCaseKind;
            /**
             * The string case of subtitle.
             */
            subtitleCase?: ITitleCaseKind;
            /**
             * The default name for each image.
             */
            defaultItemName?: string | boolean;
            /**
             * The image ratio.
             */
            ratio?: IImageRatio;
            /**
             * A value indicating whether each image has a thumbnail.
             */
            thumb?: boolean;
            [property: string]: any;
        };
        /**
         * The icon.
         */
        icon?: string;
        /**
         * The introduction.
         */
        intro?: string;
        /**
         * The start year published.
         */
        year: number;
        /**
         * The related links.
         */
        links?: DeepX.MdBlogs.IArticleRelatedLinkItemInfo[];
        /**
         * The link or collection of items.
         */
        items: string | IImageItemInfo[];
        /**
         * The data.
         */
        data?: Record<string, any>;
        [property: string]: any;
    }
    /**
     * The settings and markdown URL of article.
     */
    export interface IArticleInfo {
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
            banner?: string | {
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
            kind?: string[] | string;
            /**
             * The identifier of gallery to bind
             */
            gallery?: string | string[] | null;
            /**
             * The case of name.
             */
            nameCase?: ITitleCaseKind;
        };
        [property: string]: any;
    }
    /**
     * The config of blog.
     */
    export interface IArticleBlogConfig {
        /**
         * The optional name of blog.
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
    export interface IArticlesPartData {
        mkt?: string | boolean;
        banner?: Hje.DescriptionContract;
        supplement?: Hje.DescriptionContract;
        lifecycle?: IArticlesLifecycle;
        articles?: string | Articles;
        select?: string;
        q?: string;
        store?: any;
        galleryUrl?(info: IImageGalleryInfo): string;
        onselect?(ev: IArticlesPartDataSelectParams): void;
        onhome?(ev: IArticlesPartDataHomeParams): void;
        onfetch?(ev: IArticlesPartDataFetchParams): void;
    }
    export interface IArticleInfoOptions {
        rela?: Hje.RelativePathInfo;
        year?: IArticleYearConfig;
        fetch?: ((url: Hje.RelativePathInfo) => Promise<string>);
        definitions?: IArticlesDefinitions;
        gallery?: IImageGalleryInfo[];
    }
    export interface IArticlesDefinitions {
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
        /**
         * The string resources.
         */
        strings?: Record<string, string>;
        [property: string]: any;
    }
    /**
     * The model of previous blog articles in page.
     */
    export interface IArticlePagingModel {
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
    export interface IArticleCollection {
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
         * All blog info.
         */
        blog?: IArticleInfo[] | IArticleBlogConfig;
        /**
         * The docs or wiki with tree articles.
         */
        docs?: (IArticleInfo | IArticleLabelInfo | string)[];
        /**
         * The additional articles which hide in menu of all articles.
         */
        hiddenArticles?: IArticleInfo[];
        /**
         * The gallery collection.
         */
        gallery?: IImageGalleryInfo[];
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
             * A flag to indicate whether need disable search functionality.
             */
            disableSearch?: boolean;
            /**
             * The title of links.
             */
            linksTitle?: string;
            /**
             * The title to display under gallery collection.
             */
            galleryTitle?: string;
            /**
             * The tips to display under gallery collection.
             */
            galleryTips?: string;
            /**
             * The title of keywords section.
             */
            keywordsTitle?: string;
            /**
             * The title of content creator section.
             */
            contentCreatorTitle?: string;
            /**
             * The title of see also section.
             */
            seeAlsoTitle?: string;
            /**
             * The title of other links section.
             */
            otherLinksTitle?: string;
            /**
             * The text of search.
             */
            search?: string;
            /**
             * The text of going to previous article.
             */
            previous?: string;
            /**
             * The text of going to next article.
             */
            next?: string;
            /**
             * The text of turning back.
             */
            back?: string;
            /**
             * The text of empty.
             */
            empty?: string;
        };
        /**
         * The definitions.
         */
        "$defs"?: IArticlesDefinitions;
        [property: string]: any;
    }
    export interface IArticlesLifecycle {
        disable?: boolean;
        oninit?(instance: ArticlesPart): void;
        onselect?(instance: ArticlesPart, article: ArticleInfo): void;
        onhome?(instance: ArticlesPart): void;
    }
    export interface IImageItemInfo {
        id: string;
        disable?: boolean;
        name?: string;
        year: number;
        month?: number;
        day?: number;
        url?: string;
        thumb?: boolean | string;
        keywords?: string[];
        size?: string;
        data?: Record<string, unknown>;
    }
    export interface IImageClickInfo {
        item: IImageItemInfo;
        component: ImageCollectionPart;
        info: {
            name: string;
            url: string;
            thumb?: string;
        };
    }
    export interface IImageCollectionPartOptions {
        itemUrl?(item: IImageItemInfo, options: IImageUrlResolveOptions): string | undefined;
        click?(data: IImageClickInfo, ev: MouseEvent): void;
        close?(ev: MouseEvent): void;
        mkt?: string | boolean;
        page?: number;
    }
    export interface IImageGalleryPartData extends IImageCollectionPartOptions {
        gallery: (IImageGalleryInfo | string | DeepX.MdBlogs.IArticleLabelInfo)[];
        items?: Record<string, IImageItemInfo[] | {
            items: IImageItemInfo[];
            rela?: string | Hje.RelativePathInfo;
        }>;
        select?: string | boolean;
        rela?: string | Hje.RelativePathInfo;
        blogRela?: string | Hje.RelativePathInfo;
        url?: string | boolean;
        blog?: DeepX.MdBlogs.ArticleInfo[];
        styles?: {
            header?: string | string[];
            main?: string | string[];
            next?: string | string[];
            related?: string | string[];
            share?: string | string[];
        };
        strings?: {
            all?: string;
            pics?: string;
            site?: string;
        };
        before?: Hje.DescriptionContract;
        after?: Hje.DescriptionContract;
        selected?(info: IImageGalleryInfo, component: ImageGalleryPart): void;
        fetch?: (url: Hje.RelativePathInfo) => Promise<any>;
    }
    export interface IRelatedInfoPartData {
        title?: string;
        links?: DeepX.MdBlogs.IArticleRelatedLinkItemInfo[];
        images?: IImageItemInfo[];
        imageRela?: string | Hje.RelativePathInfo;
        defaultImageName?: string;
        mkt?: string | boolean;
        itemUrl?(item: IImageItemInfo, kind: IImageUrlResolveOptions): string | undefined;
        click?(data: IImageClickInfo, ev?: MouseEvent): void;
        close?(ev?: MouseEvent): void;
    }
    export interface IImageCollectionPartData extends IImageCollectionPartOptions {
        rela?: string | Hje.RelativePathInfo;
        items: IImageItemInfo[];
        defaultName?: string;
    }
    export interface IImageItemsData {
        items: IImageItemInfo[] | Record<string, IImageItemInfo[]>;
        options?: {
            imageRela?: string | Hje.RelativePathInfo;
            [property: string]: any;
        };
    }
    export interface IHeadingLevelInfo {
        level: number;
        text: string;
        scroll(): void;
    }
    export interface INameValueModel {
        /**
         * The name.
         */
        name?: string;
        /**
         * The value.
         */
        value: string | undefined;
        [property: string]: any;
    }
    export interface ILocalePropOptions<T = any> {
        mkt?: string | boolean;
        fallback?: T;
    }
    export {};
}
declare namespace DeepX.MdBlogs {
    /**
     * Renders a markdown blog UX.
     * @param element The element to render.
     * @param data The URL of articles config or the collection of articles.
     * @param options The options.
     * @returns The view generating context.
     */
    function render(element: HTMLElement | string, data: string | Articles, options?: {
        title?: string | boolean;
        banner?: Hje.DescriptionContract;
        supplement?: Hje.DescriptionContract;
        galleryUrl?(info: IImageGalleryInfo): string;
        onfetch?(ev: IArticlesPartDataFetchParams): void;
        onselect?(ev: IArticlesPartDataSelectParams): void;
        onhome?(ev: IArticlesPartDataHomeParams): void;
    }): ArticlesPart;
}
declare namespace DeepX.MdBlogs {
    const en: {
        name: string;
        publisher: string;
        author: string;
        dev: string;
        contentCreator: string;
        refresh: string;
        share: string;
        general: string;
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
        series: string;
        gallery: string;
        paintings: string;
        related: string;
        relatedBlog: string;
        relatedSeries: string;
        relatedPhotos: string;
        relatedGallery: string;
        relatedPaintings: string;
        picLibs: string;
        all: string;
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
        get name(): string | undefined;
        get value(): string | undefined;
        getName(options?: ILocalePropOptions<string>): any;
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
    function formatContributors(contributors: string | (string | IContributorInfo)[], refs: DeepX.MdBlogs.IContributorInfo[], options?: {
        mkt?: string | boolean;
    }): IContributorInfo[];
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
    class ArticlesPart extends Hje.DataComponent<IArticlesPartData, {
        select?: ArticleInfo | null;
        info?: Articles;
        mkt?: string | boolean;
        lifecycle?: IArticlesLifecycle;
        title?: string;
    }> {
        constructor(args: any);
        get title(): string | undefined;
        set title(value: string);
        get mkt(): string | boolean | undefined;
        set mkt(value: string | boolean);
        defs(key: string): any;
        home(q?: string): void;
        select(article?: ArticleInfo | string): ArticleInfo | null | undefined;
        next(): ArticleInfo | null | undefined;
        previous(): ArticleInfo | null | undefined;
        parent(): ArticleInfo | null | undefined;
        protected initRender(articles: Articles, select: string | undefined, q: string | undefined, lifecycle: IArticlesLifecycle): void;
        protected refreshMenu(): void;
        protected createLocaleOptions(): {
            mkt: string | false;
        } | undefined;
        protected lifecycle(): IArticlesLifecycle | undefined;
        genArticleList(q: string | undefined, options?: {
            mkt?: string | boolean;
        }): {
            tagName: string;
            className: string;
            children: Hje.DescriptionContract[];
        };
        string(key: string, options?: {
            mkt?: string | boolean;
            fallback?: string;
        }): any;
        protected genMenu(arr: Hje.DescriptionContract[], params: (ArticleInfo | string)[], deep?: boolean | number): Hje.DescriptionContract;
    }
}
declare namespace DeepX.MdBlogs {
    function setElementProp(element: HTMLElement | string, key: string | null | undefined, value: any): void;
    function batchSetElementProp(list: {
        element: HTMLElement | string;
        key?: string | null;
        value: any;
    }[]): void;
    function firstQuery(): string;
    function filterFirst<T>(arr: T[], predicate: (item: T, index?: number) => boolean): T | undefined;
    function scrollToTop(): void;
    function getCaseClassName<T = any>(obj: T | undefined | null, key: keyof T, options?: {
        mkt?: string | boolean;
    }): "x-text-case-upper" | "x-text-case-lower" | "x-text-case-capital" | "x-text-case-small" | undefined;
    function getLocaleProp<T = any>(obj: T | undefined, key?: keyof (T) | null, options?: {
        mkt?: string | boolean;
        fallback?: any;
        bind?: any;
    }): any;
}
