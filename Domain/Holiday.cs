using System;

namespace Domain
{
    public class Holiday
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }
    }
}