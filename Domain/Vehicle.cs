using System;
using System.Collections.Generic;

namespace Domain
{
    public class Vehicle
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }


        public ICollection<Distribution> Distributions {get; set;}
        public ICollection<StockRequest> StockRequests {get; set;}
    }
}