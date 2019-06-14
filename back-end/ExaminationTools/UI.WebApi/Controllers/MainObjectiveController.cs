namespace UI.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;
    using Core.ApplicationService.Business.Entity;
    using Core.ApplicationService.Log;
    using Core.ObjectModels.Entity;
    using UI.WebApi.Controllers.Shared;

    public class MainObjectiveController : BaseController
    {
        private readonly IMainObjectiveService _mainObjectiveService;
        private readonly ILearningOutcomeService _learningOutcomeService;

        public MainObjectiveController(ILoggingService loggingService, IMainObjectiveService mainObjectiveService,
            ILearningOutcomeService learningOutcomeService) : base(loggingService)
        {
            this._mainObjectiveService = mainObjectiveService;
            this._learningOutcomeService = learningOutcomeService;
        }

        [HttpGet, Route("MainObjective/LearningOutcomes")]
        public IHttpActionResult GetLearningOutcomes(int? mainObjective)
        {
            if (!mainObjective.HasValue)
                return BadRequest();
            try
            {
                return Ok(ModelBuilder.ConvertLearningOutcomes(
                    _learningOutcomeService.Search(x => x.MainObjectiveId == mainObjective.Value).OrderBy(x => x.Order)));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
    }
}