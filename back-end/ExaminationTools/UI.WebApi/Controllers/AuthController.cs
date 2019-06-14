namespace UI.WebApi.Controllers
{
    using System.Web;
    using System.Web.Configuration;
    using System.Web.Mvc;
    using Microsoft.Owin.Security;
    using AuthLib;

    public class AuthController : Controller
    {
        private IAuthenticationManager AuthenticationManager
            => this.HttpContext.GetOwinContext().Authentication;

        public ActionResult Login(string returnUrl)
        {
            return new ChallengeResult(this.Url.Action("ExternalLoginCallback", new { returnUrl }));
        }

        public ActionResult Unauthorize()
        {
            return View("ExternalLoginCallback");
        }

        public ActionResult Logout()
        {
            this.AuthenticationManager.SignOut(Constant.AUTHENTICATION_TYPE);
            this.Session.Abandon();
            return Redirect(WebConfigurationManager.AppSettings["AuthDomain"] + Constant.AUTH_LOGOUT_PATH);
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (this.Url.IsLocalUrl(returnUrl))
                return Redirect(returnUrl);
            return RedirectToAction("Index", "Home");
        }

        public ActionResult ExternalLoginCallback(string returnUrl, string error)
        {
            if (string.IsNullOrWhiteSpace(error))
                return RedirectToLocal(returnUrl);
            else
            {
                ViewBag.error = error;
                return View();
            }
        }
    }
}