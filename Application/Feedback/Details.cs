using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Feedbacks
{
    public class Details
    {
        public class Query : IRequest<FeedBack>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, FeedBack>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<FeedBack> Handle(Query request, CancellationToken cancellationToken)
            {
                var feedback = await _context.FeedBacks.FindAsync(request.Id);

                if (feedback == null)
                    throw new RestException(HttpStatusCode.NotFound, new { FeedBack = "Not found" });
                
                return feedback;
            }
        }
    }
}