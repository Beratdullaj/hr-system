using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contracts
{
    public class List
    {
        public class Query : IRequest<List<Contract>> { }

        public class Handler : IRequestHandler<Query, List<Contract>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<List<Contract>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var contracts = await _context.Contracts.ToListAsync();

                return contracts;
            }
        }
    }
}