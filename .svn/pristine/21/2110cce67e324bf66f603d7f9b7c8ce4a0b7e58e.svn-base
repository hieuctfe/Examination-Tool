namespace UI.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Http;
    using Core.ObjectModels.Entity;
    using Core.ApplicationService.Log;
    using Core.ApplicationService.Business.Entity;
    using UI.WebApi.Controllers.Shared;

    public class LearningOutcomeController : BaseController
    {
        private readonly ILearningOutcomeService _learingOutcomeService;

        public LearningOutcomeController(ILoggingService loggingService, ILearningOutcomeService learingOutcomeService) : base(loggingService)
        {
            _learingOutcomeService = learingOutcomeService;
        }

        [HttpGet, Route("LearningOutcome/LearningOutcomes")]
        public IHttpActionResult GetChapters(IEnumerable<int> idList)
        {
            if (idList == null)
                return BadRequest();
            try
            {
                IQueryable<LearningOutcome> chapters = _learingOutcomeService.Search(_ => idList.Contains(_.Id));

                return Ok(ModelBuilder.ConvertLearningOutcomes(chapters));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
    }
}