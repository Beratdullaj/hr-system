using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Distributions
{
    public class List
    {
        public class Query : IRequest<List<Distribution>> { }

        public class Handler : IRequestHandler<Query, List<Distribution>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Distribution>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var distributions = await _context.Distributions.ToListAsync();

                return distributions;
            }
        }
    }
}