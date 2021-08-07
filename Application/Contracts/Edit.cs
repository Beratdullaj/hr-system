using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Contracts
{
    public class Edit
    {
    public class Command : IRequest
    {
        public Guid Id { get; set; }
        public string Salary { get; set; }
        public DateTime? Signed_Date { get; set; }
        public DateTime? Expire_Date { get; set; }
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
        var contract = await _context.Contracts.FindAsync(request.Id);

        if (contract == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Contract = "Not found" });

            contract.Salary = request.Salary ?? contract.Salary;
            contract.Signed_Date = request.Signed_Date ?? contract.Signed_Date;
            contract.Expire_Date = request.Expire_Date ?? contract.Expire_Date;

        var sucess = await _context.SaveChangesAsync() > 0;
        
        if (sucess) return Unit.Value;

        throw new Exception("Problem saving changes");
    }
    }
    }
}