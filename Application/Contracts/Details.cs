using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Contracts
{
    public class Details
    {
        public class Query : IRequest<Contract>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Contract>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Contract> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var contract = await _context.Contracts.FindAsync(request.Id);

                if (contract == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Contract = "Not found" });
                
                return contract;
            }
        }
    }
}