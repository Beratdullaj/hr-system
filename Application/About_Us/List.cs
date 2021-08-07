using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.About_Us
{
    public class List
    {
        public class Query : IRequest<List<AboutUs>> { }

        public class Handler : IRequestHandler<Query, List<AboutUs>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<AboutUs>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var about_us = await _context.About_Us.ToListAsync();

                return about_us;
            }
        }
    }
}