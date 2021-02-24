# 十进制历

在公历中，一年有12个月，每个月有28天到31天不等，另外，还有1周7天的周期。例如，某一年的第45天，查询日历推算可得，叫做2月14日，2021年的这一天是星期天，农历辛丑年正月初三，同时也是西方情人节。

现在我要发明一种新的历法，更简单、更直接的历法，符合人类所学最最基础数学知识的历法。这个历法叫做**十进制历**（Decade Calendar）。

在这个历法中，1年有37个月，从0开始计数，至36月结束。其中，0月有9天，第1天为0月1日，第2天为0月2日，以此类推，至0月9日；后续的1月到36月，每个月有10天，但不从1日开始为第1天，也是以0为计数，至9为止，即1月的第1天为1月0日，第2天为1月1日；最后一个月分平闰月，平月有5天，闰月有6天，也从0日开始计数。这样，1年也是365天，或在闰年是366天。

由于每个月只有最多10天，因此周的概念就被取消了。有人可能会问，那么周末怎么办？没关系，仍然推荐实行“双休日”制度，不过与大家理解的那个“双休日”版本可能不一样：双数（偶数）日休息（简称“双休日”），单数（奇数）日工作。

概念“月”，其实也不太准确，因为这个“月”和月亮及其相对于地球的位置并无关系，因此称为“月”并不合适。于是，一个新的名次代替了十进制日历里的“月”了，它叫“拾”（汉语拼音 shí），即“十”的大写数字。

综上，举个例子吧，某一年的第45天（2月14日），叫做4拾5日。

为了方便书写，十进制日历的简写，可以省略“拾”字，即示例中的4拾5日可以简写成45日。大家或许发现了一个惊人的秘密：通过十进制日历，可以快速在日期和一年的第几天之间，快速切换，就像第45天等于4拾5日也等于45日，且中文读音中，4拾5日和45日的读音也是一致的。不过，这里面似乎有个小瑕疵，例如，第300天，即30拾0日，简称300日没问题，但全称的中文读音类似三十十零日，貌似并不优雅，不过无所谓，也是能理解的，而且现在这种场景也允许多做三百日。顺便值得一提的是，因为首个月份是0月，因此元旦称为0月1日，或者简称01日。

那么英文怎么办呢？“拾”在前，“日”在后（无论是英国还是美国）；“拾”译为 Ty（音标 [ti]）；“日”部分采用序数词表示，无后缀，而冠词则放入“拾”的前面；简称的读法即为简称的序数词格式。如4拾5日为 The four ty fifth，简称45日则为 The forty-fifth。

简称中，年份加在最前面，并用斜线（Slash `/`）隔开，所有语言和地区都是如此。例如，2020年4拾5日（即人们熟知的2020年2月14日）可以表示为 2020/45。这是为什么呢？因为这样能兼容 URI。如，有人在该示例日时发布了一篇名为 Hello World 的博客，其地址的路径部分可能是 `/blog/2020/45/hello-world`，显得非常协和。而全称中，中文为二零二零年四拾五日，英文为 Four ty fifth twenty twenty（即年份依然可以放在后面）。

为了方便大家了解，日历奉上，如下，所有平年都是一样的，闰年则在最后的36拾多个6日（即366日）。所以，你也会发现，它是如此的简单粗暴，以至于显得没什么用——这也是一个很棒的好处——无需日历。

| 拾 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| -- | - | - | - | - | - | - | - | - | - | - |
| 0 | | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 2 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 3 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 4 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 5 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |

……（此处省略28个月）

| 拾 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| -- | - | - | - | - | - | - | - | - | - | - |
| 34 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 35 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 36 | 0 | 1 | 2 | 3 | 4 | 5 | | | | |

其中，0拾1日为元旦，36拾分平闰，以上示例为平年。

以上，就是“十进制历”啦。

## 程序

嗯，现代，如同其它许多常用信息一样，历法，不光需要支持人类用法，还需要计算机也能支持。

```typescript
const m = [31, 28, 31, 30, 31 ,30, 31 ,31, 30, 31, 30, 31];

function getDayOfYear(date: Date) {
  let day = date.getDate();
  for (var i = 0; i < date.getMonth(); i++) {
    day += m[i];
  }

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

---

Kingcean Tuan (@kingcean)

Feb 24th, 2020 AD. 

Keywords:
calendar; idea.
