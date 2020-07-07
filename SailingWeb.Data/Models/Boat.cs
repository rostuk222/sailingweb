using System.ComponentModel.DataAnnotations;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SailingWeb.Data.Models
{
    public class Boat
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter boat name")]
        [Display(Name = "Name")]
        [StringLength(100)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter boat producer name")]
        [Display(Name = "Producer")]
        [StringLength(100)]
        public string Producer { get; set; }

        [Required(ErrorMessage = "Please enter boat build number")]
        [Display(Name = "Boat Build Number")]
        [StringLength(100)]
        public string BuildNumber { get; set; }

        [Required(ErrorMessage = "Please enter boats maximum length")]
        [Display(Name = "Length (LOA)")]
        [Column(TypeName = "decimal(18,2)")]
        public double Loa { get; set; }

        [Required(ErrorMessage = "Please enter boats maximum width")]
        [Display(Name = "Width (B)")]
        [Column(TypeName = "decimal(18,1)")]
        public double B { get; set; }

        [Required(ErrorMessage = "Please enter an url for the boats picture")]
        [Display(Name = "Picture")]
        public string Picture { get; set; }

        public ICollection<CrewMember> CrewMembers { get; set; }
    }
}
