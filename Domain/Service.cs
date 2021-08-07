using System;
using System.Collections.Generic;

namespace Domain
{
    public class Service
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }


        public ICollection<AboutUs> About_Uss {get; set;}
    }
}