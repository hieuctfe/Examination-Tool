namespace UI.WebApi.ViewModels
{
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using UI.WebApi.ViewModels.Shared;

    [DataContract]
    public class ChapterVM : TrackingChange
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int Order { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string CourseCode { get; set; }
    }

    [DataContract]
    public class UpdateChapterVM : TrackingChange
    {
        [DataMember]
        public string Id { get; set; }

        [DataMember, Required]
        public int Order { get; set; }

        [DataMember, Required]
        public string Name { get; set; }

        [DataMember, Required]
        public string CourseCode { get; set; }
    }
}