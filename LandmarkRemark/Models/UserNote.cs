using System.ComponentModel.DataAnnotations;

namespace LandmarkRemark.Models
{
    public sealed class UserNote
    {
		[Range(-85, 85)]
		public double Latitude { get; set; }

		[Range(-180, 180)]
		public double Longitude { get; set; }

		public string Remarks { get; set; }
    }
}
