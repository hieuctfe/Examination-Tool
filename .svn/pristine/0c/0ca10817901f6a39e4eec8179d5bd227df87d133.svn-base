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

    public class ChapterController : BaseController
    {
        private readonly IChapterService _chapterService;

        public ChapterController(ILoggingService loggingService, IChapterService chapterService) : base(loggingService)
        {
            _chapterService = chapterService;
        }

        [HttpGet, Route("Chapter/Chapters")]
        public IHttpActionResult GetChapters(IEnumerable<int> idList)
        {
            if (idList == null)
                return BadRequest();
            try
            {
                IQueryable<Chapter> chapters = _chapterService.Search(_ => idList.Contains(_.Id));

                return Ok(ModelBuilder.ConvertChapters(chapters));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
    }
}