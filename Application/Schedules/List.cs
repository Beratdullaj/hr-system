using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Schedules
{
    public class List
    {
        public class Query : IRequest<List<Schedule>> { }

        public class Handler : IRequestHandler<Query, List<Schedule>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Schedule>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var schedules = await _context.Schedules.ToListAsync();

                return schedules;
            }
        }
    }
}