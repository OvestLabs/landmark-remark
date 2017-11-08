using Microsoft.EntityFrameworkCore;

namespace LandmarkRemark.Models
{
	public sealed class NoteContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<UserNote> Notes { get; set; }

		public NoteContext(DbContextOptions<NoteContext> options) : base(options)
		{
			
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder
				.Entity<User>()
				.HasAlternateKey(t => t.Username)
				.HasName("Unique_Username");
		}
	}
}