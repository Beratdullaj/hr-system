using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.StockRequests
{
    public class Edit
    {
        public class Command : IRequest
        {

        public Guid Id { get; set; }
        public int? Quantity { get; set; }
        
        
        public Guid? ProductId { get; set; }
        public Product Product { get; set; }


        public Guid? BranchId { get; set; }
        public Branch Branch { get; set; }


        public Guid? VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
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
                var stockrequest = await _context.StockRequests.FindAsync(request.Id);

                if(stockrequest == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Stockrequest = "Not found" });

                stockrequest.Quantity = request.Quantity ?? stockrequest.Quantity;
                stockrequest.ProductId = request.ProductId ?? stockrequest.ProductId;
                stockrequest.Product = request.Product ?? stockrequest.Product;
                stockrequest.BranchId = request.BranchId ?? stockrequest.BranchId;
                stockrequest.Branch = request.Branch ?? stockrequest.Branch;
                stockrequest.VehicleId = request.VehicleId ?? stockrequest.VehicleId;
                stockrequest.Vehicle = request.Vehicle ?? stockrequest.Vehicle;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}