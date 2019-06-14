namespace UI.WebApi.ViewModels
{
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations;

    [DataContract]
    public class CourseVM
    {
        [DataMember]
        public string Code { get; set; }

        [DataMember]
        public string Name { get; set; }
    }

    [DataContract]
    public class CreateCourseVM
    {
        [DataMember, Required]
        public string Code { get; set; }

        [DataMember, Required]
        public string Name { get; set; }

        [DataMember, Required]
        public string Department { get; set; }
    }

    [DataContract]
    public class UpdateCourseVM
    {
        [DataMember, Required]
        public string Code { get; set; }

        [DataMember, Required]
        public string Name { get; set; }

        [DataMember, Required]
        public string Department { get; set; }
    }
}