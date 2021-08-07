using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Permissions
{
    public class Details
    {
        public class Query : IRequest<Permission>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Permission>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Permission> Handle(Query request, CancellationToken cancellationToken)
            {
                var permission = await _context.Permissions.FindAsync(request.Id);

                if(permission == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Permission = "Not found" });
                
                return permission;
            }
        }
    }
}