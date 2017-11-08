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
		private readonly NoteContext _context;

		public NotesController(NoteContext context)
		{
			context.Database.EnsureCreated();
			_context = context;
		}

		[HttpGet]
		public async Task<JsonResult> Index([FromQuery] string search)
		{
			List<UserNote> notes;

			if (string.IsNullOrWhiteSpace(search))
			{
				notes = await _context.Notes
					.Include(t => t.User)
					.ToListAsync();
			}
			else
			{
				search = search.ToLower();

				notes = await _context.Notes
					.Where(t => t.Remarks.ToLower().Contains(search) || t.User.Username.ToLower().Contains(search))
					.Include(t => t.User)
					.ToListAsync();
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

			_context.Notes.Add(note);
			await _context.SaveChangesAsync();

			note.User = await _context.Users.SingleOrDefaultAsync(t => t.Id == note.UserId);

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

			var existingNote = await _context.Notes.Where(t => t.Id == id).SingleOrDefaultAsync();

			if (existingNote == null)
			{
				return NotFound();
			}

			existingNote.Latitude = note.Latitude;
			existingNote.Longitude = note.Longitude;
			existingNote.Remarks = note.Remarks;

			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}