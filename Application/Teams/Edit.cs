using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Teams
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }

            public Guid? BranchId { get; set; }
            public Branch Branch { get; set; }

            public ICollection<Project> Projects { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var team = await _context.Teams.FindAsync(request.Id);

                if (team == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Team = "Not found" });

                team.Name = request.Name ?? team.Name;
                team.BranchId = request.BranchId ?? team.BranchId;
                team.Branch = request.Branch ?? team.Branch;
                team.Projects = request.Projects ?? team.Projects;

                var sucess = await _context.SaveChangesAsync() > 0;

                if (sucess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}