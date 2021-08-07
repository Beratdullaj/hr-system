using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Branches
{
    public class List
    {
        public class Query : IRequest<List<Branch>> { }

        public class Handler : IRequestHandler<Query, List<Branch>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<List<Branch>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var branches = await _context.Branches.ToListAsync();

                return branches;
            }
        }
    }
}