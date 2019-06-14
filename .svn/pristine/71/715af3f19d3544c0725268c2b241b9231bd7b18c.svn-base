namespace UI.WebApi.Controllers.Shared
{
    using System.Web;
    using System.Web.Http;
    using Core.ApplicationService.Log;
    using UI.WebApi.ViewModels.Shared;

    public abstract class BaseController : ApiController
    {
        protected readonly ModelBuilder ModelBuilder;

        protected HttpContext CurrentContext => HttpContext.Current;

        protected ILoggingService _loggingService;

        protected BaseController(ILoggingService loggingService)
        {
            _loggingService = loggingService;
            ModelBuilder = new ModelBuilder(loggingService);
        }
    }
}