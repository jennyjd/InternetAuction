﻿using System;

namespace InternetAuction.API.Infrastructure.Swagger
{
    public class SwaggerRequestExamplesAttribute : Attribute
    {
        public Type ExamplesType { get; private set; }

        public Type RequestType { get; private set; }


        public SwaggerRequestExamplesAttribute(Type requestType, Type examplesType)
        {
            RequestType = requestType;
            ExamplesType = examplesType;
        }
    }
}
