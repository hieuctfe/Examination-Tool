namespace UI.WebApi.ViewModels
{
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    [DataContract]
    public class CreateOptionVM
    {
        [DataMember]
        [Required]
        public string Content { get; set; }

        [DataMember]
        [Required]
        public bool IsCorrect { get; set; }

        [DataMember]
        [Required, Range(-100, 100)]
        public float Percent { get; set; }
    }

    [DataContract]
    public class UpdateOptionVM
    {
        [DataMember]
        [Required]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public string Content { get; set; }

        [DataMember]
        [Required]
        public bool IsCorrect { get; set; }

        [DataMember]
        [Required, Range(-100, 100)]
        public float Percent { get; set; }
    }

    [DataContract]
    public class GetOptionVM
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Content { get; set; }

        [DataMember]
        public bool IsCorrect { get; set; }

        [DataMember]
        public float Percent { get; set; }
    }
}