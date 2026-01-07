namespace PageCtrl {

const en = {
    name: "sth"
};

const zh: typeof en = {
    name: "sth"
};

const internal = {
    strings: en,
    "strings#zh": zh,
};

export function getLocaleString(key: keyof typeof en, options?: {
    mkt?: string | boolean;
}) {
    const strings = DeepX.MdBlogs.getLocaleProp(internal, "strings", options ? { mkt: options.mkt } : undefined) || {};
    return strings[key] || DeepX.MdBlogs.getLocaleString(key, options?.mkt);
}

}
