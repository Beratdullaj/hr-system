using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Branches
{
    public class Details
    {
        public class Query : IRequest<Branch>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Branch>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Branch> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var branch = await _context.Branches.FindAsync(request.Id);

                if (branch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Branch = "Not found" });

                return branch;
            }
        }
    }
}