using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.News
{
    public class List
    {
        public class Query : IRequest<List<New>> { }

        public class Handler : IRequestHandler<Query, List<New>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<New>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var news = await _context.News.ToListAsync();

                return news;
            }
        }
    }
}