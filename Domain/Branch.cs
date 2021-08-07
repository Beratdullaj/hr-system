using System;
using System.Collections.Generic;

namespace Domain
{
    public class Branch
    {
        public Guid Id { get; set; }
        public string Location { get; set; }

        //Team send fk
        public ICollection<Team> Teams {get; set;}
        public ICollection<Distribution> Distributions {get; set;}
        public ICollection<AboutUs> About_Uss {get; set;}
        public ICollection<StockRequest> StockRequests {get; set;}
    }
}