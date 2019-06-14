namespace UI.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using Core.ApplicationService.Business.Process;
    using Core.ApplicationService.Log;
    using Core.ObjectModels.Process;
    using UI.WebApi.Controllers.Shared;
    using UI.WebApi.ViewModels;

    public class DefaultProcessController : BaseController
    {
        private readonly IDefaultProcessService _defaultProcessService;

        public DefaultProcessController(ILoggingService loggingService,
            IDefaultProcessService defaultProcessService) : base(loggingService)
        {
            _defaultProcessService = defaultProcessService;
        }

        [HttpGet, Route("DefaultProcess/GetAll")]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(_defaultProcessService.GetAll());
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("DefaultProcess/GetAllPath")]
        public IHttpActionResult GetAllPath()
        {
            try
            {
                return Ok(_defaultProcessService.GetAll().Select(_ => _.Path));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody] IEnumerable<ProcessVM> processes)
        {
            if (processes == null || processes.Count() == 0)
                return BadRequest();
            try
            {
                if (_defaultProcessService.Create(processes.Select(_ => new 
                    DefaultProcess
                    {
                        AppName = _.AppName,
                        Path = _.Path,
                        ProcessName = _.ProcessName
                    })))
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

        [HttpDelete]
        public IHttpActionResult Delete([FromUri]int[] ids)
        {
            if (ids == null)
                return BadRequest();
            try
            {
                foreach (var id in ids)
                {
                    var process = _defaultProcessService.Find(_ => _.Id == id);
                    if (process != null)
                    {
                        if (_defaultProcessService.Delete(process))
                            return Ok();
                        else
                            return InternalServerError();
                    }
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
    }
}