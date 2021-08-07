using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services
{
    public class List
    {
        public class Query : IRequest<List<Service>> { }

        public class Handler : IRequestHandler<Query, List<Service>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Service>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var services = await _context.Services.ToListAsync();

                return services;
            }
        }
    }
}