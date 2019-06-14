[assembly: Microsoft.Owin.OwinStartup(typeof(UI.WebApi.Startup))]
namespace UI.WebApi
{
    using System.Web.Http;
    using System.Reflection;
    using System.Collections.Generic;
    using System.Web.Configuration;
    using Owin;
    using Ninject;
    using Ninject.Modules;
    using Ninject.Web.Common.OwinHost;
    using Ninject.Web.WebApi.OwinHost;
    using AuthLib;
    using DependencyResolver.Database;
    using DependencyResolver.Business;
    using System.Web.Routing;

    public class Startup
    {
        private static IKernel _kernel;

        private static IKernel CreateKernel() => Kernel;

        public static IKernel Kernel
        {
            get
            {
                if (_kernel == null)
                {
                    _kernel = new StandardKernel();
                    _kernel.Load(Assembly.GetExecutingAssembly());

                    _kernel.Load(new List<NinjectModule>()
                    {
                        new InfrastructureResolver(),
                        new ServiceResolver()
                    });
                }

                return _kernel;
            }
        }

        public void Configuration(IAppBuilder app)
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
            SwaggerConfig.Register(config);

            app.UseStpmAuthentication(new StpmAuthenticationOptions(
                stpmDomain: WebConfigurationManager.AppSettings["AuthDomain"]
                , clientId: WebConfigurationManager.AppSettings["ClientId"]
                , secret: WebConfigurationManager.AppSettings["ClientSecret"]
                , loginUrl: "/Auth/Login"
                , unauthorizeUrl: "/Auth/Unauthorize")
                , configCookies: true);

            app.UseNinjectMiddleware(CreateKernel).UseNinjectWebApi(config);
        }
    }
}