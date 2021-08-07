using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.StockRequests
{
    public class Create
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        
        
        public Guid? ProductId { get; set; }
        public Product Product { get; set; }


        public Guid? BranchId { get; set; }
        public Branch Branch { get; set; }


        public Guid? VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Quantity).NotEmpty();
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
                var stockrequest = new StockRequest
                {
                    Id = request.Id,
                    Quantity = request.Quantity,
                    ProductId = request.ProductId,
                    Product = request.Product,
                    BranchId = request.BranchId,
                    Branch = request.Branch,  
                    VehicleId = request.VehicleId,  
                    Vehicle = request.Vehicle  
 
                };

                _context.StockRequests.Add(stockrequest);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}