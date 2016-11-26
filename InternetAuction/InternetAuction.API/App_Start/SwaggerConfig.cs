using InternetAuction.API.Infrastructure.Swagger;
using Swashbuckle.Application;
using System;
using System.IO;
using System.Web.Http;

namespace InternetAuction.API
{
    public static class SwaggerConfig
    {
        public static void RegisterSwagger(HttpConfiguration config)
        {
            config.EnableSwagger(configure => 
                {
                    configure.SingleApiVersion("v1", "InternetAuction API");
                    configure.IncludeXmlComments(Path.Combine(AppDomain.CurrentDomain.BaseDirectory + @"bin\", "InternetAuction.API.XML"));
                    configure.OperationFilter<ExamplesOperationFilter>();
                })
                .EnableSwaggerUi();
        }
    }
}