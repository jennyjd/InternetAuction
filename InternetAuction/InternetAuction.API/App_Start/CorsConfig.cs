using System.Web.Http;
using System.Web.Http.Cors;

namespace InternetAuction.API
{
    public static class CorsConfig
    {
        public static void RegisterCors(HttpConfiguration config)
        {
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));
        }
    }
}