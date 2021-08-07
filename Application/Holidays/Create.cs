using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Holidays
{
    public class Create
    {
        public class Command : IRequest
        {
         public Guid Id { get; set; } 
        public string Type { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Type).NotEmpty();
                RuleFor(x => x.Start_Date).NotEmpty();
                RuleFor(x => x.End_Date).NotEmpty();
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
                var holiday = new Holiday
                {
                    Id = request.Id,
                    Type = request.Type,
                    Start_Date = request.Start_Date,
                    End_Date = request.End_Date,
                                       
                };

                _context.Holidays.Add(holiday);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}