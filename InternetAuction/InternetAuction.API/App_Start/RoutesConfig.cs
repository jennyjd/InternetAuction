using System.Web.Http;

namespace InternetAuction.API
{
    public static class RoutesConfig
    {
        public static void RegisterRoutes(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{action}/{id}", new {id = RouteParameter.Optional});
        }
    }
}
