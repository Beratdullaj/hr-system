using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Distributions
{
    public class Details
    {
        public class Query : IRequest<Distribution>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Distribution>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Distribution> Handle(Query request, CancellationToken cancellationToken)
            {
                var distribution = await _context.Distributions.FindAsync(request.Id);

                if (distribution == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Distribution = "Not found" });
                
                return distribution;
            }
        }
    }
}