using System.Web.Http;

namespace InternetAuction.API
{
    public static class CorsConfig
    {
        public static void RegisterCors(HttpConfiguration config)
        {
            config.EnableCors();
        }
    }
}