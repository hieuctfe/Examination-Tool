namespace UI.WebApi.ViewModels
{
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    [DataContract]
    public class ReviewQuestionVM
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Question { get; set; }

        [DataMember]
        public string Type { get; set; }

        [DataMember]
        public float Mark { get; set; }

        [DataMember]
        public float TotalMark { get; set; }

        [DataMember]
        public IEnumerable<ReviewAnswerVM> ListAnswer { get; set; }
    }

    [DataContract]
    public class ReviewAnswerVM
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Answer { get; set; }

        [DataMember]
        public bool IsChecked { get; set; }

        [DataMember]
        public bool IsCorrect { get; set; }
    }
}