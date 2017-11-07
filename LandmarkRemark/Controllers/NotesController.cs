using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LandmarkRemark.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LandmarkRemark.Controllers
{
	public class NotesController : Controller
	{
		[HttpGet]
		public async Task<JsonResult> Index()
		{
			List<UserNote> notes;

			using (var db = new NoteContext())
			{
				notes = await db.Notes.ToListAsync();
			}

			return Json(notes);
		}

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

			var link = Url.Link("UpdateNote", new { id = note.Id });
			var uri = new Uri(link, UriKind.Absolute);

			return Created(uri, note);
		}

		[HttpPut]
		[Route("notes/{id}", Name = "UpdateNote")]
		public async Task<IActionResult> Index(int id, [FromBody] UserNote note)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			using (var db = new NoteContext())
			{
				var existingNote = await db.Notes.Where(t => t.Id == id).SingleOrDefaultAsync();

				if (existingNote == null)
				{
					return NotFound();
				}

				existingNote.Latitude = note.Latitude;
				existingNote.Longitude = note.Longitude;
				existingNote.Remarks = note.Remarks;

				await db.SaveChangesAsync();
			}

			return NoContent();
		}
	}
}