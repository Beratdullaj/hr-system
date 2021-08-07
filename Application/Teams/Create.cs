using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Teams
{
    public class Create
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Guid? BranchId { get; set; }
        public Branch Branch { get; set; }

        public ICollection<Project> Projects {get; set;}
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.BranchId).NotEmpty();
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
                var team = new Team
                {
                    Id = request.Id,
                    Name = request.Name,
                    BranchId = request.BranchId,
                    Branch = request.Branch,
                    Projects = request.Projects
                };

                _context.Teams.Add(team);
                var sucess = await _context.SaveChangesAsync() > 0;
                
                if (sucess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}