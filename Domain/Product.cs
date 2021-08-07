using System;
using System.Collections.Generic;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
        public string Photo { get; set; }

        public ICollection<Distribution> Distributions {get; set;}
        public ICollection<StockRequest> StockRequests {get; set;}
    }
}