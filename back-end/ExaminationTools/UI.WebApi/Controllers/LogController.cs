namespace UI.WebApi.Controllers
{
    using Core.ApplicationService.Log;
    using UI.WebApi.Controllers.Shared;

    public class LogController : BaseController
    {
        public LogController(ILoggingService loggingService) : base(loggingService)
        {
        }
    }
}