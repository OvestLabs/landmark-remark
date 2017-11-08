using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using LandmarkRemark.Models;
using Microsoft.EntityFrameworkCore;

namespace LandmarkRemarkTests
{
	public class NoteContextTests
	{
		private static NoteContext CreateContext()
		{
			var name = Guid.NewGuid().ToString();
			var builder = new DbContextOptionsBuilder<NoteContext>().UseInMemoryDatabase(name);
			var context = new NoteContext(builder.Options);

			return context;
		}

		[Fact]
		public void UsersCollectionIsEmptyOnInit()
		{
			var context = CreateContext();
			var users = context.Users.ToList();

			Assert.Empty(users);
		}

		[Fact]
		public void UsersCollectionHasItemWhenAdded()
		{
			var context = CreateContext();
			var newUser = new User
			{
				Username = "Tester"
			};

			context.Users.Add(newUser);
			context.SaveChanges();

			var users = context.Users.ToList();
			var count = users.Count;

			Assert.Equal(1, count);
		}

		[Fact]
		public void AddingNewUsersWillIncrementIds()
		{
			var context = CreateContext();
			var user1 = new User
			{
				Username = "Tester1"
			};
			var user2 = new User
			{
				Username = "Tester2"
			};

			context.Users.Add(user1);
			context.Users.Add(user2);
			context.SaveChanges();


			Assert.Equal(1, user1.Id);
			Assert.Equal(2, user2.Id);
		}

		[Fact]
		public void AddingUserWithoutUsernameThrowsException()
		{
			var context = CreateContext();
			var user = new User();

			Assert.Throws<InvalidOperationException>(() => context.Users.Add(user));
		}
	}
}
