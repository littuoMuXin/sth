namespace PageCtrl {

export function initHome() {
    updateMenuText();
    const title = {
        tagName: "h1",
        children: [{
            tagName: "a",
            props: {
                href: "./articles/"
            },
            children: DeepX.MdBlogs.getLocaleString("blogs")
        }]
    };
    const context = Hje.render(document.getElementById("blog_content"), {
        children: [title, {
            tagName: "div",
            children: DeepX.MdBlogs.getLocaleString("loading")
        }]
    })!;
    DeepX.MdBlogs.generateMenuPromise("./articles/config.json", "blogs", {
        styleRefs: "link-item-blog",
        deep: -2,
        path: "./articles/",
        render(model, article, options) {
            if (!model.children || !(model.children instanceof Array) || model.children.length !== 1 || !article) return;
            const localOptions = { mkt: options.mkt };
            const title = article.getName(localOptions);
            const firstLine = {
                tagName: "div",
                children: [{
                    tagName: "strong",
                    children: title
                }, {
                    tagName: "span",
                    children: article.getSubtitle(localOptions)
                }]
            };
            const publishDate = article.dateObj;
            const secondLine = {
                tagName: "div",
                children: [{
                    tagName: "time",
                    props: {
                        datetime: `${publishDate.year.toString(10)}-${publishDate.month.toString(10)}-${publishDate.date.toString(10)}`
                    },
                    children: article.dateString
                }] as Hje.DescriptionContract[]
            };
            const thumb = article.getThumb("wide");
            if (thumb) secondLine.children.push({
                tagName: "img",
                props: {
                    alt: title,
                    src: thumb
                }
            });
            model.children[0].children = [firstLine, secondLine];
            const desc = article.getIntro(localOptions);
            if (desc) model.children[0].children.push({
                tagName: "div",
                children: [{
                    tagName: "span",
                    children: article.getIntro(localOptions)
                }]
            });
            if (model.children[0].props) delete model.children[0].props.title;
        }
    }).then(function (r) {
        context.model().children = [title, r];
        context.refresh();
    }, function (r) {
        context.model().children = [title, {
            tagName: "div",
            children: DeepX.MdBlogs.getLocaleString("loadFailed")
        }];
        context.refresh();
    });
}

export function initBlog() {
    DeepX.MdBlogs.render("blog_content", "./config.json", {
        title: true,
        banner: {
            tagName: "section",
            styleRefs: "x-part-g-banner",
            children: [{
                tagName: "img",
                props: {
                    alt: "Sth",
                    src: "../materials/icon.png"
                }
            }, {
                tagName: "span",
                children: "A thing that is thought to be important or worth taking notice of."
            }]
        },
        onselect(ev) {
            if (!ev) return;
            const article = ev.article;
            const model = ev.children;
            if (!article || !model) return;
            const arr: IArticleRenderExtension = { end: [] };
            if (article.isKind("calendar-decade")) appendDecadeCalendar(arr, article);
            if (arr.end.length > 0) ev.insertChildren("end", {
                tagName: "section",
                styleRefs: "x-part-blog-related",
                children: arr.end
            });
        }
    });
    updateMenuText();
}

}
