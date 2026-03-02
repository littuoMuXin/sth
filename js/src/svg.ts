namespace PageCtrl {

export interface INumberScope {
    top: number;
    bottom: number;
    step: number;
}

export interface ISize {
    width: number;
    height: number;
}

export function scope(data: number[], count = 10): INumberScope {
    const max = Math.ceil(Math.max(...data));
    const min = Math.floor(Math.min(...data));
    const diff = max - min;
    const base = min < 0 ? min : (min > (diff * 2) ? (min - diff) : 0);
    let step = Math.ceil((max - base) / count);
    const pow = 10 ** (step.toString(10).length - 1);
    step = Math.ceil(step / pow) * pow;
    const top = Math.ceil((max + 1) / step) * step;
    const bottom = Math.floor(base / step) * step;
    return { top, bottom, step };
}

export function standard(data: number[], height: number) {
    const info = scope(data);
    const ratio = height / (info.top - info.bottom);
    const arr: number[] = [];
    for (let i of data) {
        arr.push(isNaN(i) || i == null ? NaN : height - (i - info.bottom) * ratio);
    }

    return { scope: info, list: arr };
}

function svg(items: Hje.DescriptionContract[], size: ISize) {
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

export function lineChart(data: number[], size: ISize) {
    const field = 60;
    const fieldStr = field.toString(10);
    const y3 = size.height.toString(10);
    size = { width: size.width - field, height: size.height - 20 }
    const { scope, list: ys } = standard(data, size.height);
    let path = "";
    const step = size.width / ys.length;
    let dashes = "";
    const y1 = size.height.toString(10);
    const y2 = (size.height - 4).toString(10);
    let x = 0;
    let m = true;
    const years: Hje.DescriptionContract[] = [];
    let year = 2017;
    for (let y of ys) {
        path += m ? "M " : "L ";
        m = isNaN(y);
        const xs = (x + field).toString(10);
        if (!m) path += `${xs},${y.toString(10)} `;
        x += step;
        dashes += `M ${xs},${y1} L ${xs},${y2} `;
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
    const y4 = size.height / 10;
    for (let i = 0; i < 10; i++) {
        const iStr = (i * y4).toString(10);
        dashes += `M ${fieldStr},${iStr} L ${(4 + field).toString(10)},${iStr}`;
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
    return svg([{
        tagName: "svg:path",
        props: {
            fill: "none",
            stroke: "gray",
            d: `M ${fieldStr},0 L ${fieldStr},${y1} L${(size.width + field).toString(10)},${y1}`
        }
    }, {
        tagName: "svg:path",
        props: {
            fill: "none",
            stroke: "gray",
            d: dashes
        }
    }, ...years, {
        tagName: "svg:path",
        props: {
            fill: "none",
            stroke: "gray",
            d: path
        }
    }], size);
}

// export function barChart(data: number[], size: ISize) {
// }

}
