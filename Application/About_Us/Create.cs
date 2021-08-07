using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.About_Us
{
    public class Create
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }

        public Guid? BranchId { get; set; }
        public Branch Branch { get; set; }

        public Guid? ServiceId { get; set; }
        public Service Service { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BranchId).NotEmpty();
                RuleFor(x => x.ServiceId).NotEmpty();
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
                var aboutus = new AboutUs
                {
                    Id = request.Id,
                    BranchId = request.BranchId,
                    Branch = request.Branch,
                    ServiceId = request.ServiceId,
                    Service = request.Service,

                };

                _context.About_Us.Add(aboutus);
                var sucess = await _context.SaveChangesAsync() > 0;
                
                if (sucess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}