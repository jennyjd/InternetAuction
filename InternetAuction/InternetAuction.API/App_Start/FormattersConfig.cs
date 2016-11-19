using System.Web.Http;

namespace InternetAuction.API
{
    public static class FormattersConfig
    {
        public static void RegisterFormatters(HttpConfiguration config)
        {
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }
    }
}