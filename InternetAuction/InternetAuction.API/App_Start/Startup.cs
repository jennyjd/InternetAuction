﻿using System.Web.Http;
using Owin;

namespace InternetAuction.API
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalConfiguration.Configure(RoutesConfig.RegisterRoutes);
            GlobalConfiguration.Configure(FormattersConfig.RegisterFormatters);
            //GlobalConfiguration.Configure(CorsConfig.RegisterCors);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            GlobalConfiguration.Configure(DependencyResolverConfig.RegisterDependencyResolver);

            IdentityConfig.RegisterIdentity(app);
        }
    }
}