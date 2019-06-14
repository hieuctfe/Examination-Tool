namespace UI.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;
    using Core.ApplicationService.Business.Entity;
    using Core.ApplicationService.Log;
    using UI.WebApi.Controllers.Shared;

    public class ResourceController : BaseController
    {
        private readonly IResourceService _resourceService;
        private readonly IOptionService _optionService;

        public ResourceController(ILoggingService loggingService, IResourceService resourceService,
            IOptionService optionService) 
            : base(loggingService)
        {
            this._resourceService = resourceService;
            this._optionService = optionService;
        }

        [HttpGet]
        [Route("Resource/GetLevels")]
        public IHttpActionResult GetLevels()
        {
            try
            {
                return Ok(_resourceService.GetLevels().Select(e => new { e.Id, e.Name }));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("Resource/GetDepartments")]
        public IHttpActionResult GetDepartments()
        {
            try
            {
                return Ok(_resourceService.GetDepartments().Select(e => new { e.Code, e.Name }));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("Resource/GetQuestionTypes")]
        public IHttpActionResult GetQuestionTypes()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
    }
}