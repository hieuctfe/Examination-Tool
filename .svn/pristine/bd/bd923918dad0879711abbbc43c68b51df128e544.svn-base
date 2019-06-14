namespace UI.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;
    using Core.ApplicationService.Business.Entity;
    using Core.ApplicationService.Log;
    using UI.WebApi.Controllers.Shared;
    using UI.WebApi.ViewModels;

    public class SemesterController : BaseController
    {
        private readonly ISemesterService _semesterService;
        private readonly IExamService _examService;

        public SemesterController(ILoggingService loggingService, ISemesterService semesterService,
            IExamService examService) : base(loggingService)
        {
            _semesterService = semesterService;
            _examService = examService;
        }

        [HttpGet, Route("Semester/GetAll")]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(ModelBuilder.ConvertSemesters(
                    _semesterService.GetAll().OrderBy(x => x.Code)));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route("Semester")]
        public IHttpActionResult Create(SemesterVM semester)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                if (_semesterService.Create(ModelBuilder.CreateSemester(semester)))
                    return Ok();
                else
                    return BadRequest();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("Semester")]
        public IHttpActionResult Delete([FromUri]string[] semesters)
        {
            try
            {
                if (_semesterService.Delete(semesters))
                    return Ok();
                else
                    return BadRequest();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("Semester/ExamCode")]
        public IHttpActionResult GetBySemester(string semesterCode)
        {
            try
            {
                return Ok(_examService.Search(x => x.SemesterCode == semesterCode)
                                      .Select(x => x.Code));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}