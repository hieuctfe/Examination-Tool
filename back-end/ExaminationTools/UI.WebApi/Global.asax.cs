namespace UI.WebApi
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            System.Web.Mvc.AreaRegistration.RegisterAllAreas();
        }
    }
}