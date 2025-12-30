function initHome() {
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
    });
    DeepX.MdBlogs.generateMenuPromise("./articles/config.json", "blogs", {
        styleRefs: "link-item-blog",
        deep: -2,
        path: "./articles/",
        render(model, article, options) {
            if (!model.children || model.children.length !== 1 || !article) return;
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
                }]
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

function initBlog() {
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
            let insertion = 0;
            for (let i = 0; i < model.length; i++) {
                insertion++;
                if (model[i] && model[i].tagName === "main") break;
            }
            if (article.isKind("calendar-decade")) appendDecadeCalendar(ev);
        }
    });
    updateMenuText();
}

function appendDecadeCalendar(ev) {
    const article = ev.article;
    const model = ev.children;
    const now = new Date();
    const doy = daysOfYear(now);
    const dcd = doy % 10;
    const ty = Math.floor(doy / 10);
    const title = DeepX.MdBlogs.getLocaleString("today");
    let s;
    if (title === "今天") {
        s = `${now.getFullYear().toString(10)}年${ty.toString(10)}拾${dcd.toString(10)}日 或缩写为 ${now.getFullYear().toString(10)}/${ty.toString(10)}${dcd.toString(10)}`;
    } else {
        s = `the ${ty.toString(10)} ty ${dcd.toString(10)}`;
        switch (s) {
            case 1:
                s += "st";
                break;
            case 2:
                s += "nd";
                break;
            case 3:
                s += "rd";
                break;
            default:
                s += "th";
                break;
        }
        s = `${s}, ${now.getFullYear().toString(10)} or short as ${now.getFullYear().toString(10)}/${ty.toString(10)}${dcd.toString(10)}`;
    }

    ev.insertChildren("end", {
        tagName: "section",
        styleRefs: "x-part-blog-related",
        children: [{
            tagName: "h2",
            children: title
        }, {
            tagName: "p",
            children: s
        }, {
            tagName: "p",
            children: `(${now.toLocaleDateString()})`
        }]
    });
}

function daysOfYear(date) {
    const first = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return (first - new Date(date.getFullYear(), 0, 1)) / 86400000 + 1;
}

function updateMenuText() {
    const about = DeepX.MdBlogs.setElementText("topmenu-about", "about");
    if (about !== "关于") return;
    DeepX.MdBlogs.setElementProp("topmenu-stories", null, "故事");
    DeepX.MdBlogs.setElementProp("topmenu-games", null, "小游戏");
}
