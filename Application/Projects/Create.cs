using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public DateTime Due_Date { get; set; }

            //Set team FK
            public Guid TeamId { get; set; }
            public Team Team { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Due_Date).NotEmpty();
                RuleFor(x => x.TeamId).NotEmpty();
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
                var project = new Project
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Due_Date = request.Due_Date,
                    TeamId = request.TeamId,
                    Team = request.Team
                };

                _context.Projects.Add(project);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}