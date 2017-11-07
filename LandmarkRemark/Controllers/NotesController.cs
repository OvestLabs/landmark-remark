using System;
using System.Threading.Tasks;
using LandmarkRemark.Models;
using Microsoft.AspNetCore.Mvc;

namespace LandmarkRemark.Controllers
{
	public class NotesController : Controller
	{
		[HttpPost]
		public async Task<IActionResult> Index([FromBody] UserNote note)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			using (var db = new NoteContext())
			{
				db.Notes.Add(note);
				await db.SaveChangesAsync();
			}

			return Ok();
		}
	}
}