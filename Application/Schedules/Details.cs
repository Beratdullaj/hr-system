using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Schedules
{
    public class Details
    {
        public class Query : IRequest<Schedule>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Schedule>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Schedule> Handle(Query request, CancellationToken cancellationToken)
            {
                var schedule = await _context.Schedules.FindAsync(request.Id);

                if (schedule == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Schedule = "Not found" });
                
                return schedule;
            }
        }
    }
}