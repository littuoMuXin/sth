"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var PageCtrl;
(function (PageCtrl) {
    function appendDecadeCalendar(arr, article) {
        var now = new Date();
        var doy = daysOfYear(now);
        var dcd = doy % 10;
        var ty = Math.floor(doy / 10);
        var title = DeepX.MdBlogs.getLocaleString("today");
        var s;
        if (title === "今天") {
            s = "".concat(now.getFullYear().toString(10), "\u5E74").concat(ty.toString(10), "\u62FE").concat(dcd.toString(10), "\u65E5 \u6216\u7F29\u5199\u4E3A ").concat(now.getFullYear().toString(10), "/").concat(ty.toString(10)).concat(dcd.toString(10));
        }
        else {
            s = "the ".concat(ty.toString(10), " ty ").concat(dcd.toString(10));
            switch (dcd) {
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
            s = "".concat(s, ", ").concat(now.getFullYear().toString(10), " or short as ").concat(now.getFullYear().toString(10), "/").concat(ty.toString(10)).concat(dcd.toString(10));
        }
        arr.end.push({
            tagName: "h2",
            children: title
        }, {
            tagName: "p",
            children: s
        }, {
            tagName: "p",
            children: "(".concat(now.toLocaleDateString(), ")")
        });
    }
    PageCtrl.appendDecadeCalendar = appendDecadeCalendar;
    function daysOfYear(date) {
        var first = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return (first.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 86400000 + 1;
    }
    function updateMenuText() {
        var about = DeepX.MdBlogs.setElementText("topmenu-about", "about");
        if (about !== "关于")
            return;
        DeepX.MdBlogs.setElementProp("topmenu-stories", null, "故事");
        DeepX.MdBlogs.setElementProp("topmenu-games", null, "小游戏");
    }
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    function initHome() {
        PageCtrl.updateMenuText();
        var title = {
            tagName: "h1",
            children: [{
                    tagName: "a",
                    props: {
                        href: "./articles/"
                    },
                    children: DeepX.MdBlogs.getLocaleString("blogs")
                }]
        };
        var context = Hje.render(document.getElementById("blog_content"), {
            children: [title, {
                    tagName: "div",
                    children: DeepX.MdBlogs.getLocaleString("loading")
                }]
        });
        DeepX.MdBlogs.generateMenuPromise("./articles/config.json", "blogs", {
            styleRefs: "link-item-blog",
            deep: -2,
            path: "./articles/",
            render: function (model, article, options) {
                if (!model.children || !(model.children instanceof Array) || model.children.length !== 1 || !article)
                    return;
                var localOptions = { mkt: options.mkt };
                var title = article.getName(localOptions);
                var firstLine = {
                    tagName: "div",
                    children: [{
                            tagName: "strong",
                            children: title
                        }, {
                            tagName: "span",
                            children: article.getSubtitle(localOptions)
                        }]
                };
                var publishDate = article.dateObj;
                var secondLine = {
                    tagName: "div",
                    children: [{
                            tagName: "time",
                            props: {
                                datetime: "".concat(publishDate.year.toString(10), "-").concat(publishDate.month.toString(10), "-").concat(publishDate.date.toString(10))
                            },
                            children: article.dateString
                        }]
                };
                var thumb = article.getThumb("wide");
                if (thumb)
                    secondLine.children.push({
                        tagName: "img",
                        props: {
                            alt: title,
                            src: thumb
                        }
                    });
                model.children[0].children = [firstLine, secondLine];
                var desc = article.getIntro(localOptions);
                if (desc)
                    model.children[0].children.push({
                        tagName: "div",
                        children: [{
                                tagName: "span",
                                children: article.getIntro(localOptions)
                            }]
                    });
                if (model.children[0].props)
                    delete model.children[0].props.title;
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
    PageCtrl.initHome = initHome;
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
            onselect: function (ev) {
                if (!ev)
                    return;
                var article = ev.article;
                var model = ev.children;
                if (!article || !model)
                    return;
                var arr = { end: [] };
                if (article.isKind("calendar-decade"))
                    PageCtrl.appendDecadeCalendar(arr, article);
                if (arr.end.length > 0)
                    ev.insertChildren("end", {
                        tagName: "section",
                        styleRefs: "x-part-blog-related",
                        children: arr.end
                    });
            }
        });
        PageCtrl.updateMenuText();
    }
    PageCtrl.initBlog = initBlog;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var en = {
        name: "sth"
    };
    var zh = {
        name: "sth"
    };
    var internal = {
        strings: en,
        "strings#zh": zh,
    };
    function getLocaleString(key, options) {
        var strings = DeepX.MdBlogs.getLocaleProp(internal, "strings", options ? { mkt: options.mkt } : undefined) || {};
        return strings[key] || DeepX.MdBlogs.getLocaleString(key, options === null || options === void 0 ? void 0 : options.mkt);
    }
    PageCtrl.getLocaleString = getLocaleString;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var inner = {
        size: {
            width: 400,
            height: 400,
        }
    };
    var StatComponent = /** @class */ (function (_super) {
        __extends(StatComponent, _super);
        function StatComponent(element, options) {
            var _this = _super.call(this, element, options) || this;
            _this.currentModel = {
                children: [{
                        //     tagName: "section",
                        //     children: [lineChart(totals(options.data.cnSoftware, "accumulative").map(item => {
                        //         return item?.revenue?.total ?? NaN;
                        //     }), inner.size)]
                        // }, {
                        key: "render-part",
                        tagName: "canvas",
                    }]
            };
            _super.prototype.refreshChild.call(_this);
            setTimeout(function () {
                renderBar(_super.prototype.childContext.call(_this, "render-part").element(), options.data.cnSoftware);
            }, 100);
            return _this;
        }
        return StatComponent;
    }(Hje.BaseComponent));
    PageCtrl.StatComponent = StatComponent;
    function total(data, mode) {
        if (!(data === null || data === void 0 ? void 0 : data.year))
            return undefined;
        var item;
        if (data.total) {
            item = data.total;
        }
        else if (data.items) {
            if (!(data.items instanceof Array))
                return undefined;
            item = data.items[data.items.length - 1];
            if (!item)
                return undefined;
        }
        else {
            return undefined;
        }
        return {
            year: data.year,
            revenue: item.revenue,
            profit: item.profit,
            cost: item.cost
        };
    }
    function totals(data, mode) {
        var arr = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var year = data_1[_i];
            var item = total(year, mode);
            if (item)
                arr.push(item);
        }
        return arr;
    }
    PageCtrl.totals = totals;
    function initStat(element) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("./revenue/data.json")];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        json = _a.sent();
                        Hje.render(element || "blog_content", { control: StatComponent, data: {
                                cnSoftware: json["cn-software"],
                                cnInternet: json["cn-internet"]
                            } });
                        return [2 /*return*/];
                }
            });
        });
    }
    PageCtrl.initStat = initStat;
    function renderBar(element, list) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof Chart === 'undefined')
                    return [2 /*return*/];
                new Chart(element, {
                    type: "bar",
                    data: {
                        labels: list.map(function (ele) {
                            return ele.year.toString(10);
                        }),
                        datasets: [{
                                label: "Revenue",
                                data: list.map(function (ele) {
                                    var _a, _b;
                                    return (_b = (_a = total(ele)) === null || _a === void 0 ? void 0 : _a.revenue) === null || _b === void 0 ? void 0 : _b.total;
                                })
                            }, {
                                label: "Profit",
                                data: list.map(function (ele) {
                                    var _a, _b;
                                    return (_b = (_a = total(ele)) === null || _a === void 0 ? void 0 : _a.profit) === null || _b === void 0 ? void 0 : _b.total;
                                })
                            }]
                    },
                });
                return [2 /*return*/];
            });
        });
    }
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    function scope(data, count) {
        if (count === void 0) { count = 10; }
        var max = Math.ceil(Math.max.apply(Math, data));
        var min = Math.floor(Math.min.apply(Math, data));
        var diff = max - min;
        var base = min < 0 ? min : (min > (diff * 2) ? (min - diff) : 0);
        var step = Math.ceil((max - base) / count);
        var pow = Math.pow(10, (step.toString(10).length - 1));
        step = Math.ceil(step / pow) * pow;
        var top = Math.ceil((max + 1) / step) * step;
        var bottom = Math.floor(base / step) * step;
        return { top: top, bottom: bottom, step: step };
    }
    PageCtrl.scope = scope;
    function standard(data, height) {
        var info = scope(data);
        var ratio = height / (info.top - info.bottom);
        var arr = [];
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var i = data_2[_i];
            arr.push(isNaN(i) || i == null ? NaN : height - (i - info.bottom) * ratio);
        }
        return { scope: info, list: arr };
    }
    PageCtrl.standard = standard;
    function svg(items, size) {
        return {
            children: [{
                    tagName: "svg:svg",
                    props: {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 400 400",
                        width: size.width.toString(10),
                        height: size.height.toString(10)
                    },
                    children: items
                }]
        };
    }
    function lineChart(data, size) {
        var field = 60;
        var fieldStr = field.toString(10);
        var y3 = size.height.toString(10);
        size = { width: size.width - field, height: size.height - 20 };
        var _a = standard(data, size.height), scope = _a.scope, ys = _a.list;
        var path = "";
        var step = size.width / ys.length;
        var dashes = "";
        var y1 = size.height.toString(10);
        var y2 = (size.height - 4).toString(10);
        var x = 0;
        var m = true;
        var years = [];
        var year = 2017;
        for (var _i = 0, ys_1 = ys; _i < ys_1.length; _i++) {
            var y = ys_1[_i];
            path += m ? "M " : "L ";
            m = isNaN(y);
            var xs = (x + field).toString(10);
            if (!m)
                path += "".concat(xs, ",").concat(y.toString(10), " ");
            x += step;
            dashes += "M ".concat(xs, ",").concat(y1, " L ").concat(xs, ",").concat(y2, " ");
            years.push({
                tagName: "svg:text",
                props: {
                    x: xs,
                    y: y3,
                    fill: "gray"
                },
                children: (year++).toString(10)
            });
        }
        var y4 = size.height / 10;
        for (var i = 0; i < 10; i++) {
            var iStr = (i * y4).toString(10);
            dashes += "M ".concat(fieldStr, ",").concat(iStr, " L ").concat((4 + field).toString(10), ",").concat(iStr);
            years.push({
                tagName: "svg:text",
                props: {
                    x: "0",
                    y: iStr,
                    fill: "gray"
                },
                children: (scope.top - scope.step * i).toString(10)
            });
        }
        return svg(__spreadArray(__spreadArray([{
                tagName: "svg:path",
                props: {
                    fill: "none",
                    stroke: "gray",
                    d: "M ".concat(fieldStr, ",0 L ").concat(fieldStr, ",").concat(y1, " L").concat((size.width + field).toString(10), ",").concat(y1)
                }
            }, {
                tagName: "svg:path",
                props: {
                    fill: "none",
                    stroke: "gray",
                    d: dashes
                }
            }], years, true), [{
                tagName: "svg:path",
                props: {
                    fill: "none",
                    stroke: "gray",
                    d: path
                }
            }], false), size);
    }
    PageCtrl.lineChart = lineChart;
    // export function barChart(data: number[], size: ISize) {
    // }
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    function updateMenuText() {
        var about = DeepX.MdBlogs.setElementText("topmenu-about", "about");
        if (about !== "关于")
            return;
        DeepX.MdBlogs.setElementProp("topmenu-stories", null, "故事");
        DeepX.MdBlogs.setElementProp("topmenu-games", null, "小游戏");
    }
    PageCtrl.updateMenuText = updateMenuText;
})(PageCtrl || (PageCtrl = {}));
//# sourceMappingURL=current.js.map