using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Services
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Type { get; set; }
            public string Description { get; set; }
            public string Photo { get; set; }
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
                var service = await _context.Services.FindAsync(request.Id);

                if(service == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Service = "Not found" });

                service.Type = request.Type ?? service.Type;
                service.Description = request.Description ?? service.Description;
                service.Photo = request.Photo ?? service.Photo;
                

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}