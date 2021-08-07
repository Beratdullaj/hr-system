using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Services
{
    public class Details
    {
        public class Query : IRequest<Service>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Service>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Service> Handle(Query request, CancellationToken cancellationToken)
            {
                var service = await _context.Services.FindAsync(request.Id);

                if(service == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Service = "Not found" });
                
                return service;
            }
        }
    }
}