using System.ComponentModel.DataAnnotations;

namespace LandmarkRemark.Models
{
	public sealed class UserNote
    {
	    [Key]
		public int Id { get; set; }

		public int UserId { get; set; }

		public User User { get; set; }

		[Range(-85, 85)]
		public double Latitude { get; set; }

		[Range(-180, 180)]
		public double Longitude { get; set; }

		[Required]
		[MinLength(1)]
		public string Remarks { get; set; }
    }
}
