namespace UI.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;
    using System.Collections.Generic;
    using Core.ApplicationService.Business.Entity;
    using Core.ApplicationService.Business.Identity;
    using Core.ApplicationService.Log;
    using UI.WebApi.Controllers.Shared;

    public class StudentController : BaseController
    {
        private readonly IStudentService _studentService;
        private readonly IIdentityService _identityService;

        public StudentController(ILoggingService loggingService, IStudentService studentService, IIdentityService identityService) : base(loggingService)
        {
            _studentService = studentService;
            _identityService = identityService;
        }

        [HttpPost]
        public IHttpActionResult cuocSongMa(A abc)
        {
            try
            {
                _identityService.Register(abc.a.Select(_ => _.Username).ToArray(), abc.a.Select(_ => _.FullName).ToArray(), abc.ExamCode);
                return Ok();
            }
            catch (Exception)
            {

                return InternalServerError();
            }
        }
    }

    public class ABC
    {
        public string Username { get; set; }

        public string FullName { get; set; }
    }

    public class A
    {
        public IEnumerable<ABC> a { get; set; }

        public string ExamCode { get; set; }
    }
}