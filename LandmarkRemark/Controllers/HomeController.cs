using Microsoft.AspNetCore.Mvc;

namespace LandmarkRemark.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
