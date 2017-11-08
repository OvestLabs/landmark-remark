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
		[HttpGet]
		public async Task<JsonResult> Index()
		{
			List<User> users;

			using (var db = new NoteContext())
			{
				users = await db.Users.ToListAsync();
			}

			return Json(users);
		}

		[HttpGet]
		[Route("users/{username}", Name = "UserSearch")]
		public async Task<IActionResult> Index(string username)
		{
			User user;

			using (var db = new NoteContext())
			{
				user = await db.Users.SingleOrDefaultAsync(t => t.Username.Equals(username, StringComparison.OrdinalIgnoreCase));
			}

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

			using (var db = new NoteContext())
			{
				db.Users.Add(user);
				await db.SaveChangesAsync();
			}

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

			using (var db = new NoteContext())
			{
				var existingUser = await db.Users.Where(t => t.Id == id).SingleOrDefaultAsync();

				if (existingUser == null)
				{
					return NotFound();
				}

				existingUser.Username = user.Username;

				await db.SaveChangesAsync();
			}

			return NoContent();
		}
	}
}