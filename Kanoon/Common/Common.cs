namespace Kanoon.Common;

public class Common
{
    [Serializable]
    public class AppResponse
    {
        public int Status { get; set; }
        public dynamic Data { get; set; }
        public string Message { get; set; }
    }
}
