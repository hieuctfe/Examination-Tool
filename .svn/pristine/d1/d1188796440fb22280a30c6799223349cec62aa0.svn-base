namespace UI.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;
    using Core.ApplicationService.Log;
    using Core.ApplicationService.Business.Entity;
    using UI.WebApi.ViewModels;
    using UI.WebApi.Controllers.Shared;

    public class DepartmentController : BaseController
    {
        private readonly ICourseDepartmentService _courseDepartmentService;

        public DepartmentController(ILoggingService loggingService, ICourseDepartmentService courseDepartmentService) : base(loggingService)
        {
            this._courseDepartmentService = courseDepartmentService;
        }

        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(ModelBuilder.ConvertDepartments(_courseDepartmentService.GetAll().OrderBy(e => e.Code)));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult Create(DepartmentVM department)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                if (_courseDepartmentService.Find(c => c.Code == department.Code) != null)
                    ModelState.AddModelError(string.Empty, $"The Code {department.Code} Already Defined");

                if (ModelState.Count > 0)
                    return BadRequest(ModelState);

                if (_courseDepartmentService.Create(ModelBuilder.CreateDepartment(department)))
                    return Ok();
                else
                    return InternalServerError();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
    }
}