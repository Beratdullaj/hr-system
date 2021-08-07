using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.StockRequests
{
    public class Details
    {
        public class Query : IRequest<StockRequest>
        {
            public Guid Id {get;set;}
        }
        public class Handler : IRequestHandler<Query, StockRequest>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<StockRequest> Handle(Query request, CancellationToken cancellationToken)
            {
                var stockrequest = await _context.StockRequests.FindAsync(request.Id);
                
                if(stockrequest == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Stockrequest = "Not found" });
                
                return stockrequest;
            }
        }
    }
}