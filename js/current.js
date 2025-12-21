function initHome() {
    DeepX.MdBlogs.setElementText("topmenu-about", "about");
    DeepX.MdBlogs.setElementText("topmenu-games", "games");
    const context = Hje.render(document.getElementById("blog_content"), {
        children: [{
            tagName: "div",
            children: DeepX.MdBlogs.getLocaleString("loading")
        }]
    });
    DeepX.MdBlogs.generateMenuPromise("./articles/config.json", "blogs", {
        styleRefs: "x-list-blogs",
        deep: -1,
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
        context.model().children = [{
            tagName: "h1",
            children: DeepX.MdBlogs.getLocaleString("blogs")
        }, r];
        context.refresh();
    }, function (r) {
        context.model().children = [{
            tagName: "div",
            children: DeepX.MdBlogs.getLocaleString("loadFailed")
        }];
        context.refresh();
    });
}

function initBlog() {
    const comp = DeepX.MdBlogs.render("blog_content", "./config.json", {
        title: true,
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
            if (article.isKind("calendar-decade")) appendDecadeCalendar(model, article, insertion);
        }
    });
    DeepX.MdBlogs.setElementText("topmenu-about", "about");
    DeepX.MdBlogs.setElementText("topmenu-games", "games");
}

function appendDecadeCalendar(model, article, insertion) {
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
    model.splice(insertion, 0, {
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
