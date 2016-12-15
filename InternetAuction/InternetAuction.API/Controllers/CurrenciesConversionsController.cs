using InternetAuction.API.Repositories.Abstractions;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InternetAuction.API.Controllers
{
    [RoutePrefix("api/CurrenciesConversions")]
    public class CurrenciesConversionsController : ApiController
    {
        [Inject]
        public ICurrenciesConversionsRepository CurrenciesConversionsRepository { get; set; }


        [HttpGet]
        [Route]
        public IHttpActionResult Get()
        {
            return Ok(CurrenciesConversionsRepository.GetCurrenciesConversionsTable());
        }


        [HttpGet]
        [Route("{fromCurrencyId}")]
        public IHttpActionResult Get(int fromCurrencyId)
        {
            return Ok(CurrenciesConversionsRepository.GetCurrenciesConversionsTable(fromCurrencyId));
        }


        [HttpGet]
        [Route("{fromCurrencyId}/{toCurrencyId}")]
        public IHttpActionResult Get(int fromCurrencyId, int toCurrencyId)
        {
            return Ok(CurrenciesConversionsRepository.GetCurrencyConversion(fromCurrencyId, toCurrencyId));
        }
    }
}
