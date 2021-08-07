using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Permissions
{
    public class List
    {
        public class Query : IRequest<List<Permission>> { }

        public class Handler : IRequestHandler<Query, List<Permission>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Permission>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var permissions = await _context.Permissions.ToListAsync();

                return permissions;
            }
        }
    }
}