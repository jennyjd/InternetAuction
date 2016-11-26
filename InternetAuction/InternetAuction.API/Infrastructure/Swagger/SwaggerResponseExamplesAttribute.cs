using System;

namespace InternetAuction.API.Infrastructure.Swagger
{
    public class SwaggerResponseExamplesAttribute : Attribute
    {
        public Type ResponseType { get; set; }

        public Type ExamplesType { get; set; }


        public SwaggerResponseExamplesAttribute(Type responseType, Type examplesType)
        {
            ResponseType = responseType;
            ExamplesType = examplesType;
        }
    }
}
