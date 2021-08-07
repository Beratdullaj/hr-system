using MediatR;
using Domain;
using System.Collections.Generic;
using System.Threading;
using Persistence;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Application.StockRequests
{
    public class List
    {
        public class Query : IRequest<List<StockRequest>>{}

        public class Handler : IRequestHandler<Query, List<StockRequest>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<StockRequest>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var stockrequest = await _context.StockRequests.ToListAsync();

                return stockrequest;

            }
        }
    }
}