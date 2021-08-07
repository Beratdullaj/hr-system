using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Branches
{
    public class Create
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }
        public string Location { get; set; }
        public ICollection<Team> Teams {get; set;}
        public ICollection<Distribution> Distributions {get; set;}
        public ICollection<AboutUs> About_Uss {get; set;}
        public ICollection<StockRequest> StockRequests {get; set;}
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Location).NotEmpty();
                ;
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
                var branch = new Branch
                {
                    Id = request.Id,
                    Location = request.Location,
                    Teams = request.Teams,
                    Distributions = request.Distributions,
                    About_Uss = request.About_Uss,
                    StockRequests = request.StockRequests
                };

                _context.Branches.Add(branch);
                var sucess = await _context.SaveChangesAsync() > 0;
                
                if (sucess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}