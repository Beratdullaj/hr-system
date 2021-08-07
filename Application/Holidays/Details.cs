using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Holidays
{
    public class Details
    {
        public class Query : IRequest<Holiday>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Holiday>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Holiday> Handle(Query request, CancellationToken cancellationToken)
            {
                var holiday = await _context.Holidays.FindAsync(request.Id);

                if (holiday == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Holiday = "Not found" });
                
                return holiday;
            }
        }
    }
}