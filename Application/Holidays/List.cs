using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Holidays
{
    public class List
    {
        public class Query : IRequest<List<Holiday>> { }

        public class Handler : IRequestHandler<Query, List<Holiday>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Holiday>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var holidays = await _context.Holidays.ToListAsync();

                return holidays;
            }
        }
    }
}