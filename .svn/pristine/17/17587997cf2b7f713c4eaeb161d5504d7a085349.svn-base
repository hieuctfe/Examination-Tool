using static UI.WebApi.Infrastructure.Extensions.LinqExtension;

namespace UI.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Http;
    using Newtonsoft.Json;
    using Core.ObjectModels.Entity;
    using Core.ApplicationService.Business.Entity;
    using Core.ApplicationService.Log;
    using UI.WebApi.Controllers.Shared;
    using UI.WebApi.ViewModels;
    using UI.WebApi.Infrastructure.Extensions;

    public class QuestionController : BaseController
    {
        private readonly IQuestionService _questionService;
        private readonly ILearningOutcomeService _learingOutcomeService;
        private readonly IActivityLogService _activitylogService;

        public QuestionController(ILoggingService loggingService, IQuestionService questionService,
            ILearningOutcomeService learingOutcomeService, IActivityLogService activitylogService)
            : base(loggingService)
        {
            this._questionService = questionService;
            this._learingOutcomeService = learingOutcomeService;
            this._activitylogService = activitylogService;
        }

        [HttpGet, Route("Question/GetAll")]
        public IHttpActionResult GetQuestions(string searchValue = null, int pageIndex = 1,
                                                int pageSize = 10, string sortField = null)
        {
            try
            {
                IQueryable<Question> questions = _questionService.Search(q => !q.IsDeleted,
                                                                           includes: q => q.Level);

                questions = questions.Where(q => string.IsNullOrEmpty(searchValue) ||
                                                q.Content.Contains(searchValue));

                string sortFieldValue = null;
                OrderBy orderByValue = OrderBy.Ascending;

                if (!string.IsNullOrEmpty(sortField))
                {
                    string[] segments = sortField.Split('_');

                    sortFieldValue = segments[0];
                    orderByValue = segments[1] == "asc" ? OrderBy.Ascending : OrderBy.Descending;
                }

                int totalElement = questions.Count();
                int totalPage = (int)Math.Ceiling(totalElement / (double)pageSize);

                questions = questions.OrderByPropertyName(sortFieldValue, orderByValue)
                                     .Skip((pageIndex - 1) * pageSize).Take(pageSize);

                CurrentContext.Response.Headers.Add("Paging-Header", JsonConvert.SerializeObject(new
                {
                    pageIndex,
                    pageSize,
                    totalPage,
                    totalElement,
                    orderByValue,
                    searchValue
                }));

                CurrentContext.Response.Headers.Add("Prefix-Sortable-Header", JsonConvert.SerializeObject(new
                {
                    sortable = new List<string>
                    {
                        $"{nameof(Question.Code)}",
                        $"{nameof(Question.Content)}",
                        $"{nameof(Question.CourseCode)}",
                        $"{nameof(Question.ImporterCode)}",
                        $"{nameof(Question.IsExamQuestion)}",
                        $"{nameof(Question.Level)}.Name",
                    }
                }));

                return Ok(ModelBuilder.ConvertQuestions(questions));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("Question/Get")]
        public IHttpActionResult GetQuestion(string code)
        {
            try
            {
                Question question = _questionService.Find(q => !q.IsDeleted &&
                                                                q.Code == code,
                                                                    _ => _.Importer, _ => _.Course,
                                                                    _ => _.Options, _ => _.Level,
                                                                    _ => _.Type, _ => _.QuestionObjectives);

                return Ok(ModelBuilder.ConvertQuestionDetailVM(question));
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        //public IHttpActionResult VerifyQuestion(ListQuestionMultiChoiceVM questions)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    try
        //    {
                
        //        List<Question> questionsCourse = _questionService
        //                                                .Search(x => !x.IsDeleted &&
        //                                                             x.CourseCode == questions.Course).ToList();

        //        questions.Questions.ToList().ForEach(_ =>
        //        {
        //            string separator = "~/~";
        //            string content = $"{_.Content}{separator}{string.Join(separator, _.Options)}";

        //            questionsCourse.ToList().ForEach(x =>
        //            {
        //                string compare = $"{x.Content}{separator}{string.Join(separator, x.Options)}";


        //            });
        //        });
        //        //end of check content
        //    }
        //    catch (Exception ex)
        //    {
        //        _loggingService.Write(ex);
        //        return InternalServerError(ex);
        //    }
        //    return Ok();
        //}

        [HttpPost, Route("Question/ImportMultiChoices")]
        public IHttpActionResult ImportMultiChoices(ListQuestionMultiChoiceVM questions)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                string pattern = $"{questions.Course}-LO{{{{Order}}}}-Q";

                foreach (var quest in questions.Questions)
                {
                    string code = questions.Course;

                    LearningOutcome learningOutcome;
                    if (quest.LearningOutcomes == null || quest.LearningOutcomes.Count == 0)
                    {
                        learningOutcome = _learingOutcomeService.Find(_ => _.MainObjective.CourseCode == code &&
                                                                           _.MainObjective.Order == 0, _ => _.MainObjective);
                        quest.LearningOutcomes = new List<int> { learningOutcome.Id };
                    }
                    else
                    {
                        learningOutcome = _learingOutcomeService.Find(_ => _.MainObjective.CourseCode == code &&
                                                                           _.Order == quest.LearningOutcomes[0]);
                    }
                    IList<QuestionObjective> questionObjectives = new List<QuestionObjective>();
                    foreach (var lo in quest.LearningOutcomes)
                    {
                        foreach (var c in quest.Chapters)
                        {
                            questionObjectives.Add(new QuestionObjective
                            { QuestionCode = quest.Code, LearningOutcomeId = lo, ChapterId = c });
                        }
                    }

                    code = pattern.Replace("{{Order}}", $"{learningOutcome.Order}");
                    code += _questionService.Search(_ => _.Code.Contains(code)).Count() + 1;

                    Question question = ModelBuilder.CreateQuestion(quest);
                    question.Code = code;
                    question.CourseCode = questions.Course;
                    question.IsExamQuestion = true;
                    question.ImporterCode = "test_khanhkt";
                    question.QuestionObjectives = questionObjectives;

                    question.Options = ModelBuilder.CreateOptions(quest.Options, question.Mark);
                    if (!_questionService.Create(question))
                    {
                        string data = JsonConvert.SerializeObject(quest);

                        _activitylogService.Create(new ActivityLog
                        {
                            CreatedDate = DateTimeOffset.Now,
                            Message = data
                        });
                        ModelState.AddModelError
                            (string.Empty, $"'{data}' Failed To Import");
                    }
                }
                if (ModelState.Count > 0)
                    return BadRequest(ModelState);

                return Ok();
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpPut, Route("Question")]
        public IHttpActionResult Update(UpdateQuestion question)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                Question quest = _questionService.Find(_ => _.Code == question.Code,
                                                                _ => _.Options,
                                                                _ => _.QuestionObjectives);

                if (quest != null)
                {
                    IList<QuestionObjective> questionObjectives = new List<QuestionObjective>();

                    LearningOutcome learningOutcome;
                    if (question.LearningOutcomes == null)
                    {
                        learningOutcome = _learingOutcomeService.Find(_ => _.MainObjective.CourseCode == quest.CourseCode &&
                                                                       _.MainObjective.Order == 0, _ => _.MainObjective);

                        question.LearningOutcomes = new List<int> { learningOutcome.Id };
                    }

                    foreach (var lo in question.LearningOutcomes)
                    {
                        foreach (var c in question.Chapters)
                        {
                            questionObjectives.Add(new QuestionObjective
                                { QuestionCode = quest.Code, LearningOutcomeId = lo, ChapterId = c });
                        }
                    }

                    if (_questionService.Update(quest, new Question
                    {
                        LevelId = question.Level,
                        IsExamQuestion = question.IsExam,
                        Content = question.Content,
                        TypeId = question.Type,
                        Mark = question.Mark,
                        QuestionObjectives = questionObjectives,
                        Options = ModelBuilder.CreateOptions(question.Options)
                    }))
                        return Ok();
                    else
                        return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("Question/Delete")]
        public IHttpActionResult Delete([FromUri] IEnumerable<string> codes)
        {
            try
            {
                if (_questionService.Delete(_questionService.Search(_ => codes.Contains(_.Code))))
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