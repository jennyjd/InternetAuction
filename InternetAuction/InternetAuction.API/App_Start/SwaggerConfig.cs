using Swashbuckle.Application;
using System.Web.Http;

namespace InternetAuction.API
{
    public static class SwaggerConfig
    {
        public static void RegisterSwagger(HttpConfiguration config)
        {
            config
                .EnableSwagger(c => c.SingleApiVersion("v1", "InternetAuction API"))
                .EnableSwaggerUi();
        }
    }
}