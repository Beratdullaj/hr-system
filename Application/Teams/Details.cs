using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Teams
{
    public class Details
    {
        public class Query : IRequest<Team>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Team>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Team> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var team = await _context.Teams.FindAsync(request.Id);

                if (team == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Team = "Not found" });
                
                return team;
            }
        }
    }
}