using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Memos
{
    public class Details
    {
        public class Query : IRequest<Memo>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Memo>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Memo> Handle(Query request, CancellationToken cancellationToken)
            {
                var memo = await _context.Memos.FindAsync(request.Id);

                if (memo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Memo = "Not found" });
                
                return memo;
            }
        }
    }
}