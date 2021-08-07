using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Holidays
{
    public class Edit
    {
        public class Command : IRequest
        {
         public Guid Id { get; set; }
        public string Type { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }
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
                var holiday = await _context.Holidays.FindAsync(request.Id);

                if (holiday == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Holiday = "Not found" });

                holiday.Type = request.Type ?? holiday.Type;
                
        
                

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}