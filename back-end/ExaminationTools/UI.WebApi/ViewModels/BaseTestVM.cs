namespace UI.WebApi.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    [DataContract]
    public class BaseTestRandomVM
    {
        [DataMember]
        [Required]
        public int NumberOfQuestion { get; set; }

        [DataMember]
        [Required]
        public string CourseCode { get; set; }

        [DataMember]
        [Required]
        public string ApproverCode { get; set; }

        [DataMember]
        [Required]
        public DateTimeOffset StartDate { get; set; }

        [DataMember]
        [Required]
        public DateTimeOffset EndDate { get; set; }

        [DataMember]
        [Required]
        [Range(typeof(TimeSpan), "00:00", "23:59")]
        public TimeSpan Duration { get; set; }
    }

    [DataContract]
    public class BaseTestChaptersVM
    {
        [DataMember]
        [Required]
        public int NumberOfQuestion { get; set; }

        [DataMember]
        [Required]
        public string CourseCode { get; set; }

        [DataMember]
        [Required]
        public string ExamCode { get; set; }

        [DataMember]
        [Required]
        public string ApproverCode { get; set; }

        [DataMember]
        [Required]
        public DateTimeOffset StartDate { get; set; }

        [DataMember]
        [Required]
        public DateTimeOffset EndDate { get; set; }

        [DataMember]
        [Required]
        [Range(typeof(TimeSpan), "00:00", "23:59")]
        public TimeSpan Duration { get; set; }

        [DataMember]
        public List<int> Chapters { get; set; }
    }
}