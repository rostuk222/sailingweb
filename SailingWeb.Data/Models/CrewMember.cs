using System;
using System.ComponentModel.DataAnnotations;

namespace SailingWeb.Data.Models
{
    public class CrewMember
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter crew member name")]
        [Display(Name = "Name")]
        [StringLength(100)]
        public string Name { get; set; }

        [Display(Name = "Picture Url")]
        public string Picture { get; set; }

        [Required(ErrorMessage = "Please enter crew member age")]
        [Display(Name = "Age")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Please enter crew member email")]
        [Display(Name = "Email")]
        [StringLength(100)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter crew member role")]
        [Display(Name = "Role")]
        public string Role { get; set; }

        [Required(ErrorMessage = "Please enter crew member boat")]
        [Display(Name = "Boat")]
        public int BoatId { get; set; }

        [Required(ErrorMessage = "Please enter crew member certificate expiration day")]
        [Display(Name = "Role")]
        public DateTime CertifiedUntil { get; set; }
        public Boat Boat { get; set; }
    }
}
