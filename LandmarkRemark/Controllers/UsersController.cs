using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LandmarkRemark.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LandmarkRemark.Controllers
{
	public sealed class UsersController : Controller
	{
		private readonly NoteContext _context;

		public UsersController(NoteContext context)
		{
			context.Database.EnsureCreated();
			_context = context;
		}


		[HttpGet]
		public async Task<JsonResult> Index()
		{
			var users = await _context.Users.ToListAsync();

			return Json(users);
		}

		[HttpGet]
		[Route("users/{username}", Name = "UserSearch")]
		public async Task<IActionResult> Index(string username)
		{
			username = username.ToLower();

			var user = await _context.Users.SingleOrDefaultAsync(t => t.Username.ToLower() == username);

			if (user == null)
			{
				return NotFound();
			}

			return Json(user);
		}

		[HttpPost]
		public async Task<IActionResult> Index([FromBody] User user)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			var link = Url.Link("UpdateUser", new { id = user.Id });
			var uri = new Uri(link, UriKind.Absolute);

			return Created(uri, user);
		}

		[HttpPut]
		[Route("users/{id}", Name = "UpdateUser")]
		public async Task<IActionResult> Index(int id, [FromBody] User user)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var existingUser = await _context.Users.Where(t => t.Id == id).SingleOrDefaultAsync();

			if (existingUser == null)
			{
				return NotFound();
			}

			existingUser.Username = user.Username;

			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}