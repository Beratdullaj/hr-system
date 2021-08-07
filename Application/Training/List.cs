using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Trainings
{
    public class List
    {
        public class Query : IRequest<List<Training>> { }

        public class Handler : IRequestHandler<Query, List<Training>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Training>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var trainings = await _context.Trainings.ToListAsync();

                return trainings;
            }
        }
    }
}