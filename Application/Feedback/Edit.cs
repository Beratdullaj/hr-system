using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Feedbacks
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
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
                var feedback = await _context.FeedBacks.FindAsync(request.Id);

                if (feedback == null)
                    throw new RestException(HttpStatusCode.NotFound, new { FeedBack = "Not found" });

                feedback.Name = request.Name ?? feedback.Name;
                feedback.Email = request.Email ?? feedback.Email;
                feedback.Message = request.Message ?? feedback.Message;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}