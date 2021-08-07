using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vehicles
{
    public class List
    {
        public class Query : IRequest<List<Vehicle>> { }

        public class Handler : IRequestHandler<Query, List<Vehicle>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Vehicle>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var vehicles = await _context.Vehicles.ToListAsync();

                return vehicles;
            }
        }
    }
}