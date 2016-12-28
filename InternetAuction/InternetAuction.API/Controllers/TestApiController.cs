using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using InternetAuction.API.Infrastructure;
using InternetAuction.API.Models;
using InternetAuction.API.Repositories.Abstractions;
using Microsoft.AspNet.Identity.Owin;
using Ninject;
using System.Net.Http;
using System.IO;
using System.Net;
using System.Net.Http.Headers;
using InternetAuction.API.Infrastructure.Swagger;
using InternetAuction.API.Infrastructure.Swagger.Examples;
using Swashbuckle.Swagger.Annotations;
using Microsoft.AspNet.Identity;
using Bank.API;

namespace InternetAuction.API.Controllers
{
    public class TestApiController : ApiController
    {
        [Inject]
        public ICurrenciesRepository CurrenciesRepository { get; set; }


        [HttpGet]
        public IHttpActionResult GetCurrentUser()
        {
            var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<InternetAuctionUserManager>();
            var user1 = userManager.Find("Ivan", "IvanIvan");
            authenticationManager.SignOut();
            authenticationManager.SignIn(userManager.CreateIdentity(user1, DefaultAuthenticationTypes.ApplicationCookie));

            InternetAuctionUser user = HttpContext.Current.GetOwinContext()
                .GetUserManager<InternetAuctionUserManager>()
                .FindById(HttpContext.Current.User.Identity.GetUserId());

            return Ok(user);
        }


        [HttpPost]
        public IHttpActionResult GetCreditCreditCardFromBank(string number)
        {
            return Ok(CreditCardsOperations.GetCreditCard(number));
        }


        [HttpGet]
        public ICollection<Currency> Test1()
        {
            var users = HttpContext.Current.GetOwinContext().GetUserManager<InternetAuctionUserManager>().Users.ToList();
            return CurrenciesRepository.GetCurrencies().ToList();
        }


        [HttpGet]
        [Authorize]
        public string TestAuthorize()
        {
            return "Hello from TestAuthorize";
        }


        [HttpGet]
        public string TestMsg()
        {
            return "Hello from TestMsg";
        }


        [HttpGet]
        public HttpResponseMessage GetImg()
        {
            var response = new HttpResponseMessage();

            //create the multipart content and specify the boundary
            var multipartContent = new MultipartContent("mixed", "AaB03x");

            //add the friend document

            //grab the path for the image and open a stream
            var file = File.OpenRead(@"C:\Users\marko\Desktop\image-slider2.jpg");

            //create the content for the image. 
            var streamContent = new StreamContent(file);

            //set the content type
            streamContent.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");

            //create the disposition header
            var disposition = new ContentDispositionHeaderValue("attachment");
            disposition.FileName = "123.jpg";
            streamContent.Headers.ContentDisposition = disposition;

            //set the encoding
            streamContent.Headers.ContentEncoding.Add("binary");

            //add the image content to the multipart content
            multipartContent.Add(streamContent);












            var fileq = File.OpenRead(@"C:\Users\marko\Desktop\qwe\image-slider2.jpg");
            //create the content for the image. 
            streamContent = new StreamContent(fileq);

            //set the content type
            streamContent.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");

            //create the disposition header
             disposition = new ContentDispositionHeaderValue("attachment");
            disposition.FileName = "1234.jpg";
            streamContent.Headers.ContentDisposition = disposition;

            //set the encoding
            streamContent.Headers.ContentEncoding.Add("binary");

            //add the image content to the multipart content
            multipartContent.Add(streamContent);








            //set the response content and return it
            response.Content = multipartContent;
            return response;
        }



        [HttpGet]
        public HttpResponseMessage TestFileLoading()
        {
            var content = new MultipartContent("mixed");

            var a = HttpContext.Current.Request.Files;

            var i = a.GetMultiple("photos");

            using (var stream = new FileStream(@"C:\Users\marko\Desktop\image-slider2.jpg", FileMode.Open))
            {
                byte[] fileBytes = new byte[stream.Length];

                stream.Read(fileBytes, 0, fileBytes.Length);
                var result = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK,
                    //Content = new ByteArrayContent(fileBytes)
                };

                content.Add(new ByteArrayContent(fileBytes));
                //content.Add(new ByteArrayContent(fileBytes));

                result.Content = content;

                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");

                result.Content.Headers.ContentType = new MediaTypeHeaderValue("multipart/mixed");

                return result;
            }


            //    var stream = new MemoryStream();
            //// processing the stream.

            //var result = new HttpResponseMessage(HttpStatusCode.OK)
            //{
            //    Content = new ByteArrayContent(stream.GetBuffer())
            //};
            //result.Content.Headers.ContentDisposition =
            //    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
            //    {
            //        FileName = @"C:\Users\marko\Desktop\image-slider2.jpg"
            //    };
            //result.Content.Headers.ContentType =
            //    new MediaTypeHeaderValue("image/jpeg");

            //return result;

            //var file1Content = new StreamContent(new FileStream(@"C:\Users\marko\Desktop\image-slider2.jpg", FileMode.Open));

            //file1Content.Headers.ContentType = System.Net.Http.Headers.MediaTypeHeaderValue.Parse("image/jpeg");

            //content.Add(file1Content);

            //var response = new HttpResponseMessage();

            //response.Content = content;

            //return response;

        }
    }
}
