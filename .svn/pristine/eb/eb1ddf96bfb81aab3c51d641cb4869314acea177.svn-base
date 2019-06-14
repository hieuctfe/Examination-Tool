namespace UI.WebApi
{
    using System.Web.Http;
    using Swashbuckle.Application;

    public class SwaggerConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var thisAssembly = typeof(SwaggerConfig).Assembly;

            config.EnableSwagger(c =>
                    {
                        c.SingleApiVersion("v1", "ExaminationTool ./.");
                    })
                .EnableSwaggerUi(c =>
                    {
                    });
        }
    }
}