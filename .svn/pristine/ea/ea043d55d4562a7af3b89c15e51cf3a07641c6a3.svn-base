namespace UI.WebApi.ViewModels
{
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    [DataContract]
    public class LearningOutcomeVM
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public int Order { get; set; }

        [DataMember]
        public int MainObjectiveId { get; set; }
    }

    [DataContract]
    public class CreateLearningOutcomeVM
    {
        [DataMember]
        [Required]
        public string Name { get; set; }

        [DataMember]
        [Required]
        public int Order { get; set; }

        [DataMember]
        [Required]
        public int MainObjectiveId { get; set; }
    }

    [DataContract]
    public class UpdateLearningOutcomeVM
    {
        [DataMember]
        [Required]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public string Name { get; set; }

        [DataMember]
        [Required]
        public int Order { get; set; }
    }
}