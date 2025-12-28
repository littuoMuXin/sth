function parseNumber(s) {
    s = s.replace(" ", "");
    if (s.indexOf("%") < 0) return parseFloat(s);
    s = s.replace("%", "");
    return parseFloat(s) * 0.01;
}

function softwareToJSON(s) {
    return s.split('\n').map(row => {
        if (!row) return undefined;
        const items = row.split('\t');
        return {
            revenue: {
                total: parseNumber(items[0]),
                fields: {
                    software: parseNumber(items[1]),
                    its: parseNumber(items[2]),
                    security: parseNumber(items[3]),
                    embed: parseNumber(items[4]),
                    export: parseNumber(items[5])
                },
                yoy: parseNumber(items[7])
            },
            profit: {
                total: parseNumber(items[6]),
                yoy: parseNumber(items[8])
            }
        }
    });
}

function internetToJSON(s) {
    return s.split('\n').map(row => {
        if (!row) return undefined;
        const items = row.split('\t');
        return {
            revenue: {
                total: parseNumber(items[0]),
                yoy: parseNumber(items[3])
            },
            profit: {
                total: parseNumber(items[1]),
                yoy: parseNumber(items[4])
            },
            cost: {
                fields: {
                    rnd: parseNumber(items[2])
                },
                "fields-yoy": {
                    rnd: parseNumber(items[5])
                }
            }
        }
    });
}
