using System;

namespace Domain
{
    public class Distribution
    {
        public Guid Id { get; set; }

        public Guid? ProductId { get; set; }
        public Product Product { get; set; }

        public Guid? BranchId { get; set; }
        public Branch Branch { get; set; }

        public Guid? VehicleId { get; set; }
        public Vehicle Vehicles { get; set; }
    }
}