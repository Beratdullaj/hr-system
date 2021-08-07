using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Trainings
{
    public class Details
    {
        public class Query : IRequest<Training>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Training>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Training> Handle(Query request, CancellationToken cancellationToken)
            {
                var training = await _context.Trainings.FindAsync(request.Id);

                if (training == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Training = "Not found" });
                
                return training;
            }
        }
    }
}