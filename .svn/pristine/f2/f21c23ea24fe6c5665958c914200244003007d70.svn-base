namespace UI.WebApi.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    [DataContract]
    public class ExamVM
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string CourseCode { get; set; }

        [DataMember]
        public string CourseName { get; set; }

        [DataMember]
        public string ExamCode { get; set; }

        [DataMember]
        public DateTimeOffset TestDay { get; set; }
    }

    [DataContract]
    public class ResultDataVM
    {
        [DataMember]
        public string Json { get; set; }
    }

    [DataContract]
    public class ResultVM
    {
        [DataMember]
        [Required]
        public int ExamId { get; set; }

        [DataMember]
        public string StudentId { get; set; }

        [DataMember]
        public List<ContentVM> ExamAs { get; set; }
    }

    [DataContract]
    public class ContentVM
    {
        [DataMember]
        public string QuestionCode { get; set; }

        [DataMember]
        public List<int> Answers { get; set; }
    }
}