using Microsoft.EntityFrameworkCore;

namespace LandmarkRemark.Models
{
	public sealed class NoteContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<UserNote> Notes { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlite("Data Source=bin/notes.db");
		}
	}
}