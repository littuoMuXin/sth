# [Decade Calendar](../)

## TypeScript

<!-- Start -->
```typescript
const m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
function getDayOfYear(date: Date) {
  let day = date.getDate() + m[date.getMonth()];
  if (m > 1) {
    let y = date.getFullYear();
    if (y % 4 === 0 && y % 100 !== 0 || y % 400 === 0)
      day++;
  }
  
  return day;
}

export class DecadeDate {
  #inner: {
      y: number;
      d: number;
  };

  constructor(date?: string | number | Date | null | undefined) {
    if (!date) date = new Date();
    if (typeof date === 'number') {
      #inner = {
        y: Math.floor(date / 1000),
        d: Math.floor(date % 1000)
      };
    } else if (date instanceof Date) {
      #inner = {
        y: date.getFullYear(),
        d: getDayOfYear(date)
      };
    } else if (typeof date !== 'string') {
      #inner = {
        y: NaN,
        d: NaN
      };
    } else {
      let arr = date.split('/');
      #inner = arr.length > 1 ? {
        y: parseInt(arr[0]),
        d: parseInt(arr[1])
      } : {
        y: NaN,
        d: NaN
      };
    }
  }

  public get isValid() {
    return !isNaN(#inner.y) && !isNaN(#inner.d);
  }

  public get date() {
    return #inner.d % 10;
  }

  public get decade() {
    return Math.floor(#inner.d / 10);
  }

  public get year() {
    return #inner.y;
  }

  public toDate() {
    return new Date(#inner.y, 0, #inner.d);
  }

  public toString() {
    if (isNaN(#inner.y) || isNaN(#inner.d))
      return "Invalid Date";
    let d = #inner.d.toString(10);
    if (d.length < 2) d = '0' + d;
    return #inner.y.toString(10)  + '/' + d;
  }
}
```

<!-- End -->
&copy; Kingcean Tuan, 2021.

[&lt; Back to article](../)
