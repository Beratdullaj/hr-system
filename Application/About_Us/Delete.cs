using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.About_Us
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var aboutus = await _context.About_Us.FindAsync(request.Id);

                if (aboutus == null)
                    throw new RestException(HttpStatusCode.NotFound, new { About_Us = "Not found" });

                _context.Remove(aboutus);

                var sucess = await _context.SaveChangesAsync() > 0;

                if (sucess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}