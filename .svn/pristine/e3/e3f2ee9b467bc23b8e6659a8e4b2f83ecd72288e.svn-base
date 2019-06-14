namespace UI.WebApi.ViewModels.Shared
{
    using System.Runtime.Serialization;

    [DataContract]
    public abstract class TrackingChange
    {
        public TrackingChange()
        {
            this.State = ChangeState.Unchanged;
        }

        [DataMember]
        public ChangeState State { get; set; }
    }

    public enum ChangeState
    {
        Unchanged = 0,
        Created = 1,
        Modified = 2,
        Deleted = 3
    }
}