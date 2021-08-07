using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Contracts
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Salary { get; set; }
            public DateTime Signed_Date { get; set; }
            public DateTime Expire_Date { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Salary).NotEmpty();
                RuleFor(x => x.Signed_Date).NotEmpty();
                RuleFor(x => x.Expire_Date).NotEmpty();
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
                var contract = new Contract
                {
                    Id = request.Id,
                    Salary = request.Salary,
                    Signed_Date = request.Signed_Date,
                    Expire_Date = request.Expire_Date
                };

                _context.Contracts.Add(contract);
                var sucess = await _context.SaveChangesAsync() > 0;
                
                if (sucess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}