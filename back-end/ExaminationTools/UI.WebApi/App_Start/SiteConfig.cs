namespace UI.WebApi.App_Start
{
    using System.Web.Configuration;

    public class SiteConfig
    {
        public readonly static string App_Image_Storage = WebConfigurationManager.AppSettings["App.Path.ImageStorage"];
    }
}