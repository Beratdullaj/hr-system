using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Trainings
{
    public class Edit
    {
        public class Command : IRequest
        {
        
            public Guid Id { get; set; }
        public string Type { get; set; }
        public DateTime? Date { get; set; }

        
       
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
                var training = await _context.Trainings.FindAsync(request.Id);

                if (training == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Training = "Not found" });

               
                training.Type = request.Type ?? training.Type;
                training.Date = request.Date ?? training.Date;
               


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}