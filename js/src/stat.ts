namespace PageCtrl {

export interface IAmountData {
    total: number;
    yoy?: number;
    fields?: Record<string, number>;
    "fields-yoy"?: Record<string, number>;
}

export interface IAmountItem {
    revenue: IAmountData;
    profit: IAmountData;
    cost?: IAmountData;
}

export interface IAccumulativeSet {
    year: number;
    total?: IAmountItem;
    items?: IAmountItem[];
}

const inner = {
    size: {
        width: 400,
        height: 400,
    } as ISize
};

export class StatComponent extends Hje.BaseComponent {
    constructor(element: any, options: Hje.ComponentOptionsContract) {
        super(element, options);
        this.currentModel = {
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
        super.refreshChild();
        setTimeout(() => {
            renderBar(super.childContext("render-part").element(), options.data.cnSoftware);
        }, 100);
    }
}

function total(data: IAccumulativeSet, mode?: "accumulative"): (IAmountItem & {
    year: number;
}) | undefined {
    if (!data?.year) return undefined;
    let item: IAmountItem;
    if (data.total) {
        item = data.total;
    }
    else if (data.items) {
        if (!(data.items instanceof Array)) return undefined;
        item = data.items[data.items.length - 1];
        if (!item) return undefined;
    } else {
        return undefined;
    }
    return {
        year: data.year,
        revenue: item.revenue,
        profit: item.profit,
        cost: item.cost
    };
}

export function totals(data: IAccumulativeSet[], mode?: "accumulative") {
    const arr = [] as (IAmountItem & {
        year: number;
    })[];
    for (let year of data) {
        const item = total(year, mode);
        if (item) arr.push(item);
    }
    return arr;
}

export async function initStat(element: string | HTMLElement) {
    const resp = await fetch("./revenue/data.json");
    const json = await resp.json();
    Hje.render(element || "blog_content", { control: StatComponent, data: {
        cnSoftware: json["cn-software"],
        cnInternet: json["cn-internet"]
    } });
}

async function renderBar(element: HTMLElement, list: IAccumulativeSet[]) {
    if (typeof Chart === 'undefined') return;
    new Chart(element, {
        type: "bar",
        data: {
            labels: list.map(ele => {
                return ele.year.toString(10);
            }),
            datasets: [{
                label: "Revenue",
                data: list.map(ele => {
                    return total(ele)?.revenue?.total;
                })
            }, {
                label: "Profit",
                data: list.map(ele => {
                    return total(ele)?.profit?.total;
                })
            }]
        },
    })
}

}
