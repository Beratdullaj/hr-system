using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Distributions
{
    public class Create
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }

        public Guid ProductId { get; set; }
        public Product Product { get; set; }

        public Guid BranchId { get; set; }
        public Branch Branch { get; set; }

        public Guid VehicleId { get; set; }
        public Vehicle Vehicles { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ProductId).NotEmpty();
                RuleFor(x => x.BranchId).NotEmpty();
                RuleFor(x => x.VehicleId).NotEmpty();
            }
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
                var distribution = new Distribution
                {
                    Id = request.Id,
                    ProductId = request.ProductId,
                    Product = request.Product,
                    BranchId = request.BranchId,
                    Branch = request.Branch,
                    VehicleId = request.VehicleId,
                    Vehicles = request.Vehicles
                };

                _context.Distributions.Add(distribution);
                var sucess = await _context.SaveChangesAsync() > 0;
                
                if (sucess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
