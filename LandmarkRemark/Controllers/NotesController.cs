using LandmarkRemark.Models;
using Microsoft.AspNetCore.Mvc;

namespace LandmarkRemark.Controllers
{
	public class NotesController : Controller
	{
		[HttpPost]
		public void Index([FromBody] UserNote note)
		{

		}
	}
}