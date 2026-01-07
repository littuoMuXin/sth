namespace PageCtrl {

export function appendDecadeCalendar(arr: IArticleRenderExtension, article: DeepX.MdBlogs.ArticleInfo) {
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
        s = `${s}, ${now.getFullYear().toString(10)} or short as ${now.getFullYear().toString(10)}/${ty.toString(10)}${dcd.toString(10)}`;
    }

    arr.end.push({
        tagName: "h2",
        children: title
    }, {
        tagName: "p",
        children: s
    }, {
        tagName: "p",
        children: `(${now.toLocaleDateString()})`
    });
}

function daysOfYear(date: Date) {
    const first = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return (first.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 86400000 + 1;
}

function updateMenuText() {
    const about = DeepX.MdBlogs.setElementText("topmenu-about", "about");
    if (about !== "关于") return;
    DeepX.MdBlogs.setElementProp("topmenu-stories", null, "故事");
    DeepX.MdBlogs.setElementProp("topmenu-games", null, "小游戏");
}

}
