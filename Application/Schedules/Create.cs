using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Schedules
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Day { get; set; }
            public string Shift { get; set; }
            public string Start_Time { get; set; }
            public string EndTime { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Day).NotEmpty();
                RuleFor(x => x.Shift).NotEmpty();
                RuleFor(x => x.Start_Time).NotEmpty();
                RuleFor(x => x.EndTime).NotEmpty();
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
                var schedule = new Schedule
                {
                    Id = request.Id,
                    Day = request.Day,
                    Shift = request.Shift,
                    Start_Time = request.Start_Time,
                    EndTime = request.EndTime,

                };

                _context.Schedules.Add(schedule);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}