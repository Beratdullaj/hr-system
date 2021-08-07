using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.About_Us
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

        public Guid? BranchId { get; set; }
        public Branch Branch { get; set; }

        public Guid? ServiceId { get; set; }
        public Service Service { get; set; }
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

                aboutus.BranchId = request.BranchId ?? aboutus.BranchId;
                aboutus.Branch = request.Branch ?? aboutus.Branch;
                aboutus.ServiceId = request.ServiceId ?? aboutus.ServiceId;
                aboutus.Service = request.Service ?? aboutus.Service;
                

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}