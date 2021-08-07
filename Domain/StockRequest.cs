using System;

namespace Domain
{
    public class StockRequest
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        
        
        public Guid? ProductId { get; set; }
        public Product Product { get; set; }


        public Guid? BranchId { get; set; }
        public Branch Branch { get; set; }


        public Guid? VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}