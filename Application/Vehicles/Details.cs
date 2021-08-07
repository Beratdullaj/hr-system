using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Vehicles
{
    public class Details
    {
        public class Query : IRequest<Vehicle>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Vehicle>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Vehicle> Handle(Query request, CancellationToken cancellationToken)
            {
                var vehicle = await _context.Vehicles.FindAsync(request.Id);

                if (vehicle == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Vehicle = "Not found" });
                
                return vehicle;
            }
        }
    }
}