# Decade Calendar

In the Gregorian calendar, a year consists of 12 months, each ranging from 28 to 31 days. Additionally, there is a 7-day weekly cycle. For example, the 45th day of a year can be calculated using a calendar and determined as February 14th. In 2021, this day fell on a Sunday, which was the third day of the first month in the lunar calendar (Chinese New Year), and also marked Western Valentine's Day.

Now, I want to invent a new calendar system—a simpler, more straightforward, and universally applicable solar-based calendar that aligns with the most fundamental mathematical knowledge humans learn. This calendar is called the **Decimal Calendar**.

In this calendar, a year has 37 months, starting from month 0 and ending with month 36. Month 0 contains 9 days, with the first day labeled as 0/1, the second as 0/2, and so on until 0/9. The subsequent months, from month 1 to 35, each contain 10 days, with the days labeled from 0 to 9 (e.g., the first day of month 1 is 1/0, the second is 1/1, and the tenth is 1/9). The final month (month 36) varies between regular and leap years, containing 6 days in regular years and 7 days in leap years, also starting from day 0. Thus, a year totals 365 days (9 + 10×35 + 6) or 366 days in leap years (9 + 10×35 + 7).

Since each month has at most 10 days, the concept of weeks is eliminated. Some may wonder, "What about weekends?" No problem—it's still recommended to implement a "two-day weekend" system, but not in the usual sense. Instead, even-numbered days are designated as rest days ("two-day weekend"), while odd-numbered days are workdays.

The term "month" is actually inaccurate in this context, as this "month" has no relation to the moon or its position relative to Earth. Therefore, a new term replaces "month" in the Decimal Calendar: **Ty** (pronounced /ti/, with the plural form **Ties**). Days are represented using ordinal numbers without a suffix, while the article is placed before Ty.

To summarize, here's an example: the 45th day of a year (February 14th) would be called **the four ty fifth**, or written as **the 4 ty 5th**. Western Valentine's Day falls on this day.

For convenience in writing, the Decimal Calendar can be abbreviated by omitting the word "ty." For example, **the four ty fifth** can be simplified to **the forty-fifth** or **the 45th**. You may notice an interesting feature: the Decimal Calendar allows for quick conversion between a date and the day of the year. For instance, the 45th day equals **the 4 ty 5th**, which also equals **the 45th**, and in English pronunciation, **the 4 ty 5th** and **the 45th** sound identical. Of course, some pronunciations may vary slightly, such as **the two ty first** compared to **the twenty-first**. Additionally, there might be minor imperfections, such as the 300th day, abbreviated as **the three hundredth** (the 300th), which is fine, but its full form **the thirty ty zeroth** may seem less elegant. Nevertheless, this is understandable. To simplify naming, we also define that the abbreviated form can be directly pronounced, e.g., **the three hundredth** for the previous example, and **the twenty-first** for **the two ty first**. Incidentally, since the first month is month 0, New Year's Day is called **the zero ty first** (the 0 ty 1st), or simply **the 01st**.

The aforementioned content refers to specific days within a year. When adding the year, how should it be written and read? For abbreviations, the year is placed at the beginning and separated by a slash (`/`). This rule applies universally across regions and languages. For example, the 45th day of 2020 (commonly known as February 14th, 2020) can be written as **2020/45**. Why design it this way? Because it is compatible with URIs. For instance, if someone published a blog titled "Hello World" on this day, its path might be `/blogs/2020/45/hello-world`, which appears harmonious. For the full form, the year is placed at the end, e.g., **The four ty fifth twenty twenty** or **The 4 ty 5th, 2020**.

To help you understand, here is the calendar for reference. All regular years are identical, while leap years add an extra day to the last Ty (the 366th day). You'll notice its simplicity and directness, making it almost unnecessary—another great benefit—no need for a calendar.

| Ty | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| -- | - | - | - | - | - | - | - | - | - | - |
| 0 |   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 2 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 3 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 4 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |

……(28 Ties omitted here)

| Ty | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| -- | - | - | - | - | - | - | - | - | - | - |
| 33 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 34 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 35 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 36 | 0 | 1 | 2 | 3 | 4 | 5 |   |   |   |   |

Here, **the 0 ty 1st** represents New Year's Day, and Ty 36 varies between regular and leap years. The example above is for a regular year.

That's the Decimal Calendar!

## Programming

In modern times, like many other commonly used pieces of information, calendars not only need to ensure proper usability for humans but also need to be well-supported in computer systems. Therefore, the following implementations in various programming languages are provided for reference.

- [TypeScript implementation](./type-script/)
- [C# implementation](./csharp/)

<!-- End -->
---

Kingcean Tuan ([@kingcean](https://github.com/kingcean))

Feb 24th, [2021 AD](../). 

Keywords:
calendar; idea.

**See also**

- [Generic decade calendar](./calendar)

(cc) Kingcean Tuan, 2021.
