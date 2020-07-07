using Microsoft.EntityFrameworkCore;
using SailingWeb.Data.Models;

namespace SailingWeb.Data.Contexts
{
    public class BoatDbContext : DbContext
    {
        public BoatDbContext(DbContextOptions options)
                    : base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<Boat> Boats { get; set; }
        public DbSet<CrewMember> CrewMembers { get; set; }
    }
}
