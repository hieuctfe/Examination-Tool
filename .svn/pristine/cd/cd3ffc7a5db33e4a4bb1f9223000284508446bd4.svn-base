namespace UI.WebApi.ViewModels
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    [DataContract]
    public class GetQuestionsVM
    {
        [DataMember]
        public string Code { get; set; }

        [DataMember]
        public string Course { get; set; }

        [DataMember]
        public string Importer { get; set; }

        [IgnoreDataMember]
        public bool IsExam { get; set; }

        [DataMember]
        public string ExamType => IsExam ? "Exam" : "Test";

        [DataMember]
        public string Level { get; set; }

        [DataMember]
        public float Mark { get; set; }
    }

    [DataContract]
    public class CreateQuestionMultiChoiceVM
    {
        [IgnoreDataMember]
        public string Code { get; set; }

        [DataMember]
        [Required]
        public string Content { get; set; }

        [DataMember]
        [Required, Range(0.1, 1.0)]
        public float Mark { get; set; }

        [DataMember]
        [Required, Range(1, 6)]
        public int Level { get; set; }

        [DataMember]
        [Required]
        public bool IsExam { get; set; }

        [DataMember]
        [Required]
        public int Type { get; set; }

        [DataMember]
        [Required]
        public List<CreateOptionVM> Options { get; set; }

        [DataMember]
        public List<int> LearningOutcomes { get; set; }

        [DataMember]
        [Required]
        public List<int> Chapters { get; set; }
    }

    [DataContract]
    public class ListQuestionMultiChoiceVM
    {
        [DataMember]
        [Required, MaxLength(20)]
        public string Course { get; set; }

        [DataMember]
        [Required]
        public IEnumerable<CreateQuestionMultiChoiceVM> Questions { get; set; }
    }

    [DataContract]
    public class QuestionDetailVM
    {
        [DataMember]
        public string Code { get; set; }

        [DataMember]
        public string Content { get; set; }

        [DataMember]
        public float Mark { get; set; }

        [DataMember]
        public string Level { get; set; }

        [DataMember]
        public string Importer { get; set; }

        [DataMember]
        public string Course { get; set; }

        [DataMember]
        public string Type { get; set; }

        [DataMember]
        public IEnumerable<GetOptionVM> Options { get; set; }

        [DataMember]
        public IEnumerable<int> Chapters { get; set; }

        [DataMember]
        public IEnumerable<int> LearningOutcomes { get; set; }
    }

    [DataContract]
    public class UpdateQuestion
    {
        [DataMember]
        [Required]
        public string Code { get; set; }

        [DataMember]
        [Required]
        public string Content { get; set; }

        [DataMember]
        [Required, Range(0.1, 1.0)]
        public float Mark { get; set; }

        [DataMember]
        [Required, Range(1, 6)]
        public int Level { get; set; }

        [DataMember]
        [Required]
        public bool IsExam { get; set; }

        [DataMember]
        public int Type { get; set; }

        [DataMember]
        [Required]
        public List<UpdateOptionVM> Options { get; set; }

        [DataMember]
        public List<int> LearningOutcomes { get; set; }

        [DataMember]
        public List<int> Chapters { get; set; }
    }
}