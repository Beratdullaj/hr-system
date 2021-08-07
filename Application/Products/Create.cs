using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class Create
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

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Brand).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Price).NotEmpty();
                RuleFor(x => x.Photo).NotEmpty();
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
                var product = new Product
                {
                    Id = request.Id,
                    Name = request.Name,
                    Brand = request.Brand,
                    Description = request.Description,
                    Category = request.Category,
                    Price = request.Price,
                    Photo = request.Photo,
                    Distributions = request.Distributions,
                    StockRequests = request.StockRequests
                };

                _context.Products.Add(product);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}