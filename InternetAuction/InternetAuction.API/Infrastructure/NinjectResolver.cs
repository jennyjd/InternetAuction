using System;
using System.Collections.Generic;
using System.Web.Http.Dependencies;
using InternetAuction.API.Repositories;
using InternetAuction.API.Repositories.Abstractions;
using Ninject;
using Ninject.Extensions.ChildKernel;

namespace InternetAuction.API.Infrastructure
{
    public class NinjectResolver : IDependencyResolver
    {
        private readonly IKernel _kernel;


        public NinjectResolver() : this(new StandardKernel())
        {
        }


        public NinjectResolver(IKernel ninjectKernel, bool scope = false)
        {
            _kernel = ninjectKernel;
            if (!scope)
            {
                AddBindings(_kernel);
            }
        }


        public IDependencyScope BeginScope()
        {
            return new NinjectResolver(AddRequestBindings(new ChildKernel(_kernel)), true);
        }


        public object GetService(Type serviceType)
        {
            return _kernel.TryGet(serviceType);
        }


        public IEnumerable<object> GetServices(Type serviceType)
        {
            return _kernel.GetAll(serviceType);
        }


        public void Dispose()
        {
        }


        private void AddBindings(IKernel kernel)
        {
            // singleton and transient bindings go here
        }


        private IKernel AddRequestBindings(IKernel kernel)
        {
            kernel.Bind<ICurrenciesRepository>().To<CurrenciesRepository>().InSingletonScope();
            kernel.Bind<IClientsRepository>().To<ClientsRepository>().InSingletonScope();
            kernel.Bind<IAuctionsCategoriesRepository>().To<AuctionsCategoriesRepository>().InSingletonScope();
            kernel.Bind<IAuctionsRepository>().To<AuctionsRepository>().InSingletonScope();
            kernel.Bind<ICreditCardsRepository>().To<CreditCardsRepository>().InSingletonScope();
            kernel.Bind<IGoodsSateRepository>().To<GoodsSateRepository>().InSingletonScope();
            return kernel;
        }
    }
}