using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.About_Us
{
    public class Details
    {
        public class Query : IRequest<AboutUs>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, AboutUs>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<AboutUs> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var aboutus = await _context.About_Us.FindAsync(request.Id);

                if (aboutus == null)
                    throw new RestException(HttpStatusCode.NotFound, new { About_Us = "Not found" });

                return aboutus;
            }
        }
    }
}