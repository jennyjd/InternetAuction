using System.Web.Http;
using InternetAuction.API.Infrastructure;

namespace InternetAuction.API
{
    public class DependencyResolverConfig
    {
        public static void RegisterCors(HttpConfiguration config)
        {
            config.DependencyResolver = new NinjectResolver();
        }
    }
}