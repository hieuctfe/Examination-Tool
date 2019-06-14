namespace UI.WebApi.ViewModels
{
    using System;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations;

    [DataContract]
    public class SemesterVM
    {
        [DataMember, Required]
        public string Code { get; set; }

        [DataMember, Required]
        public DateTime StartDate { get; set; }

        [DataMember]
        public DateTime? EndDate { get; set; }
    }
}