

using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Distributions
{
    public class Edit
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }

        public Guid? ProductId { get; set; }
        public Product Product { get; set; }

        public Guid? BranchId { get; set; }
        public Branch Branch { get; set; }

        public Guid? VehicleId { get; set; }
        public Vehicle Vehicles { get; set; }
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
                var distribution = await _context.Distributions.FindAsync(request.Id);

                if (distribution == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Distribution = "Not found" });

                distribution.ProductId = request.ProductId ?? distribution.ProductId;
                distribution.Product = request.Product ?? distribution.Product;
                distribution.BranchId = request.BranchId ?? distribution.BranchId;
                distribution.VehicleId = request.VehicleId ?? distribution.VehicleId;
                distribution.Vehicles = request.Vehicles ?? distribution.Vehicles;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}