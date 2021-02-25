# [Decade Calendar](../)

## C#

```csharp
public struct DecadeDate
{
    public DecadeDate()
        : this(DateTime.Now)
    {
    }

    public DecadeDate(DateTime date)
    {
        Year = date.Year;
        DayOfYear = date.DayOfYear;
        var day = date.DayOfYear + 1;
        Decade = day / 10;
        Day = day % 10;
    }

    public DecadeDate(int year, int day)
        : this(year, 0, day)
    {
    }

    public DecadeDate(int year, int decade, int day)
        : this(CreateDateTime(year, decade, day))
    {
    }

    public int Year { get; }

    public int Decade { get; }

    public int Day { get; }

    public int DayOfYear { get; }

    public bool IsOddDay => Day % 2 == 1;

    public bool IsEvenDay => Day % 2 == 0;

    public DecadeDate AddDays(int days)
    {
        var date = (DateTime)this;
        date = date.AddDays(days);
        return new DecadeDate(date);
    }

    public DecadeDate AddDecade(int decades)
    {
        var date = (DateTime)this;
        date = date.AddDays(decades * 10);
        return new DecadeDate(date);
    }

    public DecadeDate AddYears(int years)
    {
        var date = (DateTime)this;
        date = date.AddYears(days);
        return new DecadeDate(date);
    }

    public override string ToString()
        => $"{Year}/${Day:00}";
    
    public static bool TryParse(string s, out DecadeDate result)
    {
        s = s?.Trim()?.ToLowerInvariant();
        if (string.IsNullOrEmpty(s))
        {
            result = default;
            return false;
        }

        var arr = s.Split('/');
        if (arr.Length < 2
            || !int.TryParse(arr[0], out var y)
            || !int.TryParse(arr[1], out var d))
        {
            result = default;
            return false;
        }

        try
        {
            result = new DecadeDate(y, d);
            return true;
        }
        catch (ArgumentException)
        {
            result = default;
            return false;
        }
    }

    public static DecadeDate? TryParse(string s)
    {
        if (TryParse(s, out var d)) return d;
        return null;
    }

    public static DecadeDate Parse(string s)
    {
        if (TryParse(s, out var d)) return d;
        throw new FormatException("s is invalid");
    }

    public static explicit operator DateTime(DecadeDate d)
    {
        var date = new Date(year, 1, 1);
        date.AddDays(dd.DayOfYear - 1);
        return date;
    }

    private static DateTime CreateDateTime(int year, int decade, int day)
    {
        var date = new Date(year, 1, 1);
        date.AddDays(decade * 10 + day - 1);
        return date;
    }
}
```

[&lt; Back to article](../)
