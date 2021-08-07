using System;

namespace Domain
{
    public class AboutUs
    {
        public Guid Id { get; set; }

        public Guid? BranchId { get; set; }
        public Branch Branch { get; set; }

        public Guid? ServiceId { get; set; }
        public Service Service { get; set; }
    }
}