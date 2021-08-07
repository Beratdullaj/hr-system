using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Memos
{
    public class List
    {
        public class Query : IRequest<List<Memo>> { }

        public class Handler : IRequestHandler<Query, List<Memo>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Memo>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var memos = await _context.Memos.ToListAsync();

                return memos;
            }
        }
    }
}