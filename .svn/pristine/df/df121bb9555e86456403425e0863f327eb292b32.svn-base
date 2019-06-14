namespace UI.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using AddOns.Hash;
    using Core.ApplicationService.Business.Entity;
    using Core.ApplicationService.Business.Identity;
    using Core.ApplicationService.Log;
    using Core.ObjectModels.Entity;
    using Newtonsoft.Json;
    using UI.WebApi.Controllers.Shared;
    using UI.WebApi.ViewModels;

    public class ExamController : BaseController
    {
        private readonly IExamService _examService;
        private readonly ITestService _testService;
        private readonly IBaseTestService _baseTestService;
        private readonly IIdentityService _identityService;
        private readonly IQuestionService _questionService;
        private readonly IOptionService _optionService;
        private readonly IAuthenticationService _authenticationService;

        public ExamController(ILoggingService loggingService, IExamService examService,
            IBaseTestService baseTestService, ITestService testService,
            IIdentityService identityService, IOptionService optionService,
            IQuestionService questionService, IAuthenticationService authenticationService) : base(loggingService)
        {
            this._examService = examService;
            this._testService = testService;
            this._baseTestService = baseTestService;
            this._identityService = identityService;
            this._optionService = optionService;
            this._questionService = questionService;
            this._authenticationService = authenticationService;
        }

        [HttpPost, Route("Exam/Submit")]
        public IHttpActionResult Submit([FromBody] ResultDataVM data)
        {
            try
            {
                var contents = JsonConvert.DeserializeObject<ResultVM>(data.Json.Decrypt());

                BaseTest baseTest = _baseTestService.Find(_ => _.Id == contents.ExamId);
                List<TestContent> testContents = new List<TestContent>();

                string studentCode = contents.StudentId;

                if (baseTest != null)
                {
                    if (_testService.Find(_ => _.BaseTestId == baseTest.Id &&
                                              _.StudentCode == studentCode) == null)
                    {
                        float totalMarkOfTest = 0;
                        float finalMarkOfTest = 0;
                        foreach (var ele in contents.ExamAs)
                        {
                            ele.Answers = ele.Answers ?? new List<int>();

                            Question quest = _questionService.Find(_ => _.Code == ele.QuestionCode, _ => _.Options);

                            List<Option> rightAnswer = quest.Options.Where(_ => _.IsCorrect).ToList();
                            List<Option> finalRightAnswers = quest.Options.Where(_ => _.IsCorrect).ToList();
                            List<Option> studentAnswers = _optionService.Search(_ => ele.Answers.Contains(_.Id)).ToList();

                            totalMarkOfTest += quest.Mark;
                            float markOfQuestion,
                                markRightAnswers = 0,
                                markWrongAnswers = 0;

                            rightAnswer.ForEach(_ =>
                            {
                                if (ele.Answers.Contains(_.Id))//mỗi lần nó trả lời đúng 1 câu
                                {
                                    finalRightAnswers.Remove(_);//trừ đi những câu nó đã đánh đúng => còn lại những câu đúng mà nó k đánh
                                    var temp = studentAnswers.Find(x => x.Id == _.Id);
                                    studentAnswers.Remove(temp);//những câu nó sai
                                }
                            });

                            finalRightAnswers.ForEach(_ =>
                            {
                                markRightAnswers += Math.Abs((_.Percent * quest.Mark) / 100);
                            });
                            studentAnswers.ForEach(_ =>
                            {
                                markWrongAnswers += Math.Abs((_.Percent * quest.Mark) / 100);//điểm của những câu trả lời sai
                            });

                            markOfQuestion = (float)Math.Round(quest.Mark - markWrongAnswers - markRightAnswers, 2);

                            finalMarkOfTest += markOfQuestion < 0 ? 0 : markOfQuestion;

                            testContents.Add(new TestContent
                            {
                                Answers = JsonConvert.SerializeObject(ele.Answers ?? new List<int>()),
                                Mark = markOfQuestion < 0 ? 0 : markOfQuestion,
                                QuestionCode = ele.QuestionCode
                            });
                        }

                        var auth = _authenticationService.Find(_ => _.WebId == studentCode &&
                                                         _.Username == User.Identity.Name);

                        if (auth != null)
                        {
                            _authenticationService.Delete(auth);
                        }


                        var test = new Test
                        {
                            BaseTestId = contents.ExamId,
                            IsFinished = true,
                            StartTime = baseTest.StartTime,
                            EndTime = DateTimeOffset.Now,
                            Duration = DateTimeOffset.Now - baseTest.StartTime,
                            Mark = finalMarkOfTest,
                            TotalMark = totalMarkOfTest,
                            StudentCode = studentCode,
                            TestContents = testContents
                        };
                        bool result = _testService.Create(test);

                    }
                }
            } 
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
            return Ok();
        }

        [HttpGet, Route("Exam/Review")]
        public IHttpActionResult Review(int testId)
        {
            try
            {
                var test = _testService.Find(x => x.Id == testId, 
                                                _ => _.TestContents.Select(__ => __.Question.Options),
                                                _ => _.TestContents.Select(__ => __.Question.Type));

                var result = test.TestContents.Select(x => new ReviewQuestionVM
                {
                    Id = x.Id,
                    Question = x.Question.Content,
                    Type = x.Question.Type.Name,
                    Mark = x.Mark,
                    TotalMark = x.Question.Mark,
                    ListAnswer = x.Question.Options.Select(o => new ReviewAnswerVM
                    {
                        Id = o.Id,
                        Answer = o.Content,
                        IsCorrect = o.IsCorrect,
                        IsChecked = JsonConvert.DeserializeObject<string[]>(x.Answers).Contains(o.Id.ToString())
                    })
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
                return InternalServerError(ex);
            }
        }
        
        [HttpGet]
        public IHttpActionResult GetBySemester(string semesterCode)
        {
            try
            {
                var result = _baseTestService.Search(_ => _.Exam.SemesterCode == semesterCode, 
                                        _ => _.Exam, _ => _.Course)
                                        .Select(_ => new ExamVM
                {
                    Id = _.Id,
                    CourseCode = _.CourseCode,
                    CourseName = _.Course.Name,
                    ExamCode = _.ExamCode,
                    TestDay = _.Exam.StartDate
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}