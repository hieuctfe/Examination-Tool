namespace UI.WebApi.ViewModels.Shared
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using Core.ApplicationService.Log;
    using Core.ObjectModels.Entity;

    public class ModelBuilder
    {
        private readonly ILoggingService _loggingService;

        public ModelBuilder(ILoggingService loggingService)
        {
            _loggingService = loggingService;
        }

        #region Main Objective
        public MainObjective CreateMainObjective(CreateMainObjectiveVM mainObjective)
            => Map(mainObjective, x => new MainObjective
            {
                Order = x.Order,
                Content = x.Name,
                CourseCode = x.CourseCode
            });

        public MainObjectiveVM ConvertMainObjective(MainObjective mainObjective)
            => Map(mainObjective, x => new MainObjectiveVM
            {
                Id = x.Id,
                Order = x.Order,
                Name = x.Content,
                CourseCode = x.CourseCode
            });

        public IEnumerable<MainObjectiveVM> ConvertMainObjectives(IEnumerable<MainObjective> mainObjectives)
            => Map(mainObjectives, x =>
            {
                IList<MainObjectiveVM> result = new List<MainObjectiveVM>();
                x.ToList().ForEach(e => result.Add(ConvertMainObjective(e)));

                return result;
            });
        #endregion

        #region Learning Outcomes
        public LearningOutcome CreateLearningOutcome(CreateLearningOutcomeVM learningOutcome)
            => Map(learningOutcome, x => new LearningOutcome
            {
                Order = x.Order,
                Content = x.Name,
                MainObjectiveId = x.MainObjectiveId
            });

        public LearningOutcomeVM ConvertLearningOutcome(LearningOutcome learningOutcome)
            => Map(learningOutcome, x => new LearningOutcomeVM
            {
                Id = x.Id,
                Order = x.Order,
                Name = x.Content,
                MainObjectiveId = x.MainObjectiveId
            });

        public IEnumerable<LearningOutcomeVM> ConvertLearningOutcomes(IEnumerable<LearningOutcome> learningOutcomes)
            => Map(learningOutcomes, x =>
            {
                IList<LearningOutcomeVM> result = new List<LearningOutcomeVM>();
                x.ToList().ForEach(e => result.Add(ConvertLearningOutcome(e)));

                return result;
            });
        #endregion

        #region Department
        public CourseDepartment CreateDepartment(DepartmentVM department)
            => Map(department, x => new CourseDepartment
            {
                Code = x.Code,
                Name = x.Name,
                IsDeleted = false
            });

        public DepartmentVM ConvertDepartment(CourseDepartment department)
            => Map(department, x => new DepartmentVM
            {
                Code = x.Code,
                Name = x.Name
            });

        public IEnumerable<DepartmentVM> ConvertDepartments(IEnumerable<CourseDepartment> departments)
            => Map(departments, x =>
            {
                IList<DepartmentVM> result = new List<DepartmentVM>();
                x.ToList().ForEach(e => result.Add(ConvertDepartment(e)));

                return result;
            });
        #endregion

        #region Course
        public Course CreateCourse(UpdateCourseVM course)
            => Map(course, x => new Course
            {
                Code = x.Code,
                Name = x.Name,
                CourseDepartmentCode = x.Department,
            });

        public Course CreateCourse(CreateCourseVM course)
            => Map(course, x => new Course
            {
                Code = x.Code,
                Name = x.Name,
                CourseDepartmentCode = x.Department,
                IsDeleted = false
            });

        public CourseVM ConvertCourse(Course course)
            => Map(course, x => new CourseVM
            {
                Code = x.Code,
                Name = x.Name
            });

        public IEnumerable<CourseVM> ConvertCourses(IEnumerable<Course> course)
            => Map(course, x =>
            {
                IList<CourseVM> result = new List<CourseVM>();
                x.ToList().ForEach(e => result.Add(ConvertCourse(e)));

                return result;
            });
        #endregion

        #region Chapter
        public Chapter CreateChapter(UpdateChapterVM chapter)
            => Map(chapter, x => new Chapter
            {
                Id = int.Parse(x.Id),
                Name = x.Name,
                Order = x.Order,
                CourseCode = x.CourseCode
            });

        public IEnumerable<Chapter> CreateChapters(IEnumerable<UpdateChapterVM> chapters)
            => Map(chapters, x =>
            {
                IList<Chapter> result = new List<Chapter>();
                int count = 0;
                x.ToList().ForEach(chapter =>
                {
                    switch (chapter.State)
                    {
                        case ChangeState.Created:
                            chapter.Id = "-1";
                            chapter.Order = ++count;
                            break;
                        case ChangeState.Deleted:
                            chapter.Order = -1;
                            break;
                        default:
                            chapter.Order = ++count;
                            break;
                    }
                    result.Add(CreateChapter(chapter));
                });

                return result;
            });

        public ChapterVM ConvertChapter(Chapter chapter)
            => Map(chapter, x => new ChapterVM
            {
                Id = x.Id,
                Name = x.Name,
                Order = x.Order,
                CourseCode = x.CourseCode
            });

        public IEnumerable<ChapterVM> ConvertChapters(IEnumerable<Chapter> chapter)
            => Map(chapter, x =>
            {
                IList<ChapterVM> result = new List<ChapterVM>();
                x.ToList().ForEach(e => result.Add(ConvertChapter(e)));

                return result;
            });
        #endregion

        #region Semester
        public SemesterVM ConvertSemester(Semester semester)
            => Map(semester, x =>
            {
                return new SemesterVM
                {
                    Code = x.Code,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate
                };
            });

        public IEnumerable<SemesterVM> ConvertSemesters(IEnumerable<Semester> semesters)
            => Map(semesters, x =>
            {
                IList<SemesterVM> result = new List<SemesterVM>();
                x.ToList().ForEach(e => result.Add(ConvertSemester(e)));

                return result;
            });

        public Semester CreateSemester(SemesterVM semester)
            => Map(semester, x =>
            {
                return new Semester
                {
                    Code = x.Code,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate
                };
            });
        #endregion

        #region Option
        public Option CreateOption(UpdateOptionVM option)
            => Map(option, x => new Option
            {
                Id = x.Id,
                Content = x.Content,
                IsCorrect = x.IsCorrect,
                Percent = x.Percent
            });

        public ICollection<Option> CreateOptions(IEnumerable<UpdateOptionVM> options)
            => Map(options, x =>
            {
                IList<Option> result = new List<Option>();
                x.ToList().ForEach(e => result.Add(CreateOption(e)));

                return result;
            });

        public Option CreateOption(CreateOptionVM option, float percent)
            => Map(option, x => new Option
            {
                Content = x.Content,
                IsCorrect = x.IsCorrect,
                Percent = percent
            });

        public ICollection<Option> CreateOptions(IEnumerable<CreateOptionVM> options, float markOfQuestion)
        {
            IList<Option> result = new List<Option>();
            foreach (var e in options)
            {
                result.Add(CreateOption(e, e.Percent == 0 ?
                                               (markOfQuestion / options.Where(_ => _.IsCorrect).Count()) * 100 : e.Percent));
            }
            return result;
        }

        public GetOptionVM ConvertOption(Option option)
            => Map(option, x => new GetOptionVM
            {
                Id = x.Id,
                Content = x.Content,
                IsCorrect = x.IsCorrect,
                Percent = x.Percent
            });

        public IEnumerable<GetOptionVM> ConvertOptions(IEnumerable<Option> options)
            => Map(options, x =>
            {
                IList<GetOptionVM> result = new List<GetOptionVM>();
                x.ToList().ForEach(e => result.Add(ConvertOption(e)));

                return result;
            });
        #endregion

        #region Question
        public QuestionDetailVM ConvertQuestionDetailVM(Question question)
            => Map(question, x => new QuestionDetailVM
            {
                Code = x.Code,
                Content = x.Content,
                Mark = x.Mark,
                Level = x.Level.Name,
                Type = x.Type.Name,
                Course = x.Course.Name,
                Importer = x.Importer.FullName,
                Options = ConvertOptions(question.Options),
                Chapters = x.QuestionObjectives.Select(_ => _.ChapterId),
                LearningOutcomes = x.QuestionObjectives.Select(_ => _.LearningOutcomeId)
            });

        public Question CreateQuestion(CreateQuestionMultiChoiceVM question)
            => Map(question, x => new Question
            {
                Code = x.Code,
                IsDeleted = false,
                LevelId = x.Level,
                IsExamQuestion = x.IsExam,
                Content = x.Content,
                Mark = x.Mark,
                TypeId = x.Type
            });

        public IEnumerable<Question> CreateQuestions(IEnumerable<CreateQuestionMultiChoiceVM> questions)
            => Map(questions, x =>
            {
                IList<Question> result = new List<Question>();
                x.ToList().ForEach(e => result.Add(CreateQuestion(e)));

                return result;
            });

        public GetQuestionsVM ConvertQuestion(Question question)
            => Map(question, x => new GetQuestionsVM
            {
                Code = x.Code,
                Course = x.CourseCode,
                Importer = x.ImporterCode,
                IsExam = x.IsExamQuestion,
                Level = x.Level.Name,
                Mark = x.Mark
            });

        public IEnumerable<GetQuestionsVM> ConvertQuestions(IEnumerable<Question> questions)
            => Map(questions, x =>
            {
                IList<GetQuestionsVM> result = new List<GetQuestionsVM>();
                x.ToList().ForEach(e => result.Add(ConvertQuestion(e)));

                return result;
            });
        #endregion

        #region Map Helper
        private TResultModel Map<TResultModel, TSourceModel>(TSourceModel source, Func<TSourceModel, TResultModel> viewModels)
            where TResultModel : class
            where TSourceModel : class
        {
            TResultModel result = null;
            try
            {
                result = viewModels?.Invoke(source);
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
            }

            return result;
        }

        private void Map<TResultModel, TSourceModel>(TSourceModel source, TResultModel result, Action<TSourceModel, TResultModel> map)
            where TResultModel : class
            where TSourceModel : class
        {
            try
            {
                map?.Invoke(source, result);
            }
            catch (Exception ex)
            {
                _loggingService.Write(ex);
            }
        }
        #endregion
    }
}