using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SailingWeb.Data.Contexts;
using SailingWeb.Data.Models;

namespace SailingWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrewMembersController : ControllerBase
    {
        private readonly BoatDbContext _context;

        public CrewMembersController(BoatDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<CrewMember>>> GetCrewMembers(int id)
        {
            return await _context.CrewMembers.Where(x=>x.BoatId == id).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<CrewMember>> PostCrewMember([FromBody]CrewMember crewMember)
        {
            _context.CrewMembers.Add(crewMember);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrewMember", new { id = crewMember.Id }, crewMember);
        }
    }
}
