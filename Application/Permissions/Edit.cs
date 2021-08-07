using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Permissions
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Type { get; set; }
            public string Description { get; set; }
            public int Role {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var permission = await _context.Permissions.FindAsync(request.Id);

               if(permission == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Permission = "Not found" });

                permission.Type = request.Type ?? permission.Type;
                permission.Description = request.Description ?? permission.Description;
                permission.Role = request.Role;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}