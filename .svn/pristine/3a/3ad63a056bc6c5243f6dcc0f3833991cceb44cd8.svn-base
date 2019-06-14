namespace UI.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;
    using System.Collections.Generic;
    using Core.ObjectModels.Entity;
    using Core.ApplicationService.Log;
    using Core.ApplicationService.Business.Entity;
    using UI.WebApi.ViewModels;
    using UI.WebApi.Controllers.Shared;

    public class CourseController : BaseController
    {
        private readonly ICourseService _courseService;
        private readonly IChapterService _chapterService;
        private readonly IMainObjectiveService _mainObjectiveService;
        private readonly ILearningOutcomeService _learningOutcomeService;
        private readonly ICourseDepartmentService _courseDepartmentService;

        public CourseController(ILoggingService loggingService, ICourseService courseService,
            IChapterService chapterService, ICourseDepartmentService courseDepartmentService,
            IMainObjectiveService mainObjectiveService, ILearningOutcomeService learningOutcomeService) : base(loggingService)
        {
            _courseService = courseService;
            _chapterService = chapterService;
            _courseDepartmentService = courseDepartmentService;
            _mainObjectiveService = mainObjectiveService;
            _learningOutcomeService = learningOutcomeService;
        }

        #region Course
        [HttpGet]
        [Route("Course/GetCoursesByDepartment")]
        public IHttpActionResult GetCoursesByDepartment(string departmentCode)
        {
            try
            {
                return Ok(ModelBuilder.ConvertCourses(
                    _courseService.Search(e => e.CourseDepartmentCode == departmentCode).OrderBy(x => x.Code)));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("Course/GetAll")]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(ModelBuilder.ConvertCourses(
                    _courseService.GetAll().OrderBy(x => x.Code)));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("Course/IsExisted")]
        public IHttpActionResult IsExisted(string courseCode)
        {
            try
            {
                Course course = _courseService.Find(e => e.Code == courseCode);

                if (course != null)
                    return Ok(ModelBuilder.ConvertCourse(course));
                return NotFound();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route("Course")]
        public IHttpActionResult Create(CreateCourseVM course)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                if (_courseService.Create(ModelBuilder.CreateCourse(course)))
                    return Ok();
                return BadRequest();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpPut, Route("Course")]
        public IHttpActionResult Update(UpdateCourseVM course)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                if (_courseService.Find(e => e.Code == course.Code) == null)
                    return NotFound();

                if (_courseService.Update(ModelBuilder.CreateCourse(course)))
                    return Ok();
                return BadRequest();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("Course")]
        public IHttpActionResult Delete(string code)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Course course = _courseService.Find(x => x.Code == code);

                if (course != null)
                {
                    if (_courseService.Delete(course))
                        return Ok();
                    return BadRequest();
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
        #endregion

        #region Chapter
        [HttpGet, Route("Course/Chapters")]
        public IHttpActionResult GetChapter(string courseCode)
        {
            try
            {
                IQueryable<Chapter> chapters = _chapterService.Search(_ => _.CourseCode == courseCode).OrderBy(x => x.Order);

                return Ok(ModelBuilder.ConvertChapters(chapters));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpPut, Route("Course/Chapters")]
        public IHttpActionResult UpdateChapters(IEnumerable<UpdateChapterVM> chapters)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                if (_chapterService.UpdateChapters(ModelBuilder.CreateChapters(chapters)))
                    return Ok();
                return BadRequest();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
        #endregion

        #region Main Objective
        [HttpGet, Route("Course/MainObjectives")]
        public IHttpActionResult GetMainObjectives(string courseCode)
        {
            try
            {
                return Ok(ModelBuilder.ConvertMainObjectives(
                    _mainObjectiveService.Search(_ => _.CourseCode == courseCode)));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route("Course/MainObjective")]
        public IHttpActionResult CreateMainObjective(CreateMainObjectiveVM mainObjectiveVM)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                if (_mainObjectiveService.Create(ModelBuilder.CreateMainObjective(mainObjectiveVM)))
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

        [HttpPut, Route("Course/MainObjective")]
        public IHttpActionResult UpdateMainObjective(UpdateMainObjectiveVM mainObjective)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                MainObjective updateMainObjective = _mainObjectiveService.Find(c => c.Id == mainObjective.Id);
                if (updateMainObjective != null)
                {
                    updateMainObjective.Order = mainObjective.Order;
                    updateMainObjective.Content = mainObjective.Name;
                    updateMainObjective.CourseCode = mainObjective.CourseCode;

                    if (_mainObjectiveService.Update(updateMainObjective))
                        return Ok();
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("Course/MainObjectives")]
        public IHttpActionResult DeleteMainObjective(IEnumerable<int> chapters)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                IQueryable<MainObjective> deleteMainObjectives = _mainObjectiveService.Search(c => chapters.Contains(c.Id));

                if (_mainObjectiveService.Delete(deleteMainObjectives))
                    return Ok();
                return BadRequest();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
        #endregion

        #region Learning Outcome
        [HttpGet, Route("Course/LearningOutcomes")]
        public IHttpActionResult GetLearningOutcomes(string courseCode)
        {
            try
            {
                return Ok(ModelBuilder.ConvertLearningOutcomes(
                    _learningOutcomeService.Search(_ => _.MainObjective.CourseCode == courseCode, 
                                                            _ => _.MainObjective)
                                           .OrderBy(e => e.Order)));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route("Course/LearningOutcome")]
        public IHttpActionResult CreateLearningOutcomes(CreateLearningOutcomeVM learningOutcome)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                if (_learningOutcomeService.Create(ModelBuilder.CreateLearningOutcome(learningOutcome)))
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

        [HttpPut, Route("Course/LearningOutcome")]
        public IHttpActionResult UpdateLearningOutcome(UpdateLearningOutcomeVM learningOutcome)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                LearningOutcome updateLearningOutcome = _learningOutcomeService.Find(c => c.Id == learningOutcome.Id);
                if (updateLearningOutcome != null)
                {
                    updateLearningOutcome.Order = learningOutcome.Order;
                    updateLearningOutcome.Content = learningOutcome.Name;

                    if (_learningOutcomeService.Update(updateLearningOutcome))
                        return Ok();
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("Course/LearningOutcomes")]
        public IHttpActionResult DeleteLearningOutcomes(IEnumerable<int> chapters)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                IQueryable<LearningOutcome> deleteLearningOutcomes = _learningOutcomeService.Search(c => chapters.Contains(c.Id));

                if (_learningOutcomeService.Delete(deleteLearningOutcomes))
                    return Ok();
                return BadRequest();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
        #endregion
    }
}