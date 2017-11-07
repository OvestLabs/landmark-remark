using Microsoft.EntityFrameworkCore;

namespace LandmarkRemark.Models
{
	public sealed class NoteContext : DbContext
	{
		public DbSet<UserNote> Notes { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlite("Data Source=bin/notes.db");
		}
	}
}