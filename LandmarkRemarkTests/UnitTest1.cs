using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using LandmarkRemark.Controllers;
using Xunit;
using LandmarkRemark.Models;
using Microsoft.EntityFrameworkCore;

namespace LandmarkRemarkTests
{
	public class UsersControllerTests
	{
		private static NoteContext CreateContext()
		{
			var builder = new DbContextOptionsBuilder<NoteContext>().UseInMemoryDatabase("testdb");
			var context = new NoteContext(builder.Options);

			return context;
		}

		private static UsersController CreateController()
		{
			var context = CreateContext();
			var controller = new UsersController(context);

			return controller;
		}


		[Fact]
		public async Task UsersCollectionIsEmptyOnInit()
		{
			var controller = CreateController();
			var result = await controller.Index();
			var users = (IList<User>)result.Value;

			Assert.Empty(users);
		}
	}
}
