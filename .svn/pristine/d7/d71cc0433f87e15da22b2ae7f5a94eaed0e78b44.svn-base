namespace UI.WebApp.SignalR
{
    using System.Web.Script.Serialization;
    using Microsoft.AspNet.SignalR;

    public class ProcessKillerHub : Hub
    {
        public void ResponSubmitMessageToAdmin(string mess, string adminId)
        {
            Clients.Client(adminId).ListenSubmitMessage(mess);
        }
        public void KillProcess(string process)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string[] proce = js.Deserialize<string[]>(process);
            // Call the broadcastMessage method to update clients.
            Clients.All.kill(proce);
        }

        public void KillProcess(string process, string appId)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string[] proce = js.Deserialize<string[]>(process);
            // Call the broadcastMessage method to update clients.
            Clients.Client(appId).kill(proce);
        }

        // Pull Process to client called by app
        public void PullProcessToClient(object listProcess)
        {
            var json = new JavaScriptSerializer().Serialize(listProcess);
            Clients.All.SetProcessAtClient(listProcess);
        }

        // Screen sharing
        public void GetScreen(string connectionId, string adminConnectionId)
        {
            Clients.Client(connectionId).Screen(adminConnectionId);
        }

        public void PullScreen(string adminId, string base64)
        {
            Clients.Client(adminId).ListenScreen(adminId, base64);
        }

        public void StopScreen(string connectionId)
        {
            Clients.All.StopScreen(); 
        }

        //public void GetData(string adminId)
        //{
        //    var path = (System.Web.HttpContext.Current == null)
        //           ? System.Web.Hosting.HostingEnvironment.MapPath("~/")
        //           : System.Web.HttpContext.Current.Server.MapPath("~/");

        //    var data = System.IO.File.ReadAllText($"{path}/Data/listUser.txt");
        //    Clients.Client(adminId).SetStudentList(data);
        //}

        public void GetStudentProcess(string studentId, string adminId)
        {
            Clients.Client(studentId).GetAllProcess(adminId);
        }

        // submit student exam in exception
        public void SubmmitStudentExam(string studentId, string adminId)
        {
            Clients.Client(studentId).SubmitLocalExam(adminId);
        }
    }
}