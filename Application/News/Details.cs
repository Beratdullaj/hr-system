using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.News
{
    public class Details
    {
        public class Query : IRequest<New>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, New>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<New> Handle(Query request, CancellationToken cancellationToken)
            {
                var news = await _context.News.FindAsync(request.Id);

                if(news == null)
                    throw new RestException(HttpStatusCode.NotFound, new { news = "Not found" });
                
                return news;
            }
        }
    }
}