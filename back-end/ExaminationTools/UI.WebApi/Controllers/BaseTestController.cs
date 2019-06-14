namespace UI.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;
    using Newtonsoft.Json;
    using Core.ApplicationService.Business.Entity;
    using Core.ApplicationService.Log;
    using UI.WebApi.Controllers.Shared;
    using UI.WebApi.ViewModels;
    using Core.ObjectModels.Entity.EnumType;

    public class BaseTestController : BaseController
    {
        private readonly IBaseTestService _baseTestService;

        public BaseTestController(ILoggingService loggingService, IBaseTestService baseTestService) : base(loggingService)
        {
            this._baseTestService = baseTestService;
        }

        [HttpGet, Route("BaseTest/GetAll")]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(_baseTestService.GetAll(_ => _.Approver, _ => _.Course, _ => _.BaseTestContents).ToList().Select(_ => new
                {
                    Approver = _.Approver.FullName,
                    _.NumberOfQuestion,
                    _.StartTime,
                    _.EndTime,
                    _.Duration,
                    _.ExamCode,
                    IsApproved = _.Status == BaseTestStatus.Approved,
                    Course = _.Course.Name,
                    questions = _.BaseTestContents.Select(__ => new {
                        __.Content,
                        Options = JsonConvert.DeserializeObject<GetOptionVM[]>(__.Options),
                        __.Level
                    })
                }));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("BaseTest/Get")]
        public IHttpActionResult Get(int? id)
        {
            if (!id.HasValue)
                return BadRequest(ModelState);
            try
            {
                var baseTest = _baseTestService.Find(e => e.Id == id.Value, e => e.Approver, e => e.Course, e => e.BaseTestContents);
                return Ok(new
                {
                    Approver = baseTest.Approver.FullName,
                    baseTest.NumberOfQuestion,
                    baseTest.StartTime,
                    baseTest.EndTime,
                    baseTest.Duration,
                    baseTest.ExamCode,
                    IsApproved = baseTest.Status == BaseTestStatus.Approved,
                    Course = baseTest.Course.Name,
                    questions = baseTest.BaseTestContents.Select(__ => new
                    {
                        __.Content,
                        Options = JsonConvert.DeserializeObject<GetOptionVM[]>(__.Options),
                        __.Level
                    })
                });
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("BaseTest/Waiting")]
        public IHttpActionResult Waiting()
        {
            try
            {
                return Ok(_baseTestService.Search(_ => _.Status != BaseTestStatus.Approved, 
                                                       _ => _.Approver, 
                                                       _ => _.Course, 
                                                       _ => _.BaseTestContents).ToList()
                                                       .Select(_ => new
                {
                    Approver = _.Approver.FullName,
                    _.NumberOfQuestion,
                    _.StartTime,
                    _.EndTime,
                    _.Duration,
                    _.ExamCode,
                    Course = _.Course.Name,
                    questions = _.BaseTestContents.Select(__ => new {
                        __.Content,
                        Options = JsonConvert.DeserializeObject<GetOptionVM[]>(__.Options),
                        __.Level
                    })
                }));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route("BaseTest/GenerateTestChapters")]
        public IHttpActionResult GenerateTestByChapters(BaseTestChaptersVM baseTestVM)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            string message;

            try
            {
                if (!_baseTestService.GenerateBaseTestChapters(baseTestVM.NumberOfQuestion, baseTestVM.CourseCode,
                    baseTestVM.ApproverCode, baseTestVM.StartDate, baseTestVM.EndDate, baseTestVM.Duration, baseTestVM.ExamCode, baseTestVM.Chapters,
                    out message))
                {
                    ModelState.AddModelError(string.Empty, message);
                    return BadRequest(ModelState);
                }
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