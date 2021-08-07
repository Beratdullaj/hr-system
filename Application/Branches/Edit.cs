using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Branches
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Location { get; set; }

            public ICollection<Team> Teams { get; set; }
            public ICollection<Distribution> Distributions { get; set; }
            public ICollection<AboutUs> About_Uss { get; set; }
            public ICollection<StockRequest> StockRequests { get; set; }
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
                var branch = await _context.Branches.FindAsync(request.Id);

                if (branch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Branch = "Not found" });

                branch.Location = request.Location ?? branch.Location;
                branch.Teams = request.Teams ?? branch.Teams;
                branch.Distributions = request.Distributions ?? branch.Distributions;
                branch.About_Uss = request.About_Uss ?? branch.About_Uss;
                branch.StockRequests = request.StockRequests ?? branch.StockRequests;

                var sucess = await _context.SaveChangesAsync() > 0;

                if (sucess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}