using System;

namespace Domain
{
    public class Contract
    {
        public Guid Id { get; set; }
        public string Salary { get; set; }
        public DateTime Signed_Date { get; set; }
        public DateTime Expire_Date { get; set; }
    }
}