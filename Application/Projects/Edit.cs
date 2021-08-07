using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Edit
    {
        public class Command : IRequest
        {
         public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? Due_Date { get; set; }

        //Set team FK
        public Guid? TeamId { get; set; }
        public Team Team { get; set; }
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
                var project = await _context.Projects.FindAsync(request.Id);

                if (project == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Project = "Not found" });

                project.Title = request.Title ?? project.Title;
                project.Description = request.Description ?? project.Description;
                project.Due_Date = request.Due_Date ?? project.Due_Date;
                project.TeamId = request.TeamId ?? project.TeamId;
                project.Team = request.Team ?? project.Team;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}