// Simple blog engine.
let site = {};
(function(site) {

    let rootContext;
    let info = {};
    let strings = {};
    let settings = {};

    function clearArray(arr) {
        while (arr.length > 0) arr.pop();
    }

    function genHeadItem(ele, level) {
        return {
            text: ele.innerText,
            level: level,
            scroll() {
                ele.scrollIntoView({ behavior: "smooth" });
            }
        };
    }

    function genHeadModel(item, sub) {
        let text = item.text;
        if (sub) text = "·　" + text;
        return {
            tagName: "li",
            children: [{
                tagName: "a",
                props: { href: "javascript:void(0)" },
                on: {
                    click(ev) {
                        if (typeof item.scroll === 'function') item.scroll();
                    }
                },
                children: text
            }]
        }
    }

    function getHeadings(container) {
        let arr = [];
        for (let i = 0; i < container.children.length; i++) {
            para = container.children[i];
            if (!para || !para.tagName) continue;
            let tagName = para.tagName.toLowerCase();
            switch (tagName) {
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                    arr.push(genHeadItem(para, parseInt(tagName.replace("h", ""))));
                    break;
            }
        }

        return arr;
    }

    function getHeadingLevels(arr) {
        if (!arr || arr.length < 1) return [];
        let list = [];
        for (let level = 1; level < 7; level++) {
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if (!item || item.level != level) continue;
                list.push(level);
                break;
            }
        }

        return list;
    }

    function getChildModel(key) {
        try {
            return rootContext.childContext(key).model();
        } catch (ex) { }
        return undefined;
    }

    function setChildChildren(key, children) {
        let m = getChildModel(key);
        if (m) m.children = children;
        return m;
    }

    function refreshChild(key) {
        try {
            return rootContext.childContext(key).refresh();
        } catch (ex) { }
    }

    function genNotification(value) {
        return setChildChildren("content", [
            { tagName: "em", children: value }
        ]);
    }

    function resetContentMenu() {
        let m = getChildModel("cntMenu");
        if (!m) return undefined;
        m.children = [];
        m.style = { display: "none" };
        delete m.data;
        return m
    }

    function getSubFile(item, sub) {
        if (!item || !sub || !item.subs) return {};
        if (sub.endsWith(".md")) {
            sub = sub.substring(0, sub.length - 3);
            if (sub.endsWith("/README")) sub = sub.substring(0, sub.length - 7);
        }
        else if (sub.endsWith("/")) {
            sub = sub.substring(0, sub.length - 1);
        }

        let id = sub;
        if (item.subs === true) return { id: sub, file: sub + ".md" };
        if (!(item.subs instanceof Array)) return {};
        let sub1 = sub + ".md";
        let sub2 = sub + "/README.md";
        for (var i = 0; i < item.subs.length; i++) {
            let subItem = item.subs[i];
            if (!subItem) continue;
            if (subItem.startsWith("/")) subItem = subItem.substring(1);
            let name;
            if (typeof subItem !== 'string') {
                subItem = subItem.url;
                name = subItem.name;
            }

            if (subItem != sub1 && subItem != sub2) continue;
            return { id: id, file: subItem, name: name };
        }

        return {};
    }

    function renderArticle(id) {
        let context = rootContext;
        if (!context) return;
        resetContentMenu();
        setChildChildren("note", undefined);
        let relatedContainer = getChildModel("relatedContainer");
        relatedContainer.style = { display: "none" };
        relatedContainer.children = [];
        let item;
        var sub;
        if (id) {
            var subOffset = id.lastIndexOf("/");
            if (subOffset > 0) {
                sub = id.substring(subOffset + 1);
                id = id.substring(0, subOffset);
            }

            let list = info.list;
            for (let i in list) {
                let ele = list[i];
                if (!ele || ele.id !== id) continue;
                item = ele;
                break;
            }

            sub = getSubFile(item, sub).file;
        }

        if (!item || item.invalid) {
            setChildChildren("title", settings.disableTitle ? undefined : info.name);
            let cnt = getChildModel("content");
            if (cnt) {
                delete cnt.data;
                cnt.styleRefs = "x-part-blog-menu";
                cnt.children = [];
                if (settings.banner instanceof Array) {
                    for (var i = 0; i < settings.banner.length; i++) {
                        let banner = settings.banner[i];
                        if (banner) cnt.children.push(banner);
                    }
                }

                cnt.children.push({
                    tagName: "ul",
                    styleRefs: "link-tile-compact",
                    children: genMenu()
                });
            }

            context.refresh();
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setChildChildren("title", item.name);
        genNotification(strings.loading || "Loading…");
        context.refresh();
        let relaPath = "/" + (settings.rootPath || "blog");
        try {
            let testRootPath = relaPath + "/";
            if (location.pathname.endsWith(testRootPath)) relaPath = ".";
        } catch (ex) {}
        var url = relaPath + item.url;
        if (sub) url = relaPath + "/" + item.dir + "/" + item.file + "/" + sub;
        $.get(url).then(function (r2) {
            if (sub) {
                if (sub.indexOf("/") > 0)
                    r2 = r2.replace(/\(..\/..\//g, "(" + relaPath + item.dir + "/").replace(/\(..\//g, "(" + relaPath + item.dir + "/" + item.file + "/");
                else
                    r2 = r2.replace(/\(..\//g, "(" + relaPath + item.dir + "/").replace(/\(.\//g, "(" + relaPath + item.dir + "/" + item.file + "/");
            } else {
                if (item.url.endsWith("/README.md"))
                    r2 = r2.replace(/\(..\//g, "(" + relaPath + item.dir + "/").replace(/\(.\//g, "(" + relaPath + item.dir + "/" + item.id + "/");
                else
                    r2 = r2.replace(/\(.\//g, "(" + relaPath + item.dir + "/");
            }

            let header1 = "# " + item.name + "\n";
            if (r2.startsWith(header1)) r2 = r2.substring(header1.length);
            header1 = "# " + item.name + "\r\n";
            if (r2.startsWith(header1)) r2 = r2.substring(header1.length);
            if (item.end) {
                let endTag = "\n<!-- " + (item.end === true ? "End" : item.end) + " -->";
                let endIndex = r2.lastIndexOf(endTag);
                if (endIndex > 1) r2 = r2.substring(0, endIndex);
            }

            let noteEles = [];
            if (item.author) {
                if (typeof item.author === "string") item.author = { name: item.author };
                if (item.author.name && !item.author.hide) {
                    noteEles.push(item.author.url ? {
                        tagName: "a",
                        props: {
                            href: item.author.url
                        },
                        children: item.author.name
                    } : {
                        tagName: "span",
                        children: item.author.name
                    });
                }
            }

            if (typeof item.date === "string" && item.date.length > 7 && item.date.indexOf("-") < 0) {
                let time = new Date(parseInt(item.date.substring(0, 4)), parseInt(item.date.substring(4, 6)) - 1, parseInt(item.date.substring(6, 8)));
                if (!isNaN(time)) noteEles.push({
                    tagName: "time",
                    props: {
                        datetime: time.getFullYear().toString(10) + "-" + (time.getMonth() + 1).toString(10) + "-" + time.getDate().toString(10)
                    },
                    children: time.toLocaleDateString()
                });
                else noteEles.push({
                    tagName: "time",
                    props: {
                        datetime: item.date.substring(0, 4)
                    },
                    children: "'" + item.date.substring(0, 4)
                })

                if (typeof item.location === "string") noteEles[noteEles.length - 1].children += "  " + item.location;
            }

            if (item.categories && item.categories instanceof Array && item.categories.length > 0) {
                for (let i in item.categories) {
                    let category = item.categories[i];
                    if (category) noteEles.push({
                        tagName: "span",
                        children: category
                    });
                }
            }

            setChildChildren("note", noteEles);
            let cnt = getChildModel("content");
            if (cnt) {
                cnt.data = { value: r2, sub: sub, id: id };
                delete cnt.styleRefs;
                delete cnt.children;
            }

            if (item.notes) {
                if (typeof item.notes === "string") item.notes = [item.notes];
                if (item.notes instanceof Array) {
                    for (let i = 0; i < item.notes.length; i++) {
                        let noteLine = item.notes[i];
                        if (!noteLine) continue;
                        relatedContainer.children.push({
                            tagName: "p",
                            children:　[{
                                tagName: "span",
                                children: noteLine
                            }]
                        });
                    }
                }
            }

            if (item.related && item.related.length > 0) {
                let relatedList = item.related.map(function (ele) {
                    if (!ele || !ele.name || !ele.url) return null;
                    return {
                        tagName: "li",
                        children: [{
                            tagName: "a",
                            props: { href: ele.url },
                            children: ele.subtitle ? [
                                { tagName: "span", children: ele.name },
                                { tagName: "span", children: ele.subtitle }
                            ] : ele.name
                        }]
                    }
                }).filter(function (ele) {
                    return ele != null;
                });
                if (relatedList.length > 0) {
                    relatedContainer.children.push({
                        tagName: "h2",
                        children:　strings.seeAlso || "See also"
                    });
                    relatedContainer.children.push({
                        tagName: "ul",
                        styleRefs: "link-tile-compact",
                        children: relatedList
                    });
                }
            }

            if (!sub && relatedContainer.children.length > 0) delete relatedContainer.style;
            context.refresh();
        }, function (r) {
            clearArray(model);
            genNotification(strings.loadFailed || "Load failed.");
            context.refresh();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function genMenu(list, callback) {
        let col = [];
        if (!list) list = info.list;
        if (!list) return col;
        let year = null;
        list.forEach(function (item) {
            if (!item || item.invalid) return;
            if (typeof item.date === "string" && item.date.length > 3) {
                let y = item.date.substring(0, 4);
                if (y !== year) col.push({
                    tagName: "li",
                    styleRefs: "grouping-header",
                    children: y
                });
                year = y;
            }

            let link = {
                tagName: "a",
                props: { href: "?" + item.id },
                on: {
                    click(ev) {
                        if (ev.preventDefault) ev.preventDefault();
                        else ev.returnValue = false;
                        renderArticle(item.id);
                        history.pushState({ id: item.id }, "", "?" + item.id);
                    }
                },
                children: item.subtitle ? [
                    { tagName: "span", children: item.name },
                    { tagName: "span", children: item.subtitle }
                ] : item.name
            };
            if (typeof callback === "function") callback(link);
            col.push({
                tagName: "li",
                children: [link]
            });
        });
        return col;
    }

    function getMenu(list, linkGenCallback) {
        list.reverse().forEach(function (item) {
            if (!item) return;
            if (!item.url || item.url.length < 12) {
                item.invalid = true;
                return;
            }

            let fileName = item.url.substring(6);
            let fileDate = item.url.substring(1, 5).replace("/", "").replace("/", "");
            let fileExtPos = fileName.indexOf(".");
            let fileExt = fileExtPos >= 0 ? fileName.substring(fileExtPos + 1) : "";
            fileName = fileExtPos > 0 ? fileName.substring(0, fileExtPos) : "";
            if (!fileName) {
                item.invalid = true;
                return;
            }

            if (fileName.endsWith("/README")) fileName = fileName.substring(0, fileName.length - 7);
            item.file = fileName;
            if (!item.id) item.id = fileName;
            if (!item.date) item.date = fileDate;
            if (!item.type) item.type = fileExt;
            item.dir = item.url.substring(0, 5);
        });
        return genMenu(list, linkGenCallback);
    }

    function configUrl() {
        let lang = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage;
        return settings.menuPath || (lang.indexOf("zh") === 0 ? "zh-Hans.json" : "en.json");
    }

    function render() {
        if (!rootContext) return;
        let model = rootContext.model();
        if (!model) return;
        let id = site.firstQuery();
        $.get(configUrl()).then(function (r) {
            if (!r || !r.list || !(r.list instanceof Array)) return;
            setChildChildren("blogTitle", r.name || "Blogs");
            let menu = getMenu(r.list);
            info.name = r.name;
            info.list = r.list;
            setChildChildren("articles", menu);
            renderArticle(id);
        }, function (r) {
            genNotification(strings.loadFailed || "Load failed.");
            rootContext.refresh();
        });
    }

    site.regStrings = function (map) {
        let keys = Object.keys(map);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (key) strings[key] = map[key];
            else delete strings[key];
        }
    }

    site.headings = function (ele) {
        if (!ele) return null;
        return getHeadings(ele);
    }

    site.query = function (name) {
        url = location.search;
        if (name == null)
            return null;
        try {
            if (typeof name === "string") {
                let result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                if (result == null || result.length < 1) return "";
                return notToDecode ? result[1] : decodeURIComponent(result[1]);
            } else if (typeof name === "number") {
                let result = url.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
                if (result == null) return "";
                return notToDecode ? result[name].substring(1) : decodeURIComponent(result[name].substring(1));
            }
        }
        catch (ex) { }
        return null;
    };

    site.firstQuery = function () {
        let id = location.search;
        if (!!id && id.length > 1) {
            id = id.substring(1);
            let idEndPos = id.indexOf("?");
            if (idEndPos >= 0) id = id.substring(0, idEndPos);
            idEndPos = id.indexOf("&");
            if (idEndPos >= 0) id = id.substring(0, idEndPos);
        }

        return id;
    };

    site.head = function (ext, menu, needInsert) {
        let cntEle = document.createElement("header");
        cntEle.id = "page_head";
        cntEle.innerHTML = "<section><h1><a href=\"https://kingcean." + ext + "\"><strong>Kingcean</strong><span>." + ext + "</span></a></h1><ul>"
            + menu.map(ele => "<li><a href=\"" + ele.url + "\">" + ele.name + "</a></li>").join("")
            + "</ul></section>";
        if (needInsert) document.body.insertBefore(cntEle, document.body.children[0]);
        else document.body.appendChild(cntEle);
    };

    site.blogMenu = function(url, linkGenCallback) {
        if (!url) url = configUrl();
        return $.get(url).then(function (r) {
            if (!r || !r.list || !(r.list instanceof Array)) return;
            return {
                tagName: "ul",
                styleRefs: "link-tile-compact",
                children: getMenu(r.list, linkGenCallback)
            };
        });
    };

    site.blogs = function (options) {
        let cntEle = document.getElementById("blog_content");
        if (!cntEle) {
            cntEle = document.createElement("section");
            cntEle.id = "blog_content";
            document.body.appendChild(cntEle);
        }

        if (options) {
            settings.banner = options.banner;
            settings.rootPath = options.rootPath;
            settings.disableTitle = options.disableTitle;
            settings.menuPath = options.menuPath;
        }

        let hasInit = rootContext != null;
        rootContext = Hje.render(cntEle, {
            children: [{
                tagName: "article",
                children: [{
                    key: "title",
                    tagName: "h1"
                }, {
                    key: "note",
                    tagName: "section",
                    styleRefs: "x-part-blog-note"
                }, {
                    key: "content",
                    tagName: "main",
                    children: [{
                        tagName: "em",
                        children: strings.loading || "Loading…"
                    }],
                    onInit(c) {
                        let mdEle = c.element();
                        let mdModel = c.model();
                        if (!mdEle || !mdModel || !mdModel.data || mdModel.data.done) return;
                        mdModel.data.done = true;
                        mdEle.innerHTML = marked.parse(mdModel.data.value);
                        let eles = mdEle.getElementsByTagName("a");
                        let list = info.list;
                        for (let i = 0; i < eles.length; i++) {
                            let ele = eles[i];
                            if (!ele || !ele.href) continue;
                            let eleUrl = ele.getAttribute("href");
                            if (!eleUrl) continue;
                            if (eleUrl.startsWith("./")) eleUrl = eleUrl.substring(1);
                            else continue;
                            if (eleUrl.endsWith("/README.md")) eleUrl = eleUrl.substring(0, eleUrl.length - 10);
                            else if (eleUrl.endsWith("/")) eleUrl = eleUrl.substring(0, eleUrl.length - 1);
                            var eleUrlArr = eleUrl.split("/");
                            if (eleUrlArr.length < 3 || eleUrlArr.length > 4) continue;
                            var enableSub = eleUrlArr.length == 4 && eleUrlArr[3];
                            for (var j = 0; j < list.length; j++) {
                                let article = list[j];
                                if (!article || !article.id) continue;
                                let subPath = article.id;
                                if (enableSub) {
                                    if (article.id !== eleUrlArr[2] || !article.subs || article.dir !== ("/" + eleUrlArr[1])) continue;
                                    let subFile = getSubFile(article, eleUrlArr[3]).id;
                                    if (!subFile) continue;
                                    subPath += "/" + subFile;
                                } else {
                                    let articleUrl = article.dir + "/" + article.id;
                                    if (article.url !== eleUrl && articleUrl !== eleUrl) continue;
                                }

                                ele.href = "?" + subPath;
                                ele.addEventListener("click", function (ev) {
                                    if (ev.preventDefault) ev.preventDefault();
                                    else ev.returnValue = false;
                                    renderArticle(subPath);
                                    history.pushState({ id: subPath }, "", "?" + subPath);
                                });
                                break;
                            }
                        }

                        let contentMenu = getChildModel("cntMenu");
                        if (!contentMenu) return;
                        let headers = getHeadings(mdEle);
                        let levels = getHeadingLevels(headers);
                        if (!headers || headers.length < 2 || levels.length < 1) {
                            resetContentMenu();
                            return;
                        }

                        delete contentMenu.style;
                        contentMenu.children = [];
                        contentMenu.children.push({
                            tagName: "li",
                            children: [{
                                tagName: "a",
                                props: { href: "javascript:void(0)" },
                                on: {
                                    click(ev) {
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }
                                },
                                children: "⇮ " + (strings.top || "Top")
                            }]
                        });
                        if (levels.length == 1) levels.push(levels[0] + 1);
                        for (let i = 0; i < headers.length; i++) {
                            let item = headers[i];
                            switch (item.level) {
                                case levels[0]:
                                    contentMenu.children.push(genHeadModel(item));
                                    break;
                                case levels[1]:
                                    contentMenu.children.push(genHeadModel(item, true));
                                    break;
                            }
                        }

                        refreshChild("cntMenu");
                    }
                }, {
                    key: "relatedContainer",
                    styleRefs: "x-part-blog-related",
                    tagName: "section",
                    style: { display: "none" },
                    children: []
                }]
            }, {
                tagName: "aside",
                children: [{
                    tagName: "nav",
                    children: [{
                        key: "cntMenu",
                        tagName: "ul",
                        styleRefs: "link-tile-compact",
                        children: [],
                        style: { display: "none" }
                    }, {
                        tagName: "h1",
                        children: [{
                            key: "blogTitle",
                            tagName: "a",
                            props: { href: "./" },
                            on: {
                                click(ev) {
                                    if (ev.preventDefault) ev.preventDefault();
                                    else ev.returnValue = false;
                                    renderArticle(undefined);
                                    history.pushState({}, "", "./");
                                }
                            }
                        }]
                    }, {
                        key: "articles",
                        tagName: "ul",
                        styleRefs: "link-tile-compact",
                        children: []
                    }]
                }]
            }]
        });
        render();
        if (hasInit) return;
        window.addEventListener("popstate", function (ev) {
            renderArticle(ev.state ? ev.state.id : undefined);
        });
    };
    
})(site || (site = {}));
