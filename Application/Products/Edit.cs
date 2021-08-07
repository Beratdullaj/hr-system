using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Brand { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public double Price { get; set; }
            public string Photo { get; set; }

            public ICollection<Distribution> Distributions { get; set; }
            public ICollection<StockRequest> StockRequests { get; set; }
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
                var product = await _context.Products.FindAsync(request.Id);

                if (product == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Product = "Not found" });

                product.Name = request.Name ?? product.Name;
                product.Brand = request.Brand ?? product.Brand;
                product.Description = request.Description ?? product.Description;
                product.Category = request.Category ?? product.Category;
                product.Price = request.Price;
                product.Photo = request.Photo ?? product.Photo;
                product.StockRequests = request.StockRequests ?? product.StockRequests;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}