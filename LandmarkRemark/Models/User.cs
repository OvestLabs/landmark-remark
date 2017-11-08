using System.ComponentModel.DataAnnotations;

namespace LandmarkRemark.Models
{
	public sealed class User
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public string Username { get; set; }
	}
}