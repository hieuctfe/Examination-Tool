namespace UI.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using Core.ApplicationService.Business.Entity;
    using Core.ApplicationService.Log;
    using Core.ObjectModels.Entity;
    using UI.WebApi.Controllers.Shared;

    public class OptionController : BaseController
    {
        private readonly IOptionService _optionService;

        public OptionController(ILoggingService loggingService, IOptionService optionService) : base(loggingService)
        {
            _optionService = optionService;
        }

        [HttpGet, Route("Option/Options")]
        public IHttpActionResult GetChapters(IEnumerable<int> idList)
        {
            if (idList == null)
                return BadRequest();
            try
            {
                IQueryable<Option> options = _optionService.Search(_ => idList.Contains(_.Id));

                return Ok(ModelBuilder.ConvertOptions(options));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
    }
}
