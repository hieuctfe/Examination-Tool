namespace UI.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;
    using Core.ApplicationService.Business.Entity;
    using Core.ApplicationService.Log;
    using UI.WebApi.Controllers.Shared;

    public class TestController : BaseController
    {
        private readonly ITestService _testService;

        public TestController(ILoggingService loggingService, ITestService testService) : base(loggingService)
        {
            _testService = testService;
        }

        [HttpGet]
        public IHttpActionResult GetByExam(int testId)
        {
            try
            {
                var tests = _testService
                            .Search(_ => _.BaseTest.Id == testId, 
                                    _ => _.BaseTest, _ => _.Student)
                            .Select(_ => new
                {
                    testId = _.Id,
                    studentName = _.Student.FullName,
                    studentCode = _.Student.Code,
                    studentMark = _.Mark,
                    maxMark = _.TotalMark,
                });
                return Ok(tests );
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
    }
}