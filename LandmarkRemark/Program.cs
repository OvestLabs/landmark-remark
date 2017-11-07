using LandmarkRemark.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace LandmarkRemark
{
	public class Program
	{
		public static void Main(string[] args)
		{
			using (var db = new NoteContext())
			{
				db.Database.EnsureCreated();
			}

			BuildWebHost(args).Run();
		}

		public static IWebHost BuildWebHost(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>()
				.Build();
	}
}
