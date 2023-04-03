namespace Kanoon.Utilities;


[Serializable]
public class AppResponse
{
    public int Status { get; set; }
    public dynamic Data { get; set; }
    public string Message { get; set; }
}

public static class Tools
{
    public static T To<T>(this IConvertible value)
    {
        try
        {
            Type t = typeof(T);
            Type u = Nullable.GetUnderlyingType(t);

            if (u != null)
            {
                if (value == null || value.Equals(""))
                    return default(T);

                return (T)Convert.ChangeType(value, u);
            }
            else
            {
                if (value == null || value.Equals(""))
                    return default(T);

                return (T)Convert.ChangeType(value, t);
            }
        }

        catch
        {
            return default(T);
        }
    }

    public static T To<T>(this IConvertible value, IConvertible ifError)
    {
        try
        {
            Type t = typeof(T);
            Type u = Nullable.GetUnderlyingType(t);

            if (u != null)
            {
                if (value == null || value.Equals(""))
                    return (T)ifError;

                return (T)Convert.ChangeType(value, u);
            }
            else
            {
                if (value == null || value.Equals(""))
                    return (T)(ifError.To<T>());

                return (T)Convert.ChangeType(value, t);
            }
        }
        catch
        {
            return (T)ifError;
        }
    }
}
